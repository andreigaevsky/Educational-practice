package com.bsu.exadel.service;

import org.apache.commons.dbcp2.BasicDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class DataSource {
    private static BasicDataSource ds = new BasicDataSource();

    static {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        }catch(ClassNotFoundException e){}
        ds.setUrl("jdbc:mysql://localhost:3306/photoportal");
        ds.setUsername("root");
        ds.setPassword("andy6789");
        ds.setMinIdle(5);
        ds.setMaxIdle(10);
        ds.setMaxOpenPreparedStatements(100);
    }

    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }

    private DataSource(){ }
}
