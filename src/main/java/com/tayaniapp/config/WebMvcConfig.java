package com.tayaniapp.config;

import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration
public class WebMvcConfig extends WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter {

	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
		registry.addResourceHandler("/views/**").addResourceLocations("classpath:/templates/views/");
		registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
		registry.addResourceHandler("/bower_components/**").addResourceLocations("classpath:/bower_components/");
		registry.addResourceHandler("/scripts/**").addResourceLocations("classpath:/static/js/");
		registry.addResourceHandler("/templates/**").addResourceLocations("classpath:/templates/");
	}

}
