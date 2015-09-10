var wb = wb || {
	getAjaxUrl : function(){
		return 'http://www.webbudds.com/core/ajax/';
	},
	getHostUrl : function(){
		return 'http://www.webbudds.com/';
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
		var text = '<div class="form-group"><label for="shareNoteContent" class="col-sm-2 control-label">Note</label><div class="col-sm-10"><textarea class="form-control" id="shareNoteContent" placeholder="Enter note here" required></textarea></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Note',text,'wb.shareNote()');
	},
	createPhotoShareDialog : function(){
		var text = '<div class="form-group"><label for="sharePhotoDescription" class="col-sm-2 control-label">Description</label><div class="col-sm-10"><textarea class="form-control" id="sharePhotoDescription" placeholder="Enter note here" required style="height:150px;"></textarea></div></div>' + '<br /><br />' + '<div class="form-group"><label for="sharePhotoFile" class="col-sm-2 control-label">File</label><div class="col-sm-10"><input type="file" id="sharePhotoFile"></div></div><br><br><div class="form-group"><label for="uploadProgress" class="col-sm-2 control-label"></label><div class="col-sm-10"><progress id="uploadProgress" class="form-control"></progress></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Photo',text,'wb.sharePhoto()');
	},
	createYouTubeShareDialog : function(){
		var text = '<div class="form-group"><label for="shareYouTubeContent" class="col-sm-2 control-label">Select</label><div class="col-sm-10"><select class="form-control" id="shareYouTubeContent"></select><small class="text-danger" id="youtubeAlert"></small></div></div>' + this.creditsContainer();
		this.createShareDialogBox('YouTube',text,'wb.shareYouTube()');
		$("#title-form-group").css("display","none");
		$("#shareTitle").val("webbudds");
		gapi.auth.init(function() {});
		$("#globalShareBtn").css("display","none");
		var playlistId;
		var OAUTH2_CLIENT_ID = '412205397599-3sbdh56oipff01kh5f954t6sm4men8cd.apps.googleusercontent.com';
		var OAUTH2_SCOPES = [
		  'https://www.googleapis.com/auth/youtube'
		];
		gapi.auth.authorize({
			client_id: OAUTH2_CLIENT_ID,
			scope: OAUTH2_SCOPES,
			immediate: false
		}, function(authResult){
			if (authResult && !authResult.error) {
				gapi.client.load('youtube', 'v3', function() {
					var request = gapi.client.youtube.channels.list({
						mine: true,
						part: 'contentDetails'
					});
					request.execute(function(response) {
						playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
						var requestOptions = {
							playlistId: playlistId,
							part: 'snippet',
							maxResults: 50
						};
						var request = gapi.client.youtube.playlistItems.list(requestOptions);
						request.execute(function(response) {
							var playlistItems = response.result.items;
							if (playlistItems) {
								$('#youtubeAlert').html('');
								$.each(playlistItems, function(index, item) {
									var title = item.snippet.title;
									var videoId = item.snippet.resourceId.videoId;
									$('#shareYouTubeContent').append('<option value="' + videoId + '">' + title + '</option>');
									$("#globalShareBtn").css("display","block");
								});
							} else {
								$("#globalShareBtn").css("display","none");
								$('#youtubeAlert').html('Sorry you have no uploaded videos');
								alert('Sorry you have no uploaded videos');
							}
						});
					});
				});
			}else{
				$("#globalShareBtn").css("display","none");
				$('#youtubeAlert').html("Error while connecting with YouTube. Please try again");
			}
		});
  
  
	},
	createSoundCloudShareDialog : function(){
		var text = '<div class="form-group"><label for="shareSoundCloudContent" class="col-sm-2 control-label">Select</label><div class="col-sm-10"><select class="form-control" id="shareSoundCloudContent"></select><small class="text-danger" id="soundcloudAlert"></small></div></div>' + this.creditsContainer();
		this.createShareDialogBox('SoundCloud',text,'wb.shareSoundCloud()');
		$("#title-form-group").css("display","none");
		$("#globalShareBtn").css("display","none");
		$("#shareTitle").val("webbudds");
		SC.connect(function() {
		  SC.get('/me', function(me) { 
			  SC.get('/users/' + me.id + '/tracks', function(track) {
				for (var i = 0; i < track.length; i++) {
					$("#globalShareBtn").css("display","block");
					$('#shareSoundCloudContent').append('<option value="' + track[i].id + '" data-desc="' + track[i].description + '">' + track[i].title + '</option>');
				}
				if(track.length==0){
					$("#globalShareBtn").css("display","none");
					$('#soundcloudAlert').html('Sorry you have no uploaded tracks on SoundCloud');
					alert('Sorry you have no uploaded tracks on SoundCloud');
				}
			  });
		  });
		});
	},
	createLinkShareDialog : function(){
		var text = '<div class="form-group"><label for="shareLinkContent" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="shareLinkContent" placeholder="Paste URL here" required></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Link',text,'wb.shareLink()');
		$("#title-form-group").css("display","none");
		$("#shareTitle").val("webbudds");
	},
	createFacebookShareDialog : function(){
		var text = '<div class="form-group"><label for="shareFacebookContent" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="shareFacebookContent" placeholder="https://www.facebook.com/xxxxxxxxxx" required><br /><small>I acknowledge that, this page is belongs to me and I agrre to Terms and conditions.</small></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Facebook Page',text,'wb.shareFacebook()');
		$("#title-form-group").css("display","none");
		$("#shareTitle").val("webbudds");
	},
	createGoogleShareDialog : function(){
		var text = '<div class="form-group"><label for="shareGoogleContent" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="shareGoogleContent" placeholder="Paste Google page URL here" required></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Google Page',text,'wb.shareGoogle()');
		$("#title-form-group").css("display","none");
		$("#shareTitle").val("webbudds");
	},
	createTwitterShareDialog : function(){
		var text = '<div class="form-group"><label for="shareTwitterContent" class="col-sm-2 control-label">Screen name</label><div class="col-sm-10"><input type="text" class="form-control" id="shareTwitterContent" placeholder="Enter Twitter username here like: DhruvP1110" required></div></div>' + this.creditsContainer();
		this.createShareDialogBox('Twitter Page',text,'wb.shareTwitter()');
	},
	createInstagramShareDialog : function(){
		var text = '<iframe frameborder="0" src="'+this.getHostUrl() + 'instagram/connect.php" style="width:100%; height:364px;"></iframe>';
		this.createShareDialogBox('Instagram Photo',text,'void()');
		$("#title-form-group,#category-form-group,#shareModal br").css("display","none");
		$(".modal-body").remove("br");
		$("#globalShareBtn").css("display","none");
	},
	createWordpressShareDialog : function(){
		var text = '<div class="form-group"><label for="shareWordPressContent" class="col-sm-2 control-label">Domain</label><div class="col-sm-10"><input type="text" class="form-control" id="shareWordPressContent" placeholder="Enter domain name including HTTP or HTTPS" required></div></div>';
		this.createShareDialogBox('WordPress Site',text,'wb.shareWordPress()');
		$("#title-form-group").css("display","none");
		$("#shareTitle").val("webbudds");
	},
	createSitemapShareDialog : function(){
		var text = 'This feature currently under construction';
		this.createShareDialogBox('SItemap',text,'wb.void()');
		$("#title-form-group,#category-form-group").css("display","none");
		$("#globalShareBtn").css("display","none");
	},
	createBulkLinkShareDialog : function(){
		var text = 'This feature currently under construction';
		this.createShareDialogBox('Bulk Linking',text,'void()');
		$("#title-form-group,#category-form-group").css("display","none");
		$("#globalShareBtn").css("display","none");
	},
	creditsContainer : function(){
		if($("#acc_credits").val() >= 10){
			var temp = '<div class="form-group"><div class="col-sm-offset-2 col-sm-10"><div class="checkbox"><label><input type="checkbox" id="isBoost"><span class="ripple"></span><span class="check"></span> Boost my share for 2 days by spending 10 points</label></div></div></div>';
			return temp;
		}
		else{
			return '';
		}
	},
	createShareDialogBox : function(title,text,submitCallback){
		var titleContainer = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="$(\'#shareModal\').fadeOut();">×</button><h4 class="modal-title">' + title + '</h4></div><div class="modal-body"><div class="form-group" id="title-form-group"><label for="shareTitle" class="col-sm-2 control-label">Title</label><div class="col-sm-10"><input type="text" class="form-control" id="shareTitle" placeholder="Enter title here" required></div></div><br><br>' + '<div class="form-group" id="category-form-group"><label for="shareCategoryContent" class="col-sm-2 control-label">Category</label><div class="col-sm-10"><select class="form-control" id="shareCategoryContent"></select></div></div><br /><br />';
		var bottomContainer = '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" onclick="$(\'#shareModal\').fadeOut();">Close</button><button type="button" class="btn btn-primary" onclick="'+submitCallback+';" id="globalShareBtn">Share</button></div></div></div></div>';
		$("#shareModal").html(titleContainer + text + bottomContainer).fadeIn();
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
				return "yes";
			}
			else{
				return "no";
			}
		}else{
			return "no";
		}
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
		var title = $("#shareYouTubeContent option:selected").text();
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var video_id = $("#shareYouTubeContent option:selected").val();
		if(wb.shareValidate()){
			this.showOverlay();
			$.post(this.getAjaxUrl() + 'share_youtube.php',{title : title , video_id : video_id , boost : isBoost , cat : cat},function(response){
				wb.checkResponse(response);
			},'json');
		}
	},
	shareSoundCloud : function(){
		var title = $("#shareSoundCloudContent option:selected").text();
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var track_id = $("#shareSoundCloudContent option:selected").val();
		var description = $("#shareSoundCloudContent option:selected").attr("data-desc");
		$.post(wb.getAjaxUrl() + 'share_soundcloud.php',{title : title , track_id : track_id , description : description , boost : isBoost , cat : cat},function(response){
			wb.checkResponse(response);
		},'json');
		
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
		var isBoost = this.isShareBoost();
		var cat = $("#shareCategoryContent").val();
		var url = $("#shareFacebookContent").val();
		if(wb.shareValidate()){
			this.showOverlay();
			var identifier = url.substring(url.lastIndexOf("/"));
			
			FB.getLoginStatus(function(response1) {
				FB.api(
					"/v2.1"+identifier+'?access_token='+ response1.authResponse.accessToken,
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
			});
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
	shareWordPress : function(){
		var cat = $("#shareCategoryContent").val();
		var domain = $("#shareWordPressContent").val();
		if(wb.shareValidate()){
			this.showOverlay();
			$.post(this.getAjaxUrl() + 'share_wordpress.php',{domain : domain , cat : cat},function(response){
				wb.checkResponse(response);
			},'json');
		}
	},
	shareValidate : function(){
		var valid = true;
		$("#shareModal input,#shareModal textarea,#shareModal select").each(function(){
			if($(this).val() == '' && $(this).css("display") == "block"){
				valid = false;
				console.log($(this).attr("id"));
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
	soundCloudParser : function(track_url,cat,title,isBoost){
		SC.get('/resolve', { url: track_url }, function(track) {
		  var track_id = track.id;
			if(wb.shareValidate()){
				wb.showOverlay();
				$.post(wb.getAjaxUrl() + 'share_soundcloud.php',{title : title , track_id : track_id , track_url : track_url , boost : isBoost , cat : cat},function(response){
					wb.checkResponse(response);
				},'json');
			}
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
$( document ).ready(function() {
    $(".share_card").each(function(index, element) {
        var id = $(this).attr("data-id");
		if(id%10==0){
			$(this).css("background","rgb(229, 215, 242)");
		}
		else if(id%10==1){
			$(this).css("background","rgb(255, 255, 181)");
		}
		else if(id%10==2){
			$(this).css("background","rgb(236, 236, 255)");
		}
		else if(id%10==3){
			$(this).css("background","rgb(221, 255, 168)");
		}
		else if(id%10==4){
			$(this).css("background","rgb(255, 223, 223)");
		}
		else if(id%10==5){
			$(this).css("background","rgb(129, 255, 213)");
		}
		else if(id%10==6){
			$(this).css("background","rgb(223, 246, 255)");
		}
		else if(id%10==7){
			$(this).css("background","rgb(250, 231, 206)");
		}
		else if(id%10==8){
			$(this).css("background","rgb(92, 250, 255)");
		}
		else if(id%10==9){
			$(this).css("background","rgb(247, 207, 237)");
		}
    });
});