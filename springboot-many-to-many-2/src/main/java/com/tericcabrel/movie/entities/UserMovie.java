package com.tericcabrel.movie.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "users_movies")
public class UserMovie {
  @EmbeddedId
  private UserMovieId id = new UserMovieId();

  @ManyToOne
  @MapsId("userId")
  private User user;

  @ManyToOne
  @MapsId("movieId")
  private Movie movie;

  @Column(nullable = false)
  private int rate;

  @Lob
  private String review;

  @CreationTimestamp
  @Column(name = "added_at", nullable = false)
  private Date addedAt;

  public UserMovie() {}

  public UserMovie(UserMovieId id, int rate, String review) {
    this.id = id;
    this.rate = rate;
    this.review = review;
  }

  public UserMovieId getId() {
    return id;
  }

  public User getUser() {
    return user;
  }

  public Movie getMovie() {
    return movie;
  }

  public int getRate() {
    return rate;
  }

  public String getReview() {
    return review;
  }

  public Date getAddedAt() {
    return addedAt;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public void setMovie(Movie movie) {
    this.movie = movie;
  }

  @Override
  public String toString() {
    return "UserMovie{" +
        "id=" + id.toString() +
        ", user=" + user +
        ", movie=" + movie +
        ", rate=" + rate +
        ", review='" + review + '\'' +
        ", addedAt=" + addedAt +
        '}';
  }

  @Embeddable
  public static class UserMovieId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer userId;

    private Integer movieId;

    public UserMovieId() {}

    public UserMovieId(Integer userId, Integer movieId) {
      super();
      this.userId = userId;
      this.movieId = movieId;
    }

    public Integer getUserId() {
      return userId;
    }

    public Integer getMovieId() {
      return movieId;
    }

    public void setUserId(Integer userId) {
      this.userId = userId;
    }

    public void setMovieId(Integer movieId) {
      this.movieId = movieId;
    }

    @Override
    public String toString() {
      return "UserMovieId{" +
          "userId=" + userId +
          ", movieId=" + movieId +
          '}';
    }
  }
}

