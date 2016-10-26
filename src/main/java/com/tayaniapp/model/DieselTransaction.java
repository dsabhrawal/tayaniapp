package com.tayaniapp.model;

import java.math.BigDecimal;
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
	@OneToOne // (cascade = CascadeType.MERGE)
	private User user;
	@NotNull
	private int quantity;
	@NotNull
	@OneToOne // (cascade = CascadeType.MERGE)
	private DealType dealType;
	private BigDecimal price = new BigDecimal("0");
	@OneToOne // (cascade = CascadeType.MERGE)
	private Firm firm;
	@OneToOne // (cascade = CascadeType.MERGE)
	private DieselDealer dieselDealer;
	@OneToOne // (cascade = CascadeType.MERGE)
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal dieselPrice) {
		this.price = dieselPrice;
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
				+ ", price=" + price + ", firm=" + firm + ", dieselDealer=" + dieselDealer + ", transport="
				+ transport + ", date=" + date + "]";
	}

}
