package com.tericcabrel.httpclient.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class TaskItemResponse {
  @JsonProperty(required = true)
  private String _id;

  @JsonProperty(required = true)
  private String title;

  @JsonProperty(required = true)
  private String description;

  @JsonProperty(required = true)
  private String status;

  @JsonProperty(value = "is_important", required = true)
  private boolean isImportant;

  @JsonProperty(value = "date", required = true)
  private LocalDateTime dueDate;

  @JsonProperty(value = "user", required = true)
  private String userId;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  public String _id() {
    return _id;
  }

  public String title() {
    return title;
  }

  public String description() {
    return description;
  }

  public String status() {
    return status;
  }

  public boolean isImportant() {
    return isImportant;
  }

  public LocalDateTime dueDate() {
    return dueDate;
  }

  public String userId() {
    return userId;
  }

  public LocalDateTime createdAt() {
    return createdAt;
  }

  public LocalDateTime updatedAt() {
    return updatedAt;
  }

  @Override
  public String toString() {
    return "TaskItemResponse{" +
        "_id='" + _id + '\'' +
        ", title='" + title + '\'' +
        ", description='" + description + '\'' +
        ", status='" + status + '\'' +
        ", isImportant=" + isImportant +
        ", dueDate=" + dueDate +
        ", userId='" + userId + '\'' +
        ", createdAt=" + createdAt +
        ", updatedAt=" + updatedAt +
        '}';
  }
}
