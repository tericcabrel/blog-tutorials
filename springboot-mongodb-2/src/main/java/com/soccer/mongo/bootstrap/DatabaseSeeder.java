package com.soccer.mongo.bootstrap;

import com.github.javafaker.Faker;
import com.soccer.mongo.models.Address;
import com.soccer.mongo.models.Player;
import com.soccer.mongo.models.PlayerPosition;
import com.soccer.mongo.models.Team;
import com.soccer.mongo.repositories.PlayerRepository;
import com.soccer.mongo.repositories.TeamRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements ApplicationListener<ContextRefreshedEvent> {
  private final TeamRepository teamRepository;

  private final PlayerRepository playerRepository;

  private final Faker faker;

  public DatabaseSeeder(TeamRepository teamRepository, PlayerRepository playerRepository) {
    this.teamRepository = teamRepository;
    this.playerRepository = playerRepository;
    this.faker = new Faker(Locale.FRANCE);
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    /*teamRepository.deleteAll();
    playerRepository.deleteAll();

    Set<String> teamNames = new HashSet<>();
    Set<String> teamAcronyms = new HashSet<>();
    int counter = 0;

    while (counter < 10) {
      String teamName = faker.team().name();
      String teamAcronym = teamName.replaceAll(" ", "").toUpperCase().substring(0, 4);

      if (!teamNames.contains(teamName) && !teamAcronyms.contains(teamAcronym)) {
        teamNames.add(teamName);
        teamAcronyms.add(teamAcronym);

        counter++;
      }
    }

    for(String teamName: teamNames) {
      createAndPersistTeam(teamName);
    }*/
  }

  private void createAndPersistTeam(String teamName) {
    List<Player> players = new ArrayList<>() {{
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
      add(createPlayer());
    }};

    List<Player> createdPlayers = playerRepository.saveAll(players);

    Address address = new Address(
      faker.address().city(),
      faker.address().zipCode(),
      faker.address().streetAddress()
    );

    Team team = new Team()
        .setName(teamName)
        .setAcronym(teamName.replaceAll(" ", "").toUpperCase().substring(0, 4))
        .setAddress(address)
        .setPlayers(new HashSet<>(createdPlayers));

    teamRepository.save(team);
  }

  private Player createPlayer() {
    PlayerPosition[] positions = PlayerPosition.toArray();

    return new Player()
        .setName(faker.name().firstName() + " " + faker.name().lastName())
        .setBirthDate(faker.date().birthday(18, 38))
        .setPosition(positions[faker.random().nextInt(0, positions.length - 1)])
        .setAvailable(faker.random().nextBoolean());
  }
}
