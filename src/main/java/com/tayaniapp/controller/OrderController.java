package com.tayaniapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tayaniapp.beans.Order;
import com.tayaniapp.service.OrderService;

@Controller
@RequestMapping("/rest")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@RequestMapping("/orders")
	public @ResponseBody List<Order> getAllOrders() {
		return orderService.getAllOrders();
	}

	@RequestMapping(value = "/order/add", method = RequestMethod.POST)
	public @ResponseBody void addOrder(@RequestBody Order order) {
		orderService.saveOrder(order);
	}

	@RequestMapping(value = "/order/update", method = RequestMethod.PUT)
	public @ResponseBody void updateOrder(@RequestBody Order order) {
		System.out.println("Inside order updade.");
		orderService.updateOrder(order);
	}

	@RequestMapping(value = "/order/remove/{id}", method = RequestMethod.DELETE)
	public @ResponseBody void deleteOrder(@PathVariable("id") int id) {
		orderService.deleteOrder(id);
	}

	@RequestMapping(value = "/orders", method = RequestMethod.DELETE)
	public @ResponseBody void deleteAllOrders() {
		orderService.deleteAllOrders();
	}
}
