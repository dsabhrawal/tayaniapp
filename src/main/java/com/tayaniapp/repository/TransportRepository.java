package com.tayaniapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tayaniapp.model.Transport;
import com.tayaniapp.model.User;

@Transactional
public interface TransportRepository extends CrudRepository<Transport, Long> {

	User findById(long id);

	Transport findByVehicleNumber(String vehicleNumber);
}
