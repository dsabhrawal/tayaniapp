package com.tayaniapp.model;

import java.io.Serializable;
import java.sql.Date;

public class DieselSaleReportsFortnightly implements Serializable {

	private Date date;
	private Long quantity = new Long("0");
	private String scope;

	public DieselSaleReportsFortnightly() {
		super();
	}

	public DieselSaleReportsFortnightly(Date date, Long quantity, String scope) {
		super();
		this.date = date;
		this.quantity = quantity;
		this.scope = scope;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	@Override
	public String toString() {
		return "DieselSaleReportsFortnightly [date=" + date + ", quantity=" + quantity + ", scope=" + scope + "]";
	}

}
