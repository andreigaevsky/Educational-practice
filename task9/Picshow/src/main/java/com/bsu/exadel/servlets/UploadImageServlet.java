package com.bsu.exadel.servlets;

import com.google.gson.JsonObject;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.xml.ws.RequestWrapper;
import java.io.*;


@MultipartConfig
public class UploadImageServlet extends HttpServlet {
    private final String userDir = "user.dir";
    private final String fileSep = "file.separator";
    private final String picFolderName = "pictures";
    private final String fileType ="image/";
    private final String tempPicFolder = System.getProperty(userDir) + System.getProperty(fileSep) + picFolderName;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Part filePart = req.getPart("file");
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        JsonObject jsonToReturn1 = new JsonObject();
        InputStream fileContent = filePart.getInputStream();
        String fileType[] = filePart.getContentType().split("/");
        if(!fileType[0].equals("image")){
            jsonToReturn1.addProperty("answer", "wrong file type");
            out.println(jsonToReturn1.toString());
            return;
        }
        File picDrc = new File(tempPicFolder);
        if(!picDrc.exists()){
            picDrc.mkdirs();
        }
        File file = File.createTempFile("pic-", "."+fileType[1], new File(tempPicFolder));
        FileUtils.copyInputStreamToFile(fileContent, file);
        jsonToReturn1.addProperty("answer",file.getAbsolutePath());
        out.println(jsonToReturn1.toString());
    }
    @RequestWrapper
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String photoLink = req.getParameter("filename");
        if(photoLink != null) {
            File file = new File(String.format("%s%s%s",tempPicFolder ,"/" , photoLink));
            if (file.exists()) {
                resp.setContentType(String.format("%s%s",fileType, photoLink.substring(photoLink.lastIndexOf(".") + 1)));
              try(  OutputStream out = resp.getOutputStream();FileInputStream in = new FileInputStream(file)){
                IOUtils.copy(in, out);
              }
            } else {
                throw new FileNotFoundException(String.format("%s%s%s","File with name '",photoLink,"' is not found."));
            }
        }
    }
}
