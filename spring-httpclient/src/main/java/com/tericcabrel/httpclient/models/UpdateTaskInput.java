package com.tericcabrel.httpclient.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class UpdateTaskInput {
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

  public UpdateTaskInput setTitle(String title) {
    this.title = title;
    return this;
  }

  public UpdateTaskInput setDescription(String description) {
    this.description = description;
    return this;
  }

  public UpdateTaskInput setStatus(String status) {
    this.status = status;
    return this;
  }

  public UpdateTaskInput setImportant(boolean important) {
    isImportant = important;
    return this;
  }

  public UpdateTaskInput setDueDate(LocalDateTime dueDate) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    this.dueDate = formatter.format(dueDate);

    return this;
  }

  @Override
  public String toString() {
    return "UpdateTaskInput{" +
        "title='" + title + '\'' +
        ", description='" + description + '\'' +
        ", status='" + status + '\'' +
        ", isImportant=" + isImportant +
        ", dueDate=" + dueDate + '\'' +
        '}';
  }
}
