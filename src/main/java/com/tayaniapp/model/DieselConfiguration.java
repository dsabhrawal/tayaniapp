package com.tayaniapp.model;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table
public class DieselConfiguration {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column(length = 5, nullable = false)
	private BigDecimal price;
	@OneToOne//(cascade = {CascadeType.PERSIST, CascadeType.REFRESH})
	private DealType dealType;

	public DieselConfiguration(long id) {
		this.id = id;
	}

	public DieselConfiguration(BigDecimal price, DealType dealType) {
		super();
		this.price = price;
		this.dealType = dealType;
	}

	public DieselConfiguration() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public DealType getDealType() {
		return dealType;
	}

	public void setDealType(DealType dealType) {
		this.dealType = dealType;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((dealType == null) ? 0 : dealType.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((price == null) ? 0 : price.hashCode());
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
		DieselConfiguration other = (DieselConfiguration) obj;
		if (dealType == null) {
			if (other.dealType != null)
				return false;
		} else if (!dealType.equals(other.dealType))
			return false;
		if (id != other.id)
			return false;
		if (price == null) {
			if (other.price != null)
				return false;
		} else if (!price.equals(other.price))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "DieselConfiguration [id=" + id + ", price=" + price + ", dealType=" + dealType + "]";
	}

}
