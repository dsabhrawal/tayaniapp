package com.tayaniapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Service;

import com.tayaniapp.beans.Firm;

@Service("firmService")
public class FirmServiceImpl implements FirmService {

	private List<Firm> firms = new ArrayList<Firm>();
	AtomicInteger id = new AtomicInteger();

	@Override
	public List<Firm> getAll() {

		return firms;
	}

	@Override
	public void addFirm(String name) {
		firms.add(new Firm(id.getAndIncrement(), name));
	}

	@Override
	public void deleteFirm(int id) {
		Firm firm = findFirmBydId(id);
		if(null != firm){
			firms.remove(firm);
		}
	}

	private Firm findFirmBydId(int id) {

		for(Firm firm : firms){
			if(firm.getId() == id){
				return firm;
			}
		}
		return null;
	}

	@Override
	public void deleteAll() {
		firms.clear();

	}

}
