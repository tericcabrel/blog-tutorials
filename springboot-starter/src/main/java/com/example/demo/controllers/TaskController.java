package com.example.demo.controllers;

import com.example.demo.models.CreateTaskDto;
import com.example.demo.models.Task;
import com.example.demo.services.TaskService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/tasks")
public class TaskController {
  private final TaskService taskService;

  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @PostMapping(path = "")
  public ResponseEntity<Task> createTask(@RequestBody CreateTaskDto taskParam) {
    Task createdTask = taskService.create(taskParam.toTask());

    return ResponseEntity.ok(createdTask);
  }

  @GetMapping(path = "")
  public ResponseEntity<List<Task>> findAllTasks() {
    List<Task> allTasks = taskService.findAll();

    return ResponseEntity.ok(allTasks);
  }
}
