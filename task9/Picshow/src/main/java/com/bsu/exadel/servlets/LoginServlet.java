package com.bsu.exadel.servlets;

import com.bsu.exadel.model.User;
import com.bsu.exadel.service.JsonAnswer;
import com.bsu.exadel.service.LoginService;
import com.bsu.exadel.service.NoUserException;
import com.bsu.exadel.service.WrongPassException;
import com.google.gson.JsonObject;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.fileupload.FileUploadException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Base64;


public class LoginServlet extends HttpServlet {

    private static final String PASSWORD = "password";
    private static final String USERNAME = "username";
    private static final String ANS_LOGGED = "logged";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        JsonObject jsonToReturn1;
        try {
                JsonObject jsonObject = JsonAnswer.getParam(req);
                String username = jsonObject.get(USERNAME).getAsString();
                String password = StringUtils.newStringUtf8(Base64.getDecoder().decode(jsonObject.get(PASSWORD).getAsString()));
                login(password,username,req,resp);

                jsonToReturn1 = JsonAnswer.createAnswer(ANS_LOGGED);
                out.println(jsonToReturn1.toString());
        } catch (FileUploadException e) {
            throw new IOException("Error parsing JSON request string");
        }
    }

    private void login(String password, String username, HttpServletRequest req, HttpServletResponse resp) throws IOException{
        try{
            LoginService loginService = new LoginService();
             User user = loginService.getUser(username, password);
            HttpSession session = req.getSession(true);
            session.setAttribute("user",user.getId());
        }catch(SQLException sqlEx){
            resp.sendError(502);
        }
        catch (WrongPassException permEx){
            resp.sendError(401);
        }
        catch(NoUserException userEx){
            resp.sendError(402);
        }
    }
}
