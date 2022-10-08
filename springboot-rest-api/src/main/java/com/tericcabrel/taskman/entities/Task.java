package com.tericcabrel.taskman.entities;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Table(name = "tasks")
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Column(unique = true, length = 200, nullable = false)
    private String name;

    @Lob
    private String description;

    @Column(nullable = false, columnDefinition = "varchar(20) not null default 'PENDING'")
    @Enumerated(EnumType.STRING)
    private TaskStatusEnum status;

    @Column(name = "due_date")
    private Date dueDate;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public TaskStatusEnum getStatus() {
        return status;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public Task setId(Integer id) {
        this.id = id;
        return this;
    }

    public Task setName(String name) {
        this.name = name;
        return this;
    }

    public Task setDescription(String description) {
        this.description = description;
        return this;
    }

    public Task setStatus(TaskStatusEnum status) {
        this.status = status;
        return this;
    }

    public Task setDueDate(Date dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public Task setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public Task setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", dueDate=" + dueDate +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
