package com.tayaniapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tayaniapp.beans.Order;

@Service("orderService")
public class OrderServiceImpl implements OrderService {

	List<Order> orders = new ArrayList<Order>();
	private int id = 0;

	@Override
	public List<Order> getAllOrders() {
		return orders;
	}

	@Override
	public void saveOrder(Order order) {
			order.setId(++id);
			addOrder(order);
	}

	@Override
	public void updateOrder(Order order) {
		Order found = findOrderById(order.getId());
		if (null != found) {
			removeOrder(found);
			addOrder(order);
		}
	}

	@Override
	public void deleteOrder(int id) {
		Order order = findOrderById(id);
		if(null != order){
			removeOrder(order);
			id--;
		}
	}

	@Override
	public void deleteAllOrders() {
		orders.clear();
	}

	private Order findOrderById(int id) {
		for (Order order : orders) {
			if (order.getId() == id) {
				return order;
			}
		}
		return null;
	}

	private void removeOrder(Order order) {
		orders.remove(order);

	}

	private void addOrder(Order order) {
		orders.add(order);

	}

}
