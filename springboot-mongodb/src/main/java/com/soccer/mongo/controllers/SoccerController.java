package com.soccer.mongo.controllers;

import com.soccer.mongo.dtos.CreatePlayerDto;
import com.soccer.mongo.dtos.CreateTeamDto;
import com.soccer.mongo.models.Player;
import com.soccer.mongo.models.Team;
import com.soccer.mongo.repositories.PlayerRepository;
import com.soccer.mongo.repositories.TeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SoccerController {
  TeamRepository teamRepository;

  PlayerRepository playerRepository;

  public SoccerController(TeamRepository teamRepository, PlayerRepository playerRepository) {
    this.teamRepository = teamRepository;
    this.playerRepository = playerRepository;
  }

  @PostMapping("/teams")
  public ResponseEntity<Team> createTeam(@RequestBody CreateTeamDto createTeamDto) {
    Team teamCreated = teamRepository.save(createTeamDto.toTeam());

    return new ResponseEntity<>(teamCreated, HttpStatus.CREATED);
  }

  @PostMapping("/players")
  public ResponseEntity<Player> createPlayer(@RequestBody CreatePlayerDto createPlayerDto) {
    Player playerCreated = playerRepository.save(createPlayerDto.toPlayer());

    return new ResponseEntity<>(playerCreated, HttpStatus.CREATED);
  }
}
