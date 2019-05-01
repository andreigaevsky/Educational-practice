package com.bsu.exadel.servlets;

import com.bsu.exadel.service.JsonAnswer;
import com.bsu.exadel.service.PicshowMainService;
import com.google.gson.JsonObject;
import org.apache.commons.fileupload.FileUploadException;

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
        PicshowMainService mainService = new PicshowMainService();
        try {
                JsonObject jsonObject = JsonAnswer.getParam(req);
                String username = jsonObject.get("username").getAsString();
                String password = jsonObject.get("password").getAsString();
                if(mainService.login(username, password)){
                    jsonToReturn1 = JsonAnswer.createAnswer("logged");
                }else{
                    jsonToReturn1 = JsonAnswer.createAnswer("invalid username or password");
                }
            out.println(jsonToReturn1.toString());
        } catch (FileUploadException e) {
            throw new IOException("Error parsing JSON request string");
        }
    }
}
