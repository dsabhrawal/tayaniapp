package com.tayaniapp.model;

import java.io.Serializable;
import java.sql.Date;

public class DieselTransactionDataFortnightly implements Serializable {

	private static final long serialVersionUID = 1L;
	private Date date;
	private Long purchase = new Long("0");
	private Long sale= new Long("0");

	public DieselTransactionDataFortnightly() {
	}

	public DieselTransactionDataFortnightly(Date date, Long quantity, Long sale) {
		super();
		this.date = date;
		this.purchase = purchase;
		this.sale = sale;
	}

	public DieselTransactionDataFortnightly(Date date2) {
		this.date = date2;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Long getPurchase() {
		return purchase;
	}

	public void setPurchase(Long purchase) {
		this.purchase = purchase;
	}

	public Long getSale() {
		return sale;
	}

	public void setSale(Long sale) {
		this.sale = sale;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DieselTransactionDataFortnightly other = (DieselTransactionDataFortnightly) obj;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "DieselTransactionDataFortnightly [date=" + date + ", purchase=" + purchase + ", sale="
				+ sale + "]";
	}

}
