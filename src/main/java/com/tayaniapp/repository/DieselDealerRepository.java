package com.tayaniapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.DieselDealer;
import com.tayaniapp.model.User;

@Transactional
public interface DieselDealerRepository extends CrudRepository<DieselDealer, Long> {

	User findById(long id);

	DieselDealer findByName(String dealerName);

}
