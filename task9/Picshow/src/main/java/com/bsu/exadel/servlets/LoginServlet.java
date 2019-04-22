package com.bsu.exadel.servlets;

import com.bsu.exadel.main.JsonAnswer;
import com.bsu.exadel.main.PicshowMain;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        JsonObject jsonToReturn1;
        try {
            JsonObject jsonObject = PostPhotoServlet.getParams(req);
            if(jsonObject.has("username") && jsonObject.has("password")){
                String username = jsonObject.get("username").getAsString();
                String password = jsonObject.get("password").getAsString();
                if(PicshowMain.login(username,password)){
                    jsonToReturn1 = JsonAnswer.createAnswer("logged");
                }else{
                    jsonToReturn1 = JsonAnswer.createAnswer("invalid Date");
                }
            }else{
               PicshowMain.logout();
                jsonToReturn1 = JsonAnswer.createAnswer("logged out");
            }
            out.println(jsonToReturn1.toString());
        } catch (JsonParseException e) {
            throw new IOException("Error parsing JSON request string");
        }
    }
}
