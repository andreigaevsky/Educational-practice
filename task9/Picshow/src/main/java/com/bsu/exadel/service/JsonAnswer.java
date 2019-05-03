package com.bsu.exadel.service;

import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.Iterator;
import java.util.List;

public class JsonAnswer {
    private JsonAnswer(){}

    public static JsonObject getParam(HttpServletRequest req) throws FileUploadException {
        JsonObject jsonObject = new JsonObject();
        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setSizeThreshold(1024*1024*10);
        factory.setRepository(new File("/WEB-INF/"));
        ServletFileUpload upload = new ServletFileUpload(factory);
        List<FileItem> items = upload.parseRequest(req);
        Iterator<FileItem> iter = items.iterator();
        while (iter.hasNext()) {
            FileItem item = iter.next();

            if (item.isFormField()) {
                jsonObject.addProperty(item.getFieldName(),item.getString());
            } else {

            }
        }
        return jsonObject;
    }


    public static JsonObject createAnswer(String text){
        JsonObject jsonToReturn = new JsonObject();
        jsonToReturn.addProperty("answer", text);
        return jsonToReturn;
    }

    public static JsonObject createCustom(String key, String value){
        JsonObject jsonToReturn = new JsonObject();
        jsonToReturn.addProperty(key, value);
        return jsonToReturn;
    }

    public static JsonObject getParams(HttpServletRequest req) throws JsonParseException {
        StringBuilder jb = new StringBuilder();
        String line;
        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null) {
                jb.append(line);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error, while reading request body.");
        }
        String l = jb.toString();
        System.out.println(l);
        return new JsonParser().parse(l).getAsJsonObject();
    }

    public static void addCustomLine(JsonObject obj, String key, String value){
        obj.addProperty(key,value);
    }
}
