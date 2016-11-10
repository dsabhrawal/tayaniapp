package com.tayaniapp.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tayaniapp.model.DealType;
import com.tayaniapp.model.DieselDealer;
import com.tayaniapp.model.DieselTransaction;
import com.tayaniapp.model.Firm;
import com.tayaniapp.repository.DealTypeRepository;
import com.tayaniapp.repository.DieselDealerRepository;
import com.tayaniapp.repository.DieselTransactionRepository;
import com.tayaniapp.repository.FirmRepository;

@RestController
@RequestMapping("/rest/api/diesel-transaction")
public class DieselTransactionController {

	@Autowired
	private DieselTransactionRepository dieselTransactionDao;
	@Autowired
	private FirmRepository firmDao;
	@Autowired
	private DealTypeRepository dealTypeDao;
	@Autowired
	private DieselDealerRepository dieselDealerDao;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

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

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Integer updateTransactions(@RequestBody String request) {
		logger.info("Update Diesel Transaction request : {}", request);
		ObjectMapper mapper = new ObjectMapper();
		int response = 0;
		try {
			Map<String, String> map = mapper.readValue(request, new TypeReference<Map<String, String>>() {
			});
			DealType dealType = dealTypeDao.findByType(map.get("dealType"));
			long dealTypeId = dealType.getId();
			if (dealTypeId == 2) {
				Firm firm = firmDao.findByName(map.get("firmName"));
				response = dieselTransactionDao.updateSaleTransactions(new BigDecimal(map.get("price")), firm.getId(),
						map.get("fromDate"), map.get("toDate"));
			} else if (dealTypeId == 1) {
				DieselDealer dealer = dieselDealerDao.findByName(map.get("firmName"));
				response = dieselTransactionDao.updatePurchaseTransactions(new BigDecimal(map.get("price")),
						dealer.getId(), map.get("fromDate"), map.get("toDate"));
			}
			logger.info("{} rows updated!", response);
			return response;
		} catch (IOException e) {
			e.printStackTrace();
			return 0;
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

}
