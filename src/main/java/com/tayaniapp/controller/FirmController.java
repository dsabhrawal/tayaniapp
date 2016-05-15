package com.tayaniapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tayaniapp.beans.Firm;
import com.tayaniapp.service.FirmService;

@RestController
@RequestMapping("/rest/firm")
public class FirmController {

	@Autowired
	FirmService firmService;

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Firm> getAllFirms() {
		return firmService.getAll();
	}

	@RequestMapping(value = "/add/{name}", method = RequestMethod.POST)
	public void addFirm(@PathVariable("name") String firmName) {
		firmService.addFirm(firmName);
	}

	@RequestMapping(value = "/remove/{id}", method = RequestMethod.DELETE)
	public @ResponseBody void removeFirm(@PathVariable("id") int id) {
		firmService.deleteFirm(id);
	}

	@RequestMapping(value = "/all", method = RequestMethod.DELETE)
	public @ResponseBody void removeAllFirms() {
		firmService.deleteAll();
	}
}
