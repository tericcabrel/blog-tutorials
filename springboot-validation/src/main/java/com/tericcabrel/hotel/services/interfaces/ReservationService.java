package com.tericcabrel.hotel.services.interfaces;

import com.tericcabrel.hotel.models.Reservation;
import java.util.List;
import java.util.Optional;

public interface ReservationService {
  Reservation create(Reservation reservation);

  List<Reservation> findAll();

  Optional<Reservation> findByCode(String code);
}
