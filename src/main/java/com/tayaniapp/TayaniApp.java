package com.tayaniapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@ComponentScan(basePackages= "com.tayaniapp")
@PropertySource("classpath:application.properties")
@EnableJpaRepositories("com.tayaniapp.repository")
@EnableTransactionManagement
public class TayaniApp {

	public static void main(String[] args) {
		
		
		System.out.println("Deepak is Great..!!!");
		SpringApplication.run(TayaniApp.class, args);
		
	}
}
