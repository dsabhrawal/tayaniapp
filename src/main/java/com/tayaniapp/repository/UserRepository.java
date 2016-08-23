package com.tayaniapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.User;

@Transactional
public interface UserRepository extends CrudRepository<User, Long> {

	User findById(int id);

	
}
