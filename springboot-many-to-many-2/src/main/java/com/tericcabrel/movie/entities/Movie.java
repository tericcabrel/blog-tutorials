package com.tericcabrel.movie.entities;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Table(name = "movies")
@Entity
public class Movie {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false)
  private Integer id;

  @Column(nullable = false, length = 150)
  private String name;

  @Lob
  private String description;

  @Column(nullable = false)
  private Integer releaseDate;

  public Movie() {
  }

  public Movie(String name, String description, Integer releaseDate) {
    this.name = name;
    this.description = description;
    this.releaseDate = releaseDate;
  }

  public Integer getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public Integer getReleaseDate() {
    return releaseDate;
  }
}
