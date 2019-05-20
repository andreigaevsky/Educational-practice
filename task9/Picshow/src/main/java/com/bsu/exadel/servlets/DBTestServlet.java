package com.bsu.exadel.servlets;



import com.bsu.exadel.service.DataSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;

public class DBTestServlet  extends HttpServlet{

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement("select * from user WHERE NAME LIKE (?)")) {
            statement.setString(1,"%n");
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                System.out.println(rs.getInt("ID") + " : " + rs.getString("NAME"));
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

}
