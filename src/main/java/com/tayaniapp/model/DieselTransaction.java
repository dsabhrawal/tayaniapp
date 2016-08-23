package com.tayaniapp.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table
public class DieselTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	@OneToOne//(cascade = CascadeType.MERGE)
	private User user;
	@NotNull
	private int quantity;
	@NotNull
	@OneToOne//(cascade = CascadeType.MERGE)
	private DealType dealType;
	@NotNull
	@OneToOne//(cascade = CascadeType.MERGE)
	private DieselConfiguration dieselConfiguration;
	@OneToOne//(cascade = CascadeType.MERGE)
	private Firm firm;
	@OneToOne//(cascade = CascadeType.MERGE)
	private DieselDealer dieselDealer;
	@OneToOne//(cascade = CascadeType.MERGE)
	private Transport transport;
	@NotNull
	private Date date;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public DealType getDealType() {
		return dealType;
	}

	public void setDealType(DealType dealType) {
		this.dealType = dealType;
	}

	public DieselConfiguration getDieselConfiguration() {
		return dieselConfiguration;
	}

	public void setDieselConfiguration(DieselConfiguration dieselConfiguration) {
		this.dieselConfiguration = dieselConfiguration;
	}

	public Firm getFirm() {
		return firm;
	}

	public void setFirm(Firm firm) {
		this.firm = firm;
	}

	public Transport getTransport() {
		return transport;
	}

	public void setTransport(Transport transport) {
		this.transport = transport;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public DieselDealer getDieselDealer() {
		return dieselDealer;
	}

	public void setDieselDealer(DieselDealer dieselDealer) {
		this.dieselDealer = dieselDealer;
	}

	@Override
	public String toString() {
		return "DieselTransaction [id=" + id + ", user=" + user + ", quantity=" + quantity + ", dealType=" + dealType
				+ ", dieselConfiguration=" + dieselConfiguration + ", firm=" + firm + ", dieselDealer=" + dieselDealer
				+ ", transport=" + transport + ", date=" + date + "]";
	}

}
