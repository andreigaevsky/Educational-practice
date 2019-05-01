package com.bsu.exadel.servlets;

import com.bsu.exadel.service.JsonAnswer;
import com.bsu.exadel.service.PicshowMainService;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class LikePostServlet  extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final String ID = req.getParameter("id");
        resp.setContentType("application/json");
        PicshowMainService mainService = new PicshowMainService();
        JsonObject jsonToReturn;
        if (ID != null) {
            PrintWriter out = resp.getWriter();
            int count;
            if ((count = mainService.likePost(ID)) != -1) {
                jsonToReturn = JsonAnswer.createAnswer("liked");
                jsonToReturn.addProperty("count",count);
            } else {
                jsonToReturn = JsonAnswer.createAnswer("fail");
            }
            out.println(jsonToReturn.toString());
        }
    }
}
