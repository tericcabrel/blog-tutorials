package com.tericcabrel.hotel.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Table(name = "addresses")
@Entity
@Data
@Accessors(chain = true)
public class Address {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  @Column(nullable = false)
  private String country;

  @Column(nullable = false)
  private String city;

  @Column(nullable = false)
  private String zipCode;

  @Column(nullable = false)
  private String street;

  private String state;

  @OneToOne(mappedBy = "address")
  private User user;
}
