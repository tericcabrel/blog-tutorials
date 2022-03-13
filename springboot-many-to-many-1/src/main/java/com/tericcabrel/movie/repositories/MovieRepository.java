package com.tericcabrel.movie.repositories;

import com.tericcabrel.movie.entities.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {

}
