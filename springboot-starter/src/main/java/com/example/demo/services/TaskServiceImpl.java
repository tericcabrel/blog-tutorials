package com.example.demo.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.demo.models.Task;
import com.example.demo.repositories.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {
  private final TaskRepository taskRepository;

  public TaskServiceImpl(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  @Override
  public Task create(Task task) {
    return taskRepository.save(task);
  }

  @Override
  public List<Task> findAll() {
    return taskRepository.findAllByIdGreaterThanOrderByIdDesc(0);
  }
}
