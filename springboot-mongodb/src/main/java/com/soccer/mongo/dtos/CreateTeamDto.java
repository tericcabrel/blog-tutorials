package com.soccer.mongo.dtos;

import com.soccer.mongo.models.Address;
import com.soccer.mongo.models.Team;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateTeamDto {
  private String name;

  private String acronym;

  private Address address;

  public Team toTeam() {
    return new Team().setName(name).setAcronym(acronym).setAddress(address);
  }
}
