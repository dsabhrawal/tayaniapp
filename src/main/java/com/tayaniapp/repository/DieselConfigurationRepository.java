package com.tayaniapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.DealType;
import com.tayaniapp.model.DieselConfiguration;

@Transactional
public interface DieselConfigurationRepository extends CrudRepository<DieselConfiguration, Long> {

	DieselConfiguration findById(long l);
	DieselConfiguration findByDealType(DealType dealType);

}
