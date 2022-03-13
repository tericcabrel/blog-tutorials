package com.tericcabrel.movie;

import com.tericcabrel.movie.entities.Movie;
import com.tericcabrel.movie.entities.User;
import com.tericcabrel.movie.repositories.MovieRepository;
import com.tericcabrel.movie.repositories.UserRepository;
import java.util.HashSet;
import java.util.Set;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements ApplicationListener<ContextRefreshedEvent> {
  private final UserRepository userRepository;

  private final MovieRepository movieRepository;

  public DataSeeder(UserRepository userRepository, MovieRepository movieRepository) {
    this.userRepository = userRepository;
    this.movieRepository = movieRepository;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent event) {
    Movie movie1 = new Movie("Movie 1", "Movie 1 description", 2020);
    Movie movie2 = new Movie("Movie 2", "Movie 2 description", 2021);

    Movie createdMovie1 = movieRepository.save(movie1);
    Movie createdMovie2 = movieRepository.save(movie2);

    User user = new User("user@email.com", "John Doe");

    Set<Movie> movies = new HashSet<>();
    movies.add(createdMovie1);
    movies.add(createdMovie2);

    user.setMovies(movies);

    User createdUser = userRepository.save(user);

    createdUser.getMovies().forEach(System.out::println);
  }
}
