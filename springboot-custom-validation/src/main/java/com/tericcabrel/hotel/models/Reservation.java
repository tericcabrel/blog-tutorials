package com.tericcabrel.hotel.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.experimental.Accessors;

@Table(name = "reservations")
@Entity
@Data
@Accessors(chain = true)
public class Reservation {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  @Column(length = 20, unique = true, nullable = false)
  private String code;

  @Column(nullable = false)
  private int bagsCount;

  @Column(nullable = false)
  private Date departureDate;

  @Column(nullable = false)
  private Date arrivalDate;

  @Column(nullable = false)
  private int roomNumber;

  @Column(nullable = false)
  private String[] extras;

  @ManyToOne(targetEntity = User.class, cascade = CascadeType.REMOVE)
  @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
  @JsonBackReference(value = "user-reservations")
  private User user;

  @Lob
  @Column
  private String note;
}
