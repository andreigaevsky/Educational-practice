package com.bsu.exadel.servlets;

import com.bsu.exadel.model.DBPostService;
import com.bsu.exadel.service.PicshowMainService;
import com.bsu.exadel.model.Post;
import com.google.gson.Gson;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

public class PhotopostsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PrintWriter out = resp.getWriter();
        DBPostService mainService = new DBPostService();
        resp.setContentType("application/json");
        Map<String, String[]> params = req.getParameterMap();
        List<Post> POSTS = mainService.filterPosts(params);
        out.println(new Gson().toJson(POSTS));
    }
}
