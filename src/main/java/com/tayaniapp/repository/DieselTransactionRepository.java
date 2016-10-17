package com.tayaniapp.repository;

import java.util.List;

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

	@Query(value = "select date, sum(quantity), deal_type from diesel_transaction WHERE date >= DATE_ADD(CURDATE(), INTERVAL -13 DAY) GROUP BY date,deal_type", nativeQuery = true)
	List<Object[]> getTotalDieselFlowFortnightly();

	/*
	 * @Query("SELECT SUM(quantity) FROM DieselTransaction where dealType = 2")
	 * Integer getTotalDieselOutflow();
	 */

	@Query("SELECT SUM(quantity) FROM DieselTransaction where dealType = 1")
	Integer getTotalDieselInflow();

	@Query("SELECT SUM(quantity) FROM DieselTransaction where dealType = 2")
	Integer getTotalDieselOutflow();

}
