package com.tayaniapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tayaniapp.model.DealType;
import com.tayaniapp.model.DieselConfiguration;
import com.tayaniapp.model.DieselDealer;
import com.tayaniapp.repository.DieselConfigurationRepository;

@RestController
@RequestMapping("/rest/api/diesel-conf")
public class DieselConfigurationController {

	@Autowired
	private DieselConfigurationRepository dcDao;
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(value = "/update", method = RequestMethod.POST, headers = { "Content-Type=application/json" })
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public boolean create(@RequestBody List<DieselConfiguration> dieselConfigurationList) {
		logger.info("Diesel Configuration Request: {}", dieselConfigurationList);
		String saleId = "";
		String purchaseId = "";
		try {
			DieselConfiguration saleConfiguration = dcDao.findById(dieselConfigurationList.get(0).getId());
			DieselConfiguration purchaseConfiguration = dcDao.findById(dieselConfigurationList.get(1).getId());

			saleConfiguration.setPrice(dieselConfigurationList.get(0).getPrice());
			purchaseConfiguration.setPrice(dieselConfigurationList.get(1).getPrice());

			dcDao.save(saleConfiguration);
			dcDao.save(purchaseConfiguration);
			saleId = String.valueOf(saleConfiguration.getId());
			purchaseId = String.valueOf(purchaseConfiguration.getId());
		} catch (Exception ex) {
			logger.error("Error creating the Diesel Configuration: {}",ex.toString());
			return false;
		}
		logger.info(
				"Diesel Configuration succesfully created with saleid:{}     PurchaseId:{}",saleId, purchaseId);
		return true;
	}

	@RequestMapping("/delete")
	@ResponseBody
	public String delete(long id) {
		try {
			DieselConfiguration dieselConfiguration = new DieselConfiguration(id);
			dcDao.delete(dieselConfiguration);
		} catch (Exception ex) {
			return "Error deleting the Diesel Configuration:" + ex.toString();
		}
		return "Diesel Price succesfully deleted!";
	}

	@RequestMapping("/all")
	@ResponseBody
	public List<DieselConfiguration> getAll() {
		List<DieselConfiguration> dieselConfiguration = new ArrayList<>();
		try {
			Iterable<DieselConfiguration> dieselConfData = dcDao.findAll();
			for (DieselConfiguration dc : dieselConfData) {
				dieselConfiguration.add(dc);
			}
		} catch (Exception ex) {
			logger.error(ex.toString());
			return dieselConfiguration;
		}
		return dieselConfiguration;
	}

	@RequestMapping(value = "/find-by-dealType", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public DieselConfiguration findByName(long id, String type){
		DieselConfiguration dieselConfiguration  = new DieselConfiguration();
		DealType dealType = new DealType(id, type);
		logger.info("deal Type for getting configuration: {}", dealType);
		try{
			dieselConfiguration  = dcDao.findByDealType(dealType);
			logger.info("Diesel configuration object found: {}",dieselConfiguration);
		}catch(Exception ex){
			logger.error(ex.toString());
			return dieselConfiguration;
		}
		return dieselConfiguration;
	}
}
