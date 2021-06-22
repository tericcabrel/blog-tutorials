package com.tericcabrel.hotel;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import com.tericcabrel.hotel.models.Reservation;
import com.tericcabrel.hotel.repositories.ReservationRepository;
import com.tericcabrel.hotel.services.ReservationServiceImpl;
import java.util.Calendar;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {
  @Mock
  private ReservationRepository reservationRepository;

  @InjectMocks
  private ReservationServiceImpl reservationService;

  @Test
  public void testGenerateFirstCode() {
    given(reservationRepository.findFirstByOrderByIdDesc()).willReturn(Optional.empty());
    given(reservationRepository.save(ArgumentMatchers.any(Reservation.class))).willReturn(new Reservation().setId(1));

    ArgumentCaptor<Reservation> reservationToCreateCaptor = ArgumentCaptor.forClass(Reservation.class);
    reservationService.create(new Reservation());

    verify(reservationRepository).findFirstByOrderByIdDesc();
    verify(reservationRepository).save(reservationToCreateCaptor.capture());

    String generatedCodeExpected = "RSV-" + Calendar.getInstance().get(Calendar.YEAR) + "-1001";

    assertThat(reservationToCreateCaptor.getValue().getCode()).isEqualTo(generatedCodeExpected);
  }

  @Test
  public void testGenerateCode() {
    Reservation mostRecentReservation = new Reservation().setId(1234).setCode("RSV-2021-1234");

    given(reservationRepository.findFirstByOrderByIdDesc()).willReturn(Optional.of(mostRecentReservation));
    given(reservationRepository.save(ArgumentMatchers.any(Reservation.class))).willReturn(new Reservation().setId(1235));

    ArgumentCaptor<Reservation> reservationToCreateCaptor = ArgumentCaptor.forClass(Reservation.class);
    reservationService.create(new Reservation());

    verify(reservationRepository).findFirstByOrderByIdDesc();
    verify(reservationRepository).save(reservationToCreateCaptor.capture());

    String generatedCodeExpected = "RSV-" + Calendar.getInstance().get(Calendar.YEAR) + "-2235";

    assertThat(reservationToCreateCaptor.getValue().getCode()).isEqualTo(generatedCodeExpected);
  }
}
