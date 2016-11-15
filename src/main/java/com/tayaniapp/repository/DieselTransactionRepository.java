package com.tayaniapp.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.DieselTransaction;

@Transactional
public interface DieselTransactionRepository extends CrudRepository<DieselTransaction, Long> {

	@SuppressWarnings("unchecked")
	@Modifying
	DieselTransaction save(DieselTransaction dieselTransactin);

	DieselTransaction findById(Long l);

	@Modifying
	@Query("DELETE FROM DieselTransaction")
	void deleteAll();
	
	@Modifying
	@Query(value ="update diesel_transaction set price = ? where firm = ? and date between ? and ?",  nativeQuery = true)
	int updateSaleTransactions(BigDecimal price, long firmId, String fromDate, String toDate);
	
	@Modifying
	@Query(value ="update diesel_transaction set price = ? where diesel_dealer = ? and date between ? and ?",  nativeQuery = true)
	int updatePurchaseTransactions(BigDecimal price, long dieselDealerId, String fromDate, String toDate);

	@Query("SELECT SUM(quantity) FROM DieselTransaction where dealType = 1")
	Integer getTotalDieselInflow();

	@Query("SELECT SUM(quantity) FROM DieselTransaction where dealType = 2")
	Integer getTotalDieselOutflow();

}
