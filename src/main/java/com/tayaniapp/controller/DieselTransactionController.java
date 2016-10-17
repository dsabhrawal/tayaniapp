package com.tayaniapp.controller;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Comparator;
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

import com.tayaniapp.model.DieselTransaction;
import com.tayaniapp.model.DieselTransactionDataFortnightly;
import com.tayaniapp.repository.DieselTransactionRepository;

@RestController
@RequestMapping("/rest/api/diesel-transaction")
public class DieselTransactionController {

	@Autowired
	private DieselTransactionRepository dieselTransactionDao;
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(value = "/add", method = RequestMethod.POST, headers = { "Content-Type=application/json" })
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public String create(@RequestBody DieselTransaction dieselTransaction) {
		logger.info("Diesel Transaction Request: {}", dieselTransaction);
		try {
			DieselTransaction savedData = dieselTransactionDao.save(dieselTransaction);
			return String.valueOf(savedData.getId());

		} catch (Exception ex) {
			logger.error("Error in saving diesel transaction : {}", ex.toString());
			ex.printStackTrace();
			return "Error";
		}
	}

	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public String remove(String transactionId) {
		logger.info("Diesel Transaction removal request with id: {}", transactionId);
		try {
			dieselTransactionDao.delete(Long.valueOf(transactionId));
			return "true";
		} catch (Exception ex) {
			logger.error("Error in removing diesel transaction : {}", ex.toString());
			return "Error";
		}
	}

	@RequestMapping(value = "/deleteAll", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public String removeAll() {
		logger.info("all Diesel Transaction removal");
		try {
			dieselTransactionDao.deleteAll();
			return "true";
		} catch (Exception ex) {
			logger.error("Error in removing diesel transactions : {}", ex.toString());
			return "Error";
		}
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public List<DieselTransaction> getAll() {
		List<DieselTransaction> transactions = new ArrayList<>();
		try {
			Iterable<DieselTransaction> transactionData = dieselTransactionDao.findAll();
			for (DieselTransaction dt : transactionData) {
				dt.getUser().setPassword("");
				transactions.add(dt);
			}
			return transactions;
		} catch (Exception ex) {
			logger.error("Error creating the Diesel Configuration: {}", ex.toString());
			return new ArrayList<DieselTransaction>();
		}
	}

	@RequestMapping(value = "/total-inflow", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public String getTotalDieselInflow() {
		try {
			Integer totalInflow = dieselTransactionDao.getTotalDieselInflow();
			logger.info("Total inflow diesel: {}", totalInflow);
			return String.valueOf(totalInflow);
		} catch (Exception ex) {
			logger.error("Error getting total inflow diesel: {}", ex.toString());
			return "Error";
		}
	}

	@RequestMapping(value = "/total-outflow", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public String getTotalDieselOutflow() {
		try {
			Integer totalOutflow = dieselTransactionDao.getTotalDieselOutflow();
			logger.info("Total outlfow diesel: {}", totalOutflow);
			return String.valueOf(totalOutflow);
		} catch (Exception ex) {
			logger.error("Error getting total outflow diesel: {}", ex.toString());
			return "Error";
		}
	}

	@RequestMapping(value = "/total-dieselflow-fortnightly", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<DieselTransactionDataFortnightly> getTotalDieselFlowFortnightly() {
		List<Object[]> resultset = new ArrayList<>();
		List<DieselTransactionDataFortnightly> dieselTransactionFortnightly = new ArrayList<>();
		try {
			resultset = dieselTransactionDao.getTotalDieselFlowFortnightly();
			logger.info("Total inflow diesel: {}", dieselTransactionFortnightly.size());
			resultset.stream().forEach((record) -> {
				Date date = (Date) record[0];
				Long quantity = ((BigDecimal) record[1]).longValue();
				Integer dealType = ((BigInteger) record[2]).intValue();

				DieselTransactionDataFortnightly dtFortnightly = new DieselTransactionDataFortnightly(date);
				if (!dieselTransactionFortnightly.contains(dtFortnightly)) {
					addQuantity(quantity, dealType, dtFortnightly);

					dieselTransactionFortnightly.add(dtFortnightly);
					System.out.println("not found added:: " + dtFortnightly);
				} else {
					addQuantity(quantity, dealType,
							dieselTransactionFortnightly.get(dieselTransactionFortnightly.indexOf(dtFortnightly)));
				}

			});

			dieselTransactionFortnightly
					.sort(Comparator.comparing(DieselTransactionDataFortnightly::getDate).reversed()); // sorting
																										// based
																										// on
																										// date
			return dieselTransactionFortnightly;
		} catch (Exception ex) {
			logger.error("Error getting total inflow diesel: {}", ex.toString());
			return dieselTransactionFortnightly;
		}
	}

	private void addQuantity(Long quantity, Integer dealType, DieselTransactionDataFortnightly dt) {

		if (dealType == 1) {
			dt.setPurchase(quantity);
		} else if (dealType == 2) {
			dt.setSale(quantity);
		}
	}

	/*
	 * @RequestMapping(value = "/total-outflow", method = RequestMethod.GET)
	 * 
	 * @ResponseStatus(HttpStatus.OK) public String getTotalDieselOutflow() {
	 * try { Integer totalOutflow =
	 * dieselTransactionDao.getTotalDieselOutflow();
	 * logger.info("Total outlfow diesel: {}", totalOutflow); return
	 * String.valueOf(totalOutflow); } catch (Exception ex) {
	 * logger.error("Error getting total outflow diesel: {}", ex.toString());
	 * return "Error"; } }
	 */

}
