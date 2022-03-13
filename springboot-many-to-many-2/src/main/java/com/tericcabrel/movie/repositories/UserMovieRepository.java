package com.tericcabrel.movie.repositories;

import com.tericcabrel.movie.entities.UserMovie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMovieRepository extends CrudRepository<UserMovie, UserMovie.UserMovieId> {

}
