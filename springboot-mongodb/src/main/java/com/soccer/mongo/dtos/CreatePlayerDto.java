package com.soccer.mongo.dtos;

import com.soccer.mongo.models.PlayerPosition;
import com.soccer.mongo.models.Player;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreatePlayerDto {
  private String name;

  private Date birthDate;

  private PlayerPosition position;

  private Date contractEndDate;

  public Player toPlayer() {
    return new Player().setName(name).setBirthDate(birthDate).setPosition(position).setContractEndDate(contractEndDate);
  }
}
