var wb = wb || {
	accessToken : '',
	getAjaxUrl : function(){
		return 'http://beta.webbudds.com/core/ajax/';
	},
	checkResponse : function(response){
		if(response.error || response.error=="true"){
			console.log(response.msg);
			$("#overlay").fadeOut();
			alert("There is an error occured while posting your content");
		}
		else{
			document.location.reload();
		}
	},
	count : function(element){
		var total_r=0;
		if(element==null){
			return 0;
		}
		else{
			$.each(element,function(key,value){total_r++;});
			return total_r;
		}
	},
	createNoteShareDialog : function(){
		var text = '<div class="form-group"><label for="shareNoteContent" class="col-sm-2 control-label">Note</label><div class="col-sm-10"><textarea class="form-control" id="shareNoteContent" placeholder="Enter note here" required="required"></textarea></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Note',text,'wb.shareNote()');
	},
	createPhotoShareDialog : function(){
		var text = '<div class="form-group"><label for="sharePhotoDescription" class="col-sm-2 control-label">Description</label><div class="col-sm-10"><textarea class="form-control" id="sharePhotoDescription" placeholder="Enter note here" required="required" style="height:150px;"></textarea></div></div>' + '<br /><br />' + '<div class="form-group"><label for="sharePhotoFile" class="col-sm-2 control-label">File</label><div class="col-sm-10"><input type="file" id="sharePhotoFile"></div></div><br><br><div class="form-group"><label for="uploadProgress" class="col-sm-2 control-label"></label><div class="col-sm-10"><progress id="uploadProgress" class="form-control"></progress></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Photo',text,'wb.sharePhoto()');
	},
	createYouTubeShareDialog : function(){
		var text = '<div class="form-group"><label for="shareYouTubeContent" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="shareYouTubeContent" placeholder="Enter YouTube Video URL here" required="required"></div></div>' + this.creditsContainer();
		this.createShareDialogBox('YouTube',text,'wb.shareYouTube()');
	},
	createSoundCloudShareDialog : function(){
		var text = '<div class="form-group"><label for="shareSoundCloudContent" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="shareSoundCloudContent" placeholder="Enter SoundCloud track URL here" required="required"></div></div>' + this.creditsContainer();
		this.createShareDialogBox('SoundCloud',text,'wb.shareSoundCloud()');
	},
	createLinkShareDialog : function(){
		var text = '<div class="form-group"><label for="shareLinkContent" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="shareLinkContent" placeholder="Paste URL here" required="required"></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Link',text,'wb.shareLink()');
		$(".create_share_dialog div:first").css("display","none");
		$("#shareTitle").val("webbudds");
	},
	createFacebookShareDialog : function(){
		var text = '<div class="form-group"><label for="shareFacebookContent" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="shareFacebookContent" placeholder="Paste facebook page URL here" required="required"><br /><small>I acknowledge that, this page is belongs to me and I agrre to Terms and conditions.</small></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Facebook Page',text,'wb.shareFacebook()');
		$(".create_share_dialog div:first").css("display","none");
		$("#shareTitle").val("webbudds");
	},
	createGoogleShareDialog : function(){
		var text = '<div class="form-group"><label for="shareGoogleContent" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="shareGoogleContent" placeholder="Paste Google page URL here" required="required"></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Google Page',text,'wb.shareGoogle()');
		$(".create_share_dialog div:first").css("display","none");
		$("#shareTitle").val("webbudds");
	},
	createTwitterShareDialog : function(){
		var text = '<div class="form-group"><label for="shareTwitterContent" class="col-sm-2 control-label">Screen name</label><div class="col-sm-10"><input type="text" class="form-control" id="shareTwitterContent" placeholder="Enter Twitter username here like: DhruvP1110" required="required"></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Twitter Page',text,'wb.shareTwitter()');
	},
	creditsContainer : function(){
		if($("#acc_credits").val() >= 10){
			var temp = '<div class="form-group"><div class="col-sm-offset-2 col-sm-10"><div class="checkbox"><label><input type="checkbox" id="isBoost" checked="checked"> Boost my share for 2 days by spending 10 points</label></div></div></div>';
			return temp;
		}
		else{
			return '';
		}
	},
	createShareDialogBox : function(title,text,submitCallback){
		var titleContainer = '<h2>' + title + '</h2>' + '<div class="form-group"><label for="shareTitle" class="col-sm-2 control-label">Title</label><div class="col-sm-10"><input type="text" class="form-control" id="shareTitle" placeholder="Enter title here" required="required"></div></div><br><br>' + '<div class="form-group"><label for="shareCategoryContent" class="col-sm-2 control-label">Category</label><div class="col-sm-10"><select class="form-control" id="shareCategoryContent"></select></div></div><br /><br />';
		var bottomContainer = '<div class="bottom_container"><hr color="#ccc"><div><a href="#" onclick="$(\'.create_share_dialog\').fadeOut();return false;" class="button">Close</a><a href="#" onclick="'+submitCallback+';return false;" class="button">Share</a></div></div>';
		$(".create_share_dialog").html(titleContainer + text + bottomContainer).fadeIn();
		$.post(this.getAjaxUrl() + 'get_cat.php',{},function(response){
			var selectOptions;
			if(response.data){
				for(var i = 0 ; i < wb.count(response.data) ; i++){
					selectOptions+= '<option value="'+response.data[i].cat_id+'">'+response.data[i].title+'</option>';
				}
			}
			else{
				console.log("Categories not available");
			}
			$("#shareCategoryContent").html(selectOptions);
		},'json');
	},
	isShareBoost : function(){
		if($('#isBoost').length){
			if($('#isBoost').is(":checked")){
				return true;
			}
			else{
				return false;
			}
		}else{
			return false;
		}
	},
	getAccessToken : function(){
		return this.accessToken;
	},
	setAccessToken : function(token){
		this.accessToken = token;
	},
	showOverlay : function(){
		$(".overlay").fadeIn();
	},
	shareNote : function(){
		var title = $("#shareTitle").val();
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var note = $("#shareNoteContent").val();
		note = note.replace(/(?:\r\n|\r|\n)/g, '<br />');
		if(wb.shareValidate()){
			this.showOverlay();
			$.post(this.getAjaxUrl() + 'share_note.php',{title : title , note : note , boost : isBoost , cat : cat},function(response){
				wb.checkResponse(response);
			},'json');
		}
	},
	sharePhoto : function(){
		var title = $("#shareTitle").val();
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var photo = $("#sharePhotoDescription").val();
		photo = photo.replace(/(?:\r\n|\r|\n)/g, '<br />');
		if(wb.shareValidate()){
			this.showOverlay();
			var formData = new FormData();
			var file = document.getElementById("sharePhotoFile");
			formData.append("file", file.files[0]);
			formData.append("title",title);
			formData.append("boost",isBoost);
			formData.append("cat",cat);
			formData.append("photoDesc",photo);
			$.ajax({
				url: this.getAjaxUrl() + 'share_photo.php',  //Server script to process data
				type: 'POST',
				xhr: function() {  // Custom XMLHttpRequest
					var myXhr = $.ajaxSettings.xhr();
					if(myXhr.upload){ // Check if upload property exists
						myXhr.upload.addEventListener('progress',wb.progressHandling, false); // For handling the progress of the upload
					}
					return myXhr;
				},
				//Ajax events
				beforeSend: function(){},
				success: function(){document.location.reload();},
				error: function(){$("#overlay").fadeOut();alert("There is an error occured while posting your content");},
				// Form data
				data: formData,
				//Options to tell jQuery not to process data or worry about content-type.
				cache: false,
				contentType: false,
				processData: false
			});
		}
	},
	shareYouTube : function(){
		var title = $("#shareTitle").val();
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var video_id = wb.youTubeParser($("#shareYouTubeContent").val());
		if(wb.shareValidate()){
			this.showOverlay();
			$.post(this.getAjaxUrl() + 'share_youtube.php',{title : title , video_id : video_id , boost : isBoost , cat : cat},function(response){
				wb.checkResponse(response);
			},'json');
		}
	},
	shareSoundCloud : function(){
		var title = $("#shareTitle").val();
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var track_url = $("#shareSoundCloudContent").val();
		wb.soundCloudParser(track_url);
		var track_id = $("#soundCloudId").val();
		if(wb.shareValidate()){
			this.showOverlay();
			$.post(this.getAjaxUrl() + 'share_soundcloud.php',{title : title , track_id : track_id , track_url : track_url , boost : isBoost , cat : cat},function(response){
				wb.checkResponse(response);
			},'json');
		}
	},
	shareLink : function(){
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var url = $("#shareLinkContent").val();
		if(wb.shareValidate()){
			this.showOverlay();
			$.post(this.getAjaxUrl() + 'share_link.php',{ url : url , boost : isBoost , cat : cat},function(response){
				wb.checkResponse(response);
			},'json');
		}
	},
	shareFacebook : function(){
		FB.getLoginStatus(function(response) {
			$("#accessToken").val(response.authResponse.accessToken);
			//accessTokenExpire = response.authResponse.expiresIn;
		});
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var url = $("#shareFacebookContent").val();
		if(wb.shareValidate()){
			this.showOverlay();
			var identifier = url.substring(url.lastIndexOf("/"));
			FB.api(
				"/v2.1/"+identifier+'?access_token='+ localStorage.getItem("accessToken"),
				function (response) {
				  if (response && !response.error) {
					  var fb_id = response.id;
					  var fb_about = response.about || '';
					  var fb_cat = response.category || '';
					  var fb_cover = response.cover.source || '';
					  var fb_name = response.name;
					  var fb_website = response.website || '';
					  var fb_likes = response.likes;
					  var fb_username = response.username || '';
					  $.post(wb.getAjaxUrl() + 'share_facebook.php',{ url : url , boost : isBoost , cat : cat, fb_id : fb_id, fb_about : fb_about , fb_cat : fb_cat , fb_cover : fb_cover , fb_name : fb_name , fb_website : fb_website , fb_likes : fb_likes , fb_username : fb_username },function(response_ajax){
					      wb.checkResponse(response_ajax);
					  },'json');
					  console.log(response);
				  }
				  else{
					  console.log(response);
				  	  wb.checkResponse(response);
				  }
				}
			);

		}
	},
	shareGoogle : function(){
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var url = $("#shareGoogleContent").val();
		if(wb.shareValidate()){
			this.showOverlay();
			$.post(this.getAjaxUrl() + 'share_google.php',{ url : url , boost : isBoost , cat : cat},function(response){
				wb.checkResponse(response);
			},'json');
		}
	},
	shareTwitter : function(){
		var title = $("#shareTitle").val();
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var twitter = $("#shareTwitterContent").val();
		if(wb.shareValidate()){
			this.showOverlay();
			$.post(this.getAjaxUrl() + 'share_twitter.php',{title : title , twitter : twitter , boost : isBoost , cat : cat},function(response){
				wb.checkResponse(response);
			},'json');
		}
	},
	shareValidate : function(){
		var valid = true;
		$(".create_share_dialog input").each(function(){
			if($(this).val() == '' && $(this).css("display") == "block"){
				valid = false;
			}
		});
		if(!valid){
			alert("Please fill all necessary fields");
		}
		return valid;
	},
	progressHandling : function(e){
		
		if(e.lengthComputable){
        	$('#uploadProgress').css("display","block").attr({value:e.loaded,max:e.total});
		}
    },
	soundCloudParser : function(track_url){
		SC.get('/resolve', { url: track_url }, function(track) {
		  SC.get('/tracks/' + track.id + '/comments', function(comments) {
			$("#soundCloudId").val(track.id);
		  });
		});
	},
	youTubeParser : function(url){
		if(url.indexOf('?') != -1 ) {
			var query = decodeURI(url).split('?')[1];
			var params = query.split('&');
			for(var i=0,l = params.length;i<l;i++)
				if(params[i].indexOf('v=') === 0)
					return params[i].replace('v=','');
		} else if (url.indexOf('youtu.be') != -1) {
			return decodeURI(url).split('youtu.be/')[1];
		}
		return null;
	}
};