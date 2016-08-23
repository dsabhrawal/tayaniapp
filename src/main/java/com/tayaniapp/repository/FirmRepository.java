package com.tayaniapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.Firm;

@Transactional
public interface FirmRepository extends CrudRepository<Firm, Long> {

	Firm findById(int id);

	Firm findByName(String name);

}
