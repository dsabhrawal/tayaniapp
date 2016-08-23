package com.tayaniapp.controller;

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
import com.tayaniapp.repository.DealTypeRepository;

@RestController
@RequestMapping("/rest/api/dealtype")
public class DealTypeController {

	@Autowired
	private DealTypeRepository dealTypeDao;
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(value = "/find-by-type", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public DealType create(String type) {
		DealType dealType = new DealType(type.toUpperCase());
		try {
			dealType = dealTypeDao.findByType(type.toUpperCase());
			logger.info("deal type found: "+ dealType);
		} catch (Exception ex) {
			logger.error("Problem in getting deal type");
			return dealType;
		}
		return dealType;
	}
}
