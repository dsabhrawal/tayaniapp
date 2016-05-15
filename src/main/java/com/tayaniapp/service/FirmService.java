package com.tayaniapp.service;

import java.util.List;

import com.tayaniapp.beans.Firm;

public interface FirmService {

	List<Firm> getAll();

	void addFirm(String name);

	void deleteFirm(int id);

	void deleteAll();
}
