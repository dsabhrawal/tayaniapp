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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mysql.jdbc.util.VersionFSHierarchyMaker;
import com.tayaniapp.model.DieselSaleReportsFortnightly;
import com.tayaniapp.model.DieselTransactionDataFortnightly;
import com.tayaniapp.model.Firm;
import com.tayaniapp.model.Transport;
import com.tayaniapp.repository.DieselReportsRepository;
import com.tayaniapp.repository.FirmRepository;
import com.tayaniapp.repository.TransportRepository;

@RestController
@RequestMapping("/rest/api/diesel-reports")
public class DieselReportsController {

	@Autowired
	private DieselReportsRepository dieselReportsDao;
	@Autowired
	private FirmRepository firmRepositoryDao;
	@Autowired
	private TransportRepository transportRepositoryDao;
	
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(value = "/total-dieselflow-fortnightly", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<DieselTransactionDataFortnightly> getTotalDieselFlowFortnightly() {
		List<Object[]> resultset = new ArrayList<>();
		List<DieselTransactionDataFortnightly> dieselTransactionFortnightly = new ArrayList<>();
		try {
			resultset = dieselReportsDao.getTotalDieselFlowFortnightly();
			logger.info("Total inflow diesel: {}", dieselTransactionFortnightly.size());
			resultset.stream().forEach((record) -> {
				Date date = (Date) record[0];
				Long quantity = ((BigDecimal) record[1]).longValue();
				Integer dealType = ((BigInteger) record[2]).intValue();

				DieselTransactionDataFortnightly dtFortnightly = new DieselTransactionDataFortnightly(date);
				if (!dieselTransactionFortnightly.contains(dtFortnightly)) {
					addQuantity(quantity, dealType, dtFortnightly);

					dieselTransactionFortnightly.add(dtFortnightly);
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

	@RequestMapping(value = "/fortnightly", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<DieselSaleReportsFortnightly> getFortnightlyReport(String data, String scope) {
		List<Object[]> resultset = new ArrayList<>();
		List<DieselSaleReportsFortnightly> dieselFirmSaleFortnightly = new ArrayList<>();
		try {
			if ("FIRM".equalsIgnoreCase(scope)) {
				Firm firm = firmRepositoryDao.findByName(data);
				logger.info("Found firm with name: " + firm);
				resultset = dieselReportsDao.getFortnightlyFirmSale(firm.getId());
				logger.info("Fortnightly Firm Sale: {}", resultset.size());
			}
			else if("VEHICLE".equalsIgnoreCase(scope)) {
				Transport vehicle = transportRepositoryDao.findByVehicleNumber(data);
				resultset = dieselReportsDao.getFortnightlyVehicleSale(vehicle.getId());
			}
			resultset.stream().forEach((record) -> {
				Date date = (Date) record[0];
				Long quantity = ((BigDecimal) record[1]).longValue();

				DieselSaleReportsFortnightly firmRecord = new DieselSaleReportsFortnightly(date, quantity, data);
				dieselFirmSaleFortnightly.add(firmRecord);
			});

			dieselFirmSaleFortnightly.sort(Comparator.comparing(DieselSaleReportsFortnightly::getDate).reversed()); // sorting
																													// based
																													// on
																													// date
			dieselFirmSaleFortnightly.stream().forEach((data1) -> {
				System.out.println(data1);
			});
			return dieselFirmSaleFortnightly;
		} catch (Exception ex) {
			logger.error("Error getting total inflow diesel: {}", ex.toString());
			return dieselFirmSaleFortnightly;
		}
	}

	private void addQuantity(Long quantity, Integer dealType, DieselTransactionDataFortnightly dt) {

		if (dealType == 1) {
			dt.setPurchase(quantity);
		} else if (dealType == 2) {
			dt.setSale(quantity);
		}
	}

}
