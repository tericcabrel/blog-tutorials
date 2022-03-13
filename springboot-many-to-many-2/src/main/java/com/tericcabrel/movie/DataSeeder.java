package com.tericcabrel.movie;

import com.tericcabrel.movie.entities.Movie;
import com.tericcabrel.movie.entities.User;
import com.tericcabrel.movie.entities.UserMovie;
import com.tericcabrel.movie.entities.UserMovie.UserMovieId;
import com.tericcabrel.movie.repositories.MovieRepository;
import com.tericcabrel.movie.repositories.UserMovieRepository;
import com.tericcabrel.movie.repositories.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements ApplicationListener<ContextRefreshedEvent> {
  private final UserRepository userRepository;

  private final MovieRepository movieRepository;

  private final UserMovieRepository userMovieRepository;

  public DataSeeder(UserRepository userRepository, MovieRepository movieRepository, UserMovieRepository userMovieRepository) {
    this.userRepository = userRepository;
    this.movieRepository = movieRepository;
    this.userMovieRepository = userMovieRepository;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent event) {
    Movie movie1 = new Movie("Movie 1", "Movie 1 description", 2020);
    Movie movie2 = new Movie("Movie 2", "Movie 2 description", 2021);

    Movie createdMovie1 = movieRepository.save(movie1);
    Movie createdMovie2 = movieRepository.save(movie2);

    User user = new User("user@email.com", "John Doe");

    User createdUser = userRepository.save(user);

    UserMovie.UserMovieId userMovieId1 = new UserMovieId(createdUser.getId(), createdMovie1.getId());
    UserMovie userMovie1 = new UserMovie(userMovieId1, 4, "This is a good movie");
    userMovie1.setUser(createdUser);
    userMovie1.setMovie(createdMovie1);

    UserMovie.UserMovieId userMovieId2 = new UserMovieId(createdUser.getId(), createdMovie2.getId());
    UserMovie userMovie2 = new UserMovie(userMovieId2, 5, "This is an awesome movie!");
    userMovie2.setUser(createdUser);
    userMovie2.setMovie(createdMovie2);

    userMovieRepository.save(userMovie1);
    userMovieRepository.save(userMovie2);

    Iterable<UserMovie> userMovieList = userMovieRepository.findAll();

    userMovieList.forEach(um -> {
      System.out.println("The user " + um.getUser().getName() + " gave a rate of " + um.getRate() + " to the movie " + um.getMovie().getName());
    });
  }
}
