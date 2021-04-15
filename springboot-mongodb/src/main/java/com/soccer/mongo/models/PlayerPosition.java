package com.soccer.mongo.models;

import lombok.Getter;

@Getter
public enum PlayerPosition {
  GOALKEEPER("goalkeeper"),
  LEFT_FULLBACK("left_fullback"),
  RIGHT_FULLBACK("right_fullback"),
  CENTER_FULLBACK("center_fullback"),
  MIDFIELDER("midfielder"),
  LEFT_MIDFIELDER("left_midfielder"),
  RIGHT_MIDFIELDER("right_midfielder"),
  DEFENSIVE_MIDFIELDER("defensive_midfielder"),
  WINGER("winger"),
  LEFT_WINGER("left_winger"),
  RIGHT_WINGER("right_winger"),
  STRIKER("striker"),
  SECOND_STRIKER("second_striker");

  private final String position;

  PlayerPosition(String position) {
    this.position = position;
  }
}
