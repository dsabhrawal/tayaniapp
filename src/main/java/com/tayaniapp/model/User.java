package com.tayaniapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"username", "email"}))
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	
	private String username;
	@NotNull
	private String password;
	@NotNull
	private String userRole;
	@NotNull
	private String email;
	@NotNull
	private String firstName;
	@NotNull
	private String lastName;

	public User(){
		
	}
	public User(String username, String password, String userRole, String email, String firstName, String lastName) {
		super();
		this.username = username;
		this.password = password;
		this.userRole = userRole;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public User(int id2) {
		this.id = id2;
	}
	public long getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", userRole=" + userRole
				+ ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName + "]";
	}

}
