package com.tayaniapp.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.DieselTransaction;

@Transactional
public interface DieselTransactionRepository extends CrudRepository<DieselTransaction, Long> {

	@Modifying
	DieselTransaction save(DieselTransaction dieselTransactin);
	DieselTransaction findById(Long l);
	
	@Query("SELECT SUM(quantity) FROM DieselTransaction where dealType = 1")
	int getTotalDieselInflow();
	
	@Query("SELECT SUM(quantity) FROM DieselTransaction where dealType = 2")
	int getTotalDieselOutflow();

}
