package com.tayaniapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.DealType;

@Transactional
public interface DealTypeRepository extends CrudRepository<DealType, Long> {

	DealType findById(int id);
	
	DealType findByType(String dealType);


}
