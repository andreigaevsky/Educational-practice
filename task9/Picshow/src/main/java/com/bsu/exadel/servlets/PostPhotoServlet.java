package com.bsu.exadel.servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import com.bsu.exadel.service.JsonAnswer;
import com.bsu.exadel.service.PicshowMainService;
import com.bsu.exadel.model.Post;
import com.google.gson.*;
import org.apache.commons.fileupload.FileUploadException;

public class PostPhotoServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        PicshowMainService mainService = new PicshowMainService();
        try {
            JsonObject jsonObject = JsonAnswer.getParam(req);
            String description = jsonObject.get("description").getAsString();
            String photoLink = jsonObject.get("photoLink").getAsString();
            String hashTags;
            try {
                hashTags = jsonObject.get("hashTags").getAsString();
            } catch (NullPointerException e) {
                hashTags = "";
            }
            JsonObject jsonToReturn;
            String answer = mainService.addPost(description, hashTags, photoLink);
            jsonToReturn = JsonAnswer.createAnswer(answer);
            out.println(jsonToReturn.toString());
        } catch (FileUploadException e) {
            throw new IOException("Error parsing JSON request string");
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        PicshowMainService mainService = new PicshowMainService();
        if( ID != null) {
            PrintWriter out = resp.getWriter();
            JsonObject jsonToReturn1 = new JsonObject();
            try {
                resp.setContentType("application/json");
                JsonObject jsonObject = JsonAnswer.getParam(req);
                Map<String, String> editConfig = new Gson().fromJson(jsonObject, Map.class);
                if (mainService.changePost(ID, editConfig)) {
                    jsonToReturn1.addProperty("answer", "changed");
                } else {
                    jsonToReturn1.addProperty("answer", "fail");
                }
                out.println(jsonToReturn1.toString());
            } catch (FileUploadException e) {
                throw new IOException("Error parsing JSON request string");
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        resp.setContentType("application/json");
        PicshowMainService mainService = new PicshowMainService();
        JsonObject jsonToReturn;
        if (ID != null) {
            System.out.println(ID);
            PrintWriter out = resp.getWriter();
            if (mainService.removePost(ID)) {
                jsonToReturn = JsonAnswer.createAnswer("removed");
            } else {
                jsonToReturn = JsonAnswer.createAnswer("fail");
            }
            out.println(jsonToReturn.toString());
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        PicshowMainService mainService = new PicshowMainService();
        if( ID != null) {
            PrintWriter out = resp.getWriter();
            resp.setContentType("application/json");
            final Post POST = mainService.getPostById(ID);
            out.println(new Gson().toJson(POST));
        }
    }


}
