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

import com.tayaniapp.model.DieselDealer;
import com.tayaniapp.repository.DieselDealerRepository;

@RestController
@RequestMapping("/rest/api/diesel-dealer")
public class DieselDealerController {

	@Autowired
	private DieselDealerRepository ddDao;
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping("/all")
	@ResponseBody
	public List<DieselDealer> getAll() {
		//String userId = "";
		List<DieselDealer> dieselDealers = new ArrayList<>();
		try {
			Iterable<DieselDealer> dieselDealerData = ddDao.findAll();
			for(DieselDealer dealer : dieselDealerData){
				dieselDealers.add(dealer);
			}
		} catch (Exception ex) {
			logger.error(ex.toString());
			return dieselDealers;
		}
		return dieselDealers;
	}
	
	@RequestMapping(value = "/find-by-name", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public DieselDealer findByName(String name){
		DieselDealer dealer  = new DieselDealer();
		try{
			dealer  = ddDao.findByName(name);
			logger.info("Diesel Dealer object found: {}",dealer);
		}catch(Exception ex){
			logger.error(ex.toString());
			return dealer;
		}
		return dealer;
	}
	
}
