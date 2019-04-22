package com.bsu.exadel.servlets;

import com.bsu.exadel.main.PicshowMain;
import com.bsu.exadel.main.Post;
import com.google.gson.Gson;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class PhotopostsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PrintWriter out = resp.getWriter();
        resp.setContentType("application/json");
        String param = req.getParameter("type");
        if (param != null) {
            List<Post> POSTS = null;
            switch (param) {
                case "next": {
                    POSTS = PicshowMain.getNextPosts();
                    break;
                }
                case "first": {
                    POSTS = PicshowMain.getFirstPosts();
                    break;
                }
            }
            out.println(new Gson().toJson(POSTS));
        }
    }
}
