package com.tayaniapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tayaniapp.model.User;
import com.tayaniapp.repository.UserRepository;

@Controller
@RequestMapping("/rest/api/user")
public class UserController {

	@Autowired
	private UserRepository userDao;
	
	/**
	 * GET /create --> Create a new user and save it in the database.
	 */
	@RequestMapping("/create")
	@ResponseBody
	public String create(String username, String password, String email, String firstName,String lastName, String role) {
		String userId = "";
		try {
			User user = new User(username, password, role, email, firstName, lastName);
			userDao.save(user);
			userId = String.valueOf(user.getId());
		}catch (Exception ex) {
			return "Error creating the user: " + ex.toString();
		}
		return "User succesfully created with id = " + userId;
	}

	/**
	 * GET /delete --> Delete the user having the passed id.
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public String delete(int id) {
		try {
			User user = new User(id);
			userDao.delete(user);
		} catch (Exception ex) {
			return "Error deleting the user:" + ex.toString();
		}
		return "User succesfully deleted!";
	}

	/**
	 * GET /get-by-email --> Return the id for the user having the passed email.
	 */
	@RequestMapping("/get-by-id")
	@ResponseBody
	public User getById(long id) {
		//String userId = "";
		User user= new User();
		try {
			user = userDao.findOne(id);
			//userId = String.valueOf(user.getId());
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return user;
		}
		return user;
	}

	/**
	 * GET /update --> Update the email and the name for the user in the
	 * database having the passed id.
	 *//*
	@RequestMapping("/update")
	@ResponseBody
	public String updateUser(long id, String email, String name) {
		try {
			Users user = userDao.findOne(id);
			user.setEmail(email);
			user.setName(name);
			userDao.save(user);
		} catch (Exception ex) {
			return "Error updating the user: " + ex.toString();
		}
		return "User successfully updated!";
	}
*/
}