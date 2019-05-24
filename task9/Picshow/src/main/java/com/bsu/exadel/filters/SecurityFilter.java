package com.bsu.exadel.filters;

import com.bsu.exadel.service.UtilPassword;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;

public class SecurityFilter implements Filter {

    private static final String USER_ID = "user";
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse resp = (HttpServletResponse)servletResponse;
        HttpServletRequest req = (HttpServletRequest)servletRequest;
       if( "putdeletepost".contains(req.getMethod().toLowerCase()) && !req.getRequestURL().toString().contains("login") && !req.getRequestURL().toString().contains("like")) {
            HttpSession session = req.getSession(false);
            if (session == null || session.getAttribute(USER_ID) == null) {
                resp.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            }else {
                filterChain.doFilter(servletRequest, servletResponse);
            }
        }else{
           filterChain.doFilter(servletRequest, servletResponse);
       }
    }

    @Override
    public void destroy() {

    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }
}
