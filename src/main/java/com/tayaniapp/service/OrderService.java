package com.tayaniapp.service;

import java.util.List;

import com.tayaniapp.beans.Order;

public interface OrderService {

	List<Order> getAllOrders();

	void saveOrder(Order order);

	void updateOrder(Order order);

	void deleteOrder(int id);

	void deleteAllOrders();
}
