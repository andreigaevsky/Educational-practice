package com.bsu.exadel.servlets;

import com.bsu.exadel.service.JsonAnswer;
import com.google.gson.JsonObject;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.xml.bind.DatatypeConverter;
import javax.xml.ws.RequestWrapper;
import java.io.*;
import java.util.Iterator;
import java.util.List;


@MultipartConfig
public class UploadImageServlet extends HttpServlet {
    private final String userDir = "user.dir";
    private final String fileSep = "file.separator";
    private final String picFolderName = "/tempPictures";
    private final String fileType ="image/";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String relativeWebPath = "/WEB-INF";
        String absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
        String tempPicFolder = absoluteDiskPath+picFolderName;
        Part filePart = req.getPart("file");
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
            JsonObject jsonToReturn1 = new JsonObject();
            InputStream fileContent = filePart.getInputStream();
            String[] fileType = filePart.getContentType().split("/");
            if (!fileType[0].equals("image")) {
                jsonToReturn1.addProperty("answer", "wrong file type");
                out.println(jsonToReturn1.toString());
                return;
            }
            File picDrc = new File(tempPicFolder);
            if (!picDrc.exists()) {
                picDrc.mkdirs();
            }
            File file = File.createTempFile("pic-", "." + fileType[1], new File(tempPicFolder));
            FileUtils.copyInputStreamToFile(fileContent, file);
            jsonToReturn1.addProperty("answer", file.getName());
            out.println(jsonToReturn1.toString());
    }
    @RequestWrapper
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String relativeWebPath = "/WEB-INF";
        String absoluteDiskPath = getServletContext().getRealPath(relativeWebPath);
        String tempPicFolder = absoluteDiskPath+picFolderName;
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
