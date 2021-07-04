package com.tericcabrel.hotel.services;

import com.tericcabrel.hotel.models.Reservation;
import com.tericcabrel.hotel.repositories.ReservationRepository;
import com.tericcabrel.hotel.services.interfaces.ReservationService;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ReservationServiceImpl implements ReservationService {

  private final ReservationRepository reservationRepository;

  public ReservationServiceImpl(ReservationRepository reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  private String generateCode() {
    Optional<Reservation> reservation = reservationRepository.findFirstByOrderByIdDesc();

    int lastId = reservation.map(Reservation::getId).orElse(0);

    return "RSV-" + Calendar.getInstance().get(Calendar.YEAR) + "-" + (1000 + lastId + 1);
  }

  @Override
  public Reservation create(Reservation reservation) {
    reservation.setCode(generateCode());

    return reservationRepository.save(reservation);
  }

  @Override
  public List<Reservation> findAll() {
    List<Reservation> reservations = new ArrayList<>();

    reservationRepository.findAll().forEach(reservations::add);

    return reservations;
  }

  @Override
  public Optional<Reservation> findByCode(String code) {
    return reservationRepository.findByCode(code);
  }
}
