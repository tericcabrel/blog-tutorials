package com.example.demo.services;

import com.example.demo.models.Task;
import java.util.List;

public interface TaskService {
  Task create(Task task);

  List<Task> findAll();
}
