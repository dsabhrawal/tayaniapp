package com.tayaniapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tayaniapp.model.DealType;
import com.tayaniapp.model.Firm;
import com.tayaniapp.repository.FirmRepository;

@RestController
@RequestMapping("/rest/api/firm")
public class FirmController {

	@Autowired
	private FirmRepository firmDao;
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping("/create")
	@ResponseBody
	public String create(String name, Boolean owner) {
		String firmId = "";
		try {
			Firm firm = new Firm(name, owner);
			firmDao.save(firm);
			firmId = String.valueOf(firm.getId());
		}catch (Exception ex) {
			return "Error creating the firm: " + ex.toString();
		}
		return "Firm succesfully created with id = " + firmId;
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public String delete(long id) {
		try {
			Firm firm = new Firm(id);
			firmDao.delete(firm);
		} catch (Exception ex) {
			return "Error deleting the firm:" + ex.toString();
		}
		return "Firm succesfully deleted!";
	}

	@RequestMapping("/get-by-id")
	@ResponseBody
	public Firm getById(long id) {
		//String userId = "";
		Firm firm= new Firm(id);
		try {
			firm = firmDao.findOne(id);
			//userId = String.valueOf(user.getId());
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return firm;
		}
		return firm;
	}

	@RequestMapping("/all")
	@ResponseBody
	public List<Firm> getAll() {
		//String userId = "";
		List<Firm> firms = new ArrayList<>();
		try {
			Iterable<Firm> firmsData = firmDao.findAll();
			//userId = String.valueOf(user.getId());
			for(Firm firm : firmsData){
				firms.add(firm);
			}
		} catch (Exception ex) {
			logger.error(ex.toString());
			return firms;
		}
		return firms;
	}
	
	@RequestMapping(value = "/find-by-name", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Firm create(String name) {
		Firm firm = new Firm();
		try {
			firm = firmDao.findByName(name);
			logger.info("firm found: "+ firm);
		} catch (Exception ex) {
			logger.error("Problem in getting deal type");
			return firm;
		}
		return firm;
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
