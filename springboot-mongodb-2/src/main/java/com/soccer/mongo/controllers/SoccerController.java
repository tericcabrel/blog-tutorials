package com.soccer.mongo.controllers;

import com.soccer.mongo.dtos.CreatePlayerDto;
import com.soccer.mongo.dtos.CreateTeamDto;
import com.soccer.mongo.models.Player;
import com.soccer.mongo.models.PlayerPosition;
import com.soccer.mongo.models.Team;
import com.soccer.mongo.repositories.PlayerRepository;
import com.soccer.mongo.repositories.TeamRepository;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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

  @PutMapping("/teams/{id}")
  public ResponseEntity<Team> updateTeam(@PathVariable String id, @RequestBody CreateTeamDto createTeamDto) {
    Optional<Team> optionalTeam = teamRepository.findById(id);

    if (optionalTeam.isEmpty()) {
      return new ResponseEntity<>(null, HttpStatus.OK);
    }

    Team teamToUpdate = optionalTeam.get()
          .setAddress(createTeamDto.getAddress())
          .setName(createTeamDto.getName())
          .setAcronym(createTeamDto.getAcronym());

    Team teamUpdated =  teamRepository.save(teamToUpdate);

    return new ResponseEntity<>(teamUpdated, HttpStatus.OK);
  }

  @DeleteMapping("/teams/{id}")
  public ResponseEntity<Void> deleteTeam(@PathVariable String id, @RequestBody CreateTeamDto createTeamDto) {
    teamRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @PostMapping("/players/bulk")
  public ResponseEntity<List<Player>> createPlayers(@RequestBody List<CreatePlayerDto> createPlayerDtoList) {
    List<Player> players = createPlayerDtoList
        .stream()
        .map(CreatePlayerDto::toPlayer)
        .collect(Collectors.toList());

    List<Player> playersCreated = playerRepository.saveAll(players);

    return new ResponseEntity<>(playersCreated, HttpStatus.CREATED);
  }

  @PostMapping("/teams/{id}/players")
  public ResponseEntity<Team> addPlayersToTeam(@PathVariable String id, @RequestBody List<String> playerIds) {
    Optional<Team> optionalTeam = teamRepository.findById(id);

    if (optionalTeam.isEmpty()) {
      return new ResponseEntity<>(null, HttpStatus.OK);
    }

    Team teamToUpdate = optionalTeam.get();

    Set<Player> playersToAdd = playerIds.stream()
        .map(playerId -> playerRepository.findById(playerId))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toSet());

    teamToUpdate.setPlayers(playersToAdd);

    Team teamUpdated =  teamRepository.save(teamToUpdate);

    return new ResponseEntity<>(teamUpdated, HttpStatus.OK);
  }

  @GetMapping("/teams")
  public ResponseEntity<List<Team>> allTeams() {
    // List<Team> teams = teamRepository.findAll(Sort.by(Direction.DESC, "name"));
    List<Team> teams = teamRepository.findByIdIsNotNullOrderByNameDesc();

    return new ResponseEntity<>(teams, HttpStatus.OK);
  }

  @GetMapping("/players")
  public ResponseEntity<List<Player>> allPlayers() {
    List<Order> orders = new ArrayList<>(){{
      add(Order.by("position").with(Direction.ASC));
      add(Order.by("name").with(Direction.DESC));
    }};
    List<Player> players = playerRepository.findAll(Sort.by(orders));

    return new ResponseEntity<>(players, HttpStatus.OK);
  }

  @GetMapping("/teams/{id}")
  public ResponseEntity<Team> oneTeam(@PathVariable String id) {
    Optional<Team> teamOptional = teamRepository.findById(id);

    return teamOptional
        .map(team -> new ResponseEntity<>(team, HttpStatus.OK))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/players/{id}")
  public ResponseEntity<Player> onePlayer(@PathVariable String id) {
    Optional<Player> playerOptional = playerRepository.findById(id);

    return playerOptional
        .map(player -> new ResponseEntity<>(player, HttpStatus.OK))
        .orElseGet(() -> ResponseEntity.notFound().build());

  }

  @GetMapping("/players-example1")
  public ResponseEntity<List<Player>> listPlayersExample() {
    List<Player> players = playerRepository.findByPositionAndIsAvailable(PlayerPosition.STRIKER, true);

    return new ResponseEntity<>(players, HttpStatus.OK);
  }

  @GetMapping("/teams-example2")
  public ResponseEntity<List<Team>> listTeamsExample2() {
    List<Team> teams = teamRepository.findByNameContainingIgnoreCaseOrderByNameDesc("as");

    return new ResponseEntity<>(teams, HttpStatus.OK);
  }

  @GetMapping("/players-example3")
  public ResponseEntity<List<Player>> listPlayersExample3() {
    List<PlayerPosition> playerPositions = new ArrayList<>() {{
      add(PlayerPosition.DEFENSIVE_MIDFIELDER);
      add(PlayerPosition.GOALKEEPER);
    }};

    List<Player> players = playerRepository.findDistinctNameByPositionIn(playerPositions);

    return new ResponseEntity<>(players, HttpStatus.OK);
  }

  @GetMapping("/players-example4")
  public ResponseEntity<List<Player>> listPlayersExample4() {
    Calendar calendar = Calendar.getInstance();

    calendar.set(1991, Calendar.JANUARY, 1);
    Date fromDate = calendar.getTime();

    calendar.set(1996, Calendar.JANUARY, 1);
    Date toDate = calendar.getTime();

    List<Player> players = playerRepository.findByBirthDateIsBetweenOrderByBirthDate(fromDate, toDate);

    return new ResponseEntity<>(players, HttpStatus.OK);
  }

  @GetMapping("/players-example5")
  public ResponseEntity<Player> listPlayersExample5() {
    Player player = playerRepository.findFirstByOrderByBirthDateDesc();

    return new ResponseEntity<>(player, HttpStatus.OK);
  }

  @GetMapping("/players-example6")
  public ResponseEntity<List<Player>> listPlayersExample6() {
    List<Player> players = playerRepository.findFirst10ByOrderByBirthDate();

    return new ResponseEntity<>(players, HttpStatus.OK);
  }

  @GetMapping("/teams-example7/{city}")
  public ResponseEntity<List<Team>> listTeamsExample7(@PathVariable String city) {
    List<Team> teams = teamRepository.findByAddressCityIgnoreCase(city);

    return new ResponseEntity<>(teams, HttpStatus.OK);
  }

  @GetMapping("/players-page")
  public ResponseEntity<Page<Player>> listPlayersPage(@RequestParam int page) {
    Page<Player> players = playerRepository.findByIdIsNotNull(PageRequest.of(page - 1, 10));

    return new ResponseEntity<>(players, HttpStatus.OK);
  }
}
