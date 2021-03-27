package com.example.demo.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.models.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Integer> {
  List<Task> findAllByIdGreaterThanOrderByIdDesc(int id);
}
