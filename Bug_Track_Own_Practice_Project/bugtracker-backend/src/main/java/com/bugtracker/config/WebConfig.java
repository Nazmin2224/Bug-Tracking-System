package com.bugtracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173") // your React frontend URL
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Fixed here
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
