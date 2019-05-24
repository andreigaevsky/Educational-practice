package com.bsu.exadel.servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Map;

import com.bsu.exadel.model.DBPostService;
import com.bsu.exadel.service.JsonAnswer;
import com.bsu.exadel.service.NoPermissionException;
import com.bsu.exadel.model.Post;
import com.google.gson.*;
import org.apache.commons.fileupload.FileUploadException;

public class PostPhotoServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        DBPostService mainService = new DBPostService();
        try {
            String curUserId = req.getSession().getAttribute("user").toString();
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
            Post answer = mainService.addPost(description, hashTags, photoLink, curUserId);
            jsonToReturn = JsonAnswer.createAnswer(answer.toString());
            out.println(jsonToReturn.toString());
        } catch (FileUploadException e) {
            throw new IOException("Error parsing JSON request string");
        }catch (SQLException sqlEx){
            resp.sendError(500);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        DBPostService mainService = new DBPostService();
        if( ID != null) {
            PrintWriter out = resp.getWriter();
            JsonObject jsonToReturn1 = new JsonObject();
            try {
                HttpSession s = req.getSession(false);
                String curUserId = req.getSession().getAttribute("user").toString();
                resp.setContentType("application/json");
                JsonObject jsonObject = JsonAnswer.getParam(req);
                Map<String, String> editConfig = new Gson().fromJson(jsonObject, Map.class);
                if (mainService.editPost(ID, editConfig,curUserId)) {
                    jsonToReturn1.addProperty("answer", "changed");
                } else {
                    jsonToReturn1.addProperty("answer", "fail");
                }
                out.println(jsonToReturn1.toString());
            } catch (FileUploadException e) {
                throw new IOException("Error parsing JSON request string");
            }catch (SQLException sqlEx){
                resp.sendError(500);
            }catch (NoPermissionException noPermEx){
                resp.sendError(550);
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        resp.setContentType("application/json");
        DBPostService mainService = new DBPostService();
        JsonObject jsonToReturn;
        if (ID != null) {
            try {
                String curUserId = req.getSession().getAttribute("user").toString();
                PrintWriter out = resp.getWriter();
                if (mainService.deletePost(ID,curUserId)) {
                    jsonToReturn = JsonAnswer.createAnswer("removed");
                } else {
                    jsonToReturn = JsonAnswer.createAnswer("fail");
                }
                out.println(jsonToReturn.toString());
            }catch(SQLException e){
                resp.setStatus(500);
            }catch (NoPermissionException noPermEx){
                resp.sendError(550);
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        DBPostService mainService = new DBPostService();
        if( ID != null) {
            try {
                PrintWriter out = resp.getWriter();
                resp.setContentType("application/json");
                final Post POST = mainService.getPost(ID);
                out.println(new Gson().toJson(POST));
            }catch (SQLException sqlEx){
                resp.sendError(500);
            }
        }
    }


}
