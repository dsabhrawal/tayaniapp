package com.tayaniapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages= "com.tayaniapp")
public class TayaniApp {

	public static void main(String[] args) {
		SpringApplication.run(TayaniApp.class, args);
	}
}
