package com.bsu.exadel.servlets;

import com.bsu.exadel.model.DBPostService;
import com.bsu.exadel.service.JsonAnswer;

import com.google.gson.JsonObject;


import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

public class LikePostServlet  extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String ID = req.getParameter("id");
        String curUserId = req.getSession().getAttribute("user").toString();
        resp.setContentType("application/json");
        DBPostService mainService = new DBPostService();
        JsonObject jsonToReturn;
        if (ID != null) {
            PrintWriter out = resp.getWriter();
            int count;
            try {
                if ((count = mainService.likePost(ID, curUserId)) != -1) {
                    jsonToReturn = JsonAnswer.createAnswer("liked");
                    jsonToReturn.addProperty("count", count);
                } else {
                    jsonToReturn = JsonAnswer.createAnswer("fail");
                }
            }catch (SQLException e){
                jsonToReturn = JsonAnswer.createAnswer("fail");
                resp.sendError(502);
            }
            out.println(jsonToReturn.toString());
        }
    }
}
