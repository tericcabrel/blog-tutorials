package com.tericcabrel.httpclient.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CreateTaskInput {
  @JsonProperty(required = true)
  private String title;

  @JsonProperty(required = true)
  private String description;

  @JsonProperty(required = true)
  private String status;

  @JsonProperty(value = "is_important", required = true)
  private boolean isImportant;

  @JsonProperty(value = "date", required = true)
  private String dueDate;

  @JsonProperty(value = "user", required = true)
  private String userId;

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

  public String dueDate() {
    return dueDate;
  }

  public String userId() {
    return userId;
  }

  public CreateTaskInput setTitle(String title) {
    this.title = title;
    return this;
  }

  public CreateTaskInput setDescription(String description) {
    this.description = description;
    return this;
  }

  public CreateTaskInput setStatus(String status) {
    this.status = status;
    return this;
  }

  public CreateTaskInput setImportant(boolean important) {
    isImportant = important;
    return this;
  }

  public CreateTaskInput setDueDate(LocalDateTime dueDate) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    this.dueDate = formatter.format(dueDate);

    return this;
  }

  public CreateTaskInput setUserId(String userId) {
    this.userId = userId;
    return this;
  }

  @Override
  public String toString() {
    return "CreateTaskInput{" +
        "title='" + title + '\'' +
        ", description='" + description + '\'' +
        ", status='" + status + '\'' +
        ", isImportant=" + isImportant +
        ", dueDate=" + dueDate +
        ", userId='" + userId + '\'' +
        '}';
  }
}
