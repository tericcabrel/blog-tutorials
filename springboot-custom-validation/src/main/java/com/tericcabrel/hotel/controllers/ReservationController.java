package com.tericcabrel.hotel.controllers;

import com.tericcabrel.hotel.exceptions.ResourceNotFoundException;
import com.tericcabrel.hotel.models.Reservation;
import com.tericcabrel.hotel.models.User;
import com.tericcabrel.hotel.models.dtos.CreateReservationDto;
import com.tericcabrel.hotel.services.interfaces.ReservationService;
import com.tericcabrel.hotel.services.interfaces.UserService;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequestMapping(value = "/reservations")
@RestController
public class ReservationController {
  private final ReservationService reservationService;

  private final UserService userService;

  public ReservationController(ReservationService reservationService, UserService userService) {
    this.reservationService = reservationService;
    this.userService = userService;
  }

  @PostMapping("")
  public ResponseEntity<Reservation> createReservation(@Valid @RequestBody CreateReservationDto createReservationDto)
      throws ResourceNotFoundException {
    Optional<User> optionalUser = userService.findById(createReservationDto.getUserId());

    if (optionalUser.isEmpty()) {
      throw new ResourceNotFoundException("No user found with the Id: " + createReservationDto.getUserId());
    }

    Reservation reservationInput = createReservationDto.toReservation().setUser(optionalUser.get());

    Reservation createdReservation = reservationService.create(reservationInput);

    return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
  }

  @GetMapping("")
  public ResponseEntity<List<Reservation>> allReservations() {
    return new ResponseEntity<>(reservationService.findAll(), HttpStatus.OK);
  }

  @GetMapping("/{code}")
  public ResponseEntity<Reservation> oneReservation(
      @Pattern(regexp = "^RSV(-\\d{4,}){2}$", message = "The reservation code is invalid") @PathVariable String code
  ) throws ResourceNotFoundException {
    Optional<Reservation> optionalReservation = reservationService.findByCode(code);

    if (optionalReservation.isEmpty()) {
      throw new ResourceNotFoundException("No reservation found with the code: " + code);
    }

    return new ResponseEntity<>(optionalReservation.get(), HttpStatus.OK);
  }
}
