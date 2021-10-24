package com.tericcabrel.blog.entities;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Table(name = "authors")
@Entity
public class Author {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(unique = true, length = 100, nullable = false)
  private String name;

  @Column(length = 100, nullable = false)
  private String password;

  @Column(nullable = false, columnDefinition = "tinyint not null default 0")
  private boolean enabled;

  @CreationTimestamp
  @Column(updatable = false)
  protected Date createdAt;

  @UpdateTimestamp
  protected Date updatedAt;
}
