package com.bsu.exadel;

import com.sun.deploy.net.HttpRequest;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.PrintWriter;

public class TimeMeasureFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long start = System.currentTimeMillis();
        filterChain.doFilter(servletRequest,servletResponse);
        long end = System.currentTimeMillis();
        HttpServletRequest request =(HttpServletRequest) servletRequest;
        String path = request.getRequestURL().toString();
        String method = request.getMethod();
        System.out.println(String.format("%s - '%s' - %dms", method,path,end-start));
    }

    @Override
    public void destroy() {

    }
}
