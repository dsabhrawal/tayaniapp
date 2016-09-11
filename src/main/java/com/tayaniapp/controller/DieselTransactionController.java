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

import com.tayaniapp.model.DieselTransaction;
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
			//if (dieselTransaction.getId() == 0) {
				// it is the new record.
				DieselTransaction savedData = dieselTransactionDao.save(dieselTransaction);
				return String.valueOf(savedData.getId());
			/*} else {
				// updating the record
				DieselTransaction fromTable = dieselTransactionDao.findById(dieselTransaction.getId());
				logger.info("transaction before update: "+ fromTable);
				mergeTransactionEntities(dieselTransaction, fromTable);
				logger.info("transaction after update: "+ fromTable);
				DieselTransaction savedData = dieselTransactionDao.save(fromTable);
				return String.valueOf(savedData.getId());
			}*/

		} catch (Exception ex) {
			logger.error("Error in saving diesel transaction : {}", ex.toString());
			ex.printStackTrace();
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

	/*private void mergeTransactionEntities(DieselTransaction dieselTransaction, DieselTransaction fromTable) {

		fromTable.setDate(dieselTransaction.getDate());
		fromTable.setDealType(dieselTransaction.getDealType());
		fromTable.setDieselConfiguration(dieselTransaction.getDieselConfiguration());
		fromTable.setDieselDealer(dieselTransaction.getDieselDealer());
		fromTable.setFirm(dieselTransaction.getFirm());
		fromTable.setQuantity(dieselTransaction.getQuantity());
		fromTable.setTransport(dieselTransaction.getTransport());
		fromTable.setUser(dieselTransaction.getUser());
	}*/
}
