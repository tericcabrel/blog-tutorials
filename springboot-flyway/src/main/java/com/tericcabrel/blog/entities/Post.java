package com.tericcabrel.blog.entities;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Table(name = "posts")
@Entity
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(unique = true, length = 200, nullable = false)
  private String title;

  @Lob
  private String description;

  @Column(nullable = false, columnDefinition = "varchar(10) not null default 'PENDING'")
  @Enumerated(EnumType.STRING)
  private PostStatusEnum status;

  @ManyToOne(targetEntity = Author.class, cascade = CascadeType.REMOVE)
  @JoinColumn(name = "author_id", nullable = false, referencedColumnName = "id")
  private Author author;

  @CreationTimestamp
  @Column(updatable = false)
  protected Date createdAt;

  @UpdateTimestamp
  protected Date updatedAt;
}
