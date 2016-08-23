package com.tayaniapp.model;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table
public class Transport {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotNull
	private String vehicleNumber;
	@OneToOne(cascade = CascadeType.MERGE)
	@NotNull
	private Firm firm;
	@NotNull
	private String vehicleCompany;
	@NotNull
	private String vehicleType;
	@NotNull
	private String vehicleModel;
	@NotNull
	private Date purchased;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getVehicleNumber() {
		return vehicleNumber;
	}

	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}

	public Firm getFirm() {
		return firm;
	}

	public void setFirm(Firm firm) {
		this.firm = firm;
	}

	public String getVehicleCompany() {
		return vehicleCompany;
	}

	public void setVehicleCompany(String vehicleCompany) {
		this.vehicleCompany = vehicleCompany;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getVehicleModel() {
		return vehicleModel;
	}

	public void setVehicleModel(String vehicleModel) {
		this.vehicleModel = vehicleModel;
	}

	public Date getPurchased() {
		return purchased;
	}

	public void setPurchased(Date purchased) {
		this.purchased = purchased;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((firm == null) ? 0 : firm.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((purchased == null) ? 0 : purchased.hashCode());
		result = prime * result + ((vehicleCompany == null) ? 0 : vehicleCompany.hashCode());
		result = prime * result + ((vehicleModel == null) ? 0 : vehicleModel.hashCode());
		result = prime * result + ((vehicleNumber == null) ? 0 : vehicleNumber.hashCode());
		result = prime * result + ((vehicleType == null) ? 0 : vehicleType.hashCode());
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
		Transport other = (Transport) obj;
		if (firm == null) {
			if (other.firm != null)
				return false;
		} else if (!firm.equals(other.firm))
			return false;
		if (id != other.id)
			return false;
		if (purchased == null) {
			if (other.purchased != null)
				return false;
		} else if (!purchased.equals(other.purchased))
			return false;
		if (vehicleCompany == null) {
			if (other.vehicleCompany != null)
				return false;
		} else if (!vehicleCompany.equals(other.vehicleCompany))
			return false;
		if (vehicleModel == null) {
			if (other.vehicleModel != null)
				return false;
		} else if (!vehicleModel.equals(other.vehicleModel))
			return false;
		if (vehicleNumber == null) {
			if (other.vehicleNumber != null)
				return false;
		} else if (!vehicleNumber.equals(other.vehicleNumber))
			return false;
		if (vehicleType == null) {
			if (other.vehicleType != null)
				return false;
		} else if (!vehicleType.equals(other.vehicleType))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Transport [id=" + id + ", vehicleNumber=" + vehicleNumber + ", firm=" + firm + ", vehicleCompany="
				+ vehicleCompany + ", vehicleType=" + vehicleType + ", vehicleModel=" + vehicleModel + ", purchased="
				+ purchased + "]";
	}

}
