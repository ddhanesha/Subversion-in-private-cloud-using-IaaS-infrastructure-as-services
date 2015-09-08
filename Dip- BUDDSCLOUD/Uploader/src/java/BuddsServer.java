/* Aa code copy nathi. copy laage to ek 2 ne 3.5*/


import java.io.*;
import java.util.*;
 
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 


public class BuddsServer extends HttpServlet {
   
   private boolean Multipath;
   private String FPath;
   private int max_Size=100*1024;
   private int min_Size = 1 * 1024;
   private File file ;

   public void init( ){
      // store location
      FPath = 
             getServletContext().getInitParameter("file-upload"); 
   }
   public void doPost(HttpServletRequest request, 
               HttpServletResponse response)
              throws ServletException, java.io.IOException {
      
      Multipath = ServletFileUpload.isMultipartContent(request);
      response.setContentType("text/html");
      java.io.PrintWriter out = response.getWriter( );
      if( !Multipath ){
         out.println("<html>");
         out.println("<head>");
         out.println("<title>BuddsServer</title>");  
         out.println("</head>");
         out.println("<body>"); 
         out.println("</body>");
         out.println("</html>");
         return;
      }
  /*    DiskFileItemFactory factory = new DiskFileItemFactory();
      // maximum size that will be stored in memory
      factory.setSizeThreshold(min_Size);
      factory.setRepository(new File("c:\\temp"));
      ServletFileUpload upload = new ServletFileUpload(factory);
      upload.setSizeMax(max_Size);
      
      AA upar no code uthayelo che.. e ek website ma aapelo so khali copy kari ne rakhyo che....
*/
      try{ 
      
      List fileItems = upload.parseRequest(request);

      Iterator i = fileItems.iterator();

      out.println("<html>");
      out.println("<head>");
      out.println("<title>Servlet upload</title>");  
      out.println("</head>");
      out.println("<body>");
      while ( i.hasNext () ) 
      {
         FileItem F = (FileItem)i.next();
         if ( !F.isFormField () )	
         {
            // Get the uploaded file parameters
            String fieldName = F.getFieldName();
            String fileName = F.getName();
            String contentType = F.getContentType();
            boolean Memory = F.Memory();
            long Bytes = F.getSize();
           
            if( fileName.lastIndexOf("\\") >= 0 ){
               file = new File( filePath + 
               fileName.substring( fileName.lastIndexOf("\\"))) ;
            }else{
               file = new File( filePath + 
               fileName.substring(fileName.lastIndexOf("\\")+1)) ;
            }
            F.write( file ) ;
            out.println("Uploaded Filename: " + fileName + "<br>");
         }
      }
      out.println("</body>");
      out.println("</html>");
   }catch(Exception ex) {
       System.out.println(ex);
   }
   }
   public void doGet(HttpServletRequest request, 
                       HttpServletResponse response)
        throws ServletException, java.io.IOException {
        
        throw new ServletException("GET method used with " +
                getClass( ).getName( )+": POST method required.");
   } 
}