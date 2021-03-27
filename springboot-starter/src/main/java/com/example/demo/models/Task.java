package com.example.demo.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Table(name = "tasks", indexes = {
    @Index(name = "idx_title", columnList = "title")
})
@Entity()
@NoArgsConstructor()
@Accessors(chain = true)
@Data()
public class Task {
  @Id()
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(insertable = false, updatable = false)
  private int id;

  @Column(length = 100, unique = true)
  private String title;

  @Lob()
  private String description;

  @Column(length = 20)
  private TaskStatusEnum status = TaskStatusEnum.PENDING;

  @Column(name = "max_duration")
  private int maxDuration;

  @Column(name = "is_public", columnDefinition = "boolean default false")
  private boolean isPublic;

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Date createdAt;

  @UpdateTimestamp
  @Column(nullable = false)
  private Date updatedAt;
}
