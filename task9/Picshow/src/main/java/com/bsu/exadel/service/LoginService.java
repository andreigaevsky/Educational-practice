package com.bsu.exadel.service;

import com.bsu.exadel.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginService {
    private static final String USER_SELECT_DB = "SELECT * FROM user WHERE user.NAME = ?";
    private static final String NAME = "NAME";
    private static final String PASSWORD = "PASSWORD";
    private static final String ID = "ID";
    private static final String ERROR_TEXT_USER_NFOUND = "Error: such user is not found";
    private static final String ERROR_TEXT_WRONG_PASS = "Error: the password doesn't match";
    public LoginService() {

    }

    public User getUser(String name, String password) throws SQLException, WrongPassException, NoUserException {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(USER_SELECT_DB)) {
            statement.setString(1, name);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String passDB = rs.getString(PASSWORD);
                String hashPass = UtilPassword.getHash(password);
                if (UtilPassword.isHashEqual(passDB, hashPass)) {
                    return new User(rs.getString(NAME), passDB, rs.getString(ID));
                } else {
                    throw new WrongPassException(ERROR_TEXT_WRONG_PASS);
                }
            } else {
                throw new NoUserException(ERROR_TEXT_USER_NFOUND);
            }
        }
    }

}
