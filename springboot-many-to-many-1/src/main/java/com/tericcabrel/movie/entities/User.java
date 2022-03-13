package com.tericcabrel.movie.entities;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Table(name = "users")
@Entity
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false)
  private Integer id;

  @Column(unique = true, nullable = false, length = 100)
  private String email;

  @Column(unique = true, nullable = false, length = 100)
  private String name;

  @ManyToMany()
  @JoinTable(
      name = "users_movies",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "movie_id")
  )
  private Set<Movie> movies;

  public User() {}

  public User(String email, String name) {
    this.email = email;
    this.name = name;
  }

  public Integer getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getName() {
    return name;
  }

  public Set<Movie> getMovies() {
    return movies;
  }

  public void setMovies(Set<Movie> movies) {
    this.movies = movies;
  }
}
