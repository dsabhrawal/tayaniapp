package com.tayaniapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.DieselTransaction;

@Transactional
public interface DieselReportsRepository extends JpaRepository<DieselTransaction, Long>{

	@Query(value = "select date, sum(quantity), deal_type from diesel_transaction WHERE date >= DATE_ADD(CURDATE(), INTERVAL -13 DAY) GROUP BY date,deal_type", nativeQuery = true)
	List<Object[]> getTotalDieselFlowFortnightly();
	
	@Query(value="select date, sum(quantity), firm from diesel_transaction WHERE date >= DATE_ADD(CURDATE(), INTERVAL -13 DAY) AND deal_type=2 AND firm=? GROUP BY date,firm", nativeQuery = true)
	List<Object[]> getFortnightlyFirmSale(long l);
	
	@Query(value="select date, sum(quantity), firm from diesel_transaction WHERE date >= DATE_ADD(CURDATE(), INTERVAL -13 DAY) AND deal_type=2 AND transport=? GROUP BY date,transport", nativeQuery = true)
	List<Object[]> getFortnightlyVehicleSale(long l);
}
