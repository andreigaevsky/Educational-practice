package com.bsu.exadel.servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import com.bsu.exadel.main.JsonAnswer;
import com.bsu.exadel.main.PicshowMain;
import com.bsu.exadel.main.Post;
import com.google.gson.*;


public class PostPhotoServlet extends HttpServlet {

    public static JsonObject getParams(HttpServletRequest req) throws JsonParseException {
        StringBuilder jb = new StringBuilder();
        String line;
        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null) {
                jb.append(line);
            }
        } catch (Exception e) {
        }
        return new JsonParser().parse(jb.toString()).getAsJsonObject();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        try {
            JsonObject jsonObject = getParams(req);
            String description = jsonObject.get("description").getAsString();
            String photoLink = jsonObject.get("photoLink").getAsString();
            String hashTags;
            try {
                hashTags = jsonObject.get("hashTags").getAsString();
            } catch (NullPointerException e) {
                hashTags = "";
            }
            JsonObject jsonToReturn;
            String answer = PicshowMain.addPost(description, hashTags, photoLink);
            jsonToReturn = JsonAnswer.createAnswer(answer);
            out.println(jsonToReturn.toString());
        } catch (JsonParseException e) {
            throw new IOException("Error parsing JSON request string");
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        if( ID != null) {
            PrintWriter out = resp.getWriter();
            JsonObject jsonToReturn1 = new JsonObject();
            try {
                resp.setContentType("application/json");
                JsonObject jsonObject = getParams(req);
                Map<String, String> editConfig = new Gson().fromJson(jsonObject, Map.class);
                if (PicshowMain.changePost(ID, editConfig)) {
                    jsonToReturn1.addProperty("answer", "ok");
                } else {
                    jsonToReturn1.addProperty("answer", "fail");
                }
                out.println(jsonToReturn1.toString());
            } catch (JsonParseException e) {
                throw new IOException("Error parsing JSON request string");
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        if (ID != null) {
            System.out.println(ID);
            PrintWriter out = resp.getWriter();
            JsonObject jsonToReturn;
            if (PicshowMain.removePost(ID)) {
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
        if( ID != null) {
            PrintWriter out = resp.getWriter();
            resp.setContentType("application/json");
            final Post POST = PicshowMain.getPostById(ID);
            out.println(new Gson().toJson(POST));
        }
    }
}
