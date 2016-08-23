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

import com.tayaniapp.model.Firm;
import com.tayaniapp.model.Transport;
import com.tayaniapp.repository.TransportRepository;

@RestController
@RequestMapping("/rest/api/transport")
public class TransportController {

	@Autowired
	private TransportRepository transportDao;
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping("/all-vehicles")
	@ResponseBody
	public List<Transport> getAll() {
		List<Transport> transports = new ArrayList<>();
		try {
			Iterable<Transport> transportData = transportDao.findAll();
			for (Transport transport : transportData) {
				transports.add(transport);
			}
		} catch (Exception ex) {
			logger.error(ex.toString());
			return transports;
		}
		return transports;
	}
	
	@RequestMapping(value = "/find-by-vehicleNo", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Transport create(String vehicleNumber) {
		Transport transport = new Transport();
		try {
			transport = transportDao.findByVehicleNumber(vehicleNumber);
			logger.info("Transport number found: "+ transport);
		} catch (Exception ex) {
			logger.error("Problem in getting deal type");
			return transport;
		}
		return transport;
	}
	

}
