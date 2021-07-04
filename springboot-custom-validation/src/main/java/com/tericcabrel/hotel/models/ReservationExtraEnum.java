package com.tericcabrel.hotel.models;

import lombok.Getter;

@Getter
public enum ReservationExtraEnum {
  WITH_AIR("with_air"),
  WITH_TV("with_tv"),
  WITH_KITCHEN("with_kitchen"),
  WITH_HEATING("with_heating"),
  WITH_INTERNET("with_internet");

  private final String value;

  ReservationExtraEnum(String value) {
    this.value = value;
  }
}
