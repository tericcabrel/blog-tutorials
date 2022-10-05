package com.tericcabrel.httpclient.controllers;

import com.tericcabrel.httpclient.models.CreateTaskInput;
import com.tericcabrel.httpclient.models.TaskItemResponse;
import com.tericcabrel.httpclient.models.UpdateTaskInput;
import java.time.LocalDateTime;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
public class TaskController {
  private final RestTemplate restTemplate;

  private final HttpHeaders headers;

  public TaskController() {
    this.restTemplate = new RestTemplate();

    headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmYyZDFjN2UwNWJiMDUwY2RkYTRjYiIsImlhdCI6MTY2NDcxOTcwMCwiZXhwIjoxNjY0ODA2MTAwfQ.nqtb61aHBXCr-ouP154x2oZ97uSkudqPJE3dYHl8nIU");
  }

  private String generateUrl(String path) {
    return "https://react-starter.tericcabrel.com/v1" + path;
  }

  @PostMapping("/create-task")
  public ResponseEntity createTask() {
    CreateTaskInput createTaskInput = new CreateTaskInput();

    createTaskInput
      .setTitle("My task two")
      .setDescription("Description of my task two")
      .setStatus("Done")
      .setImportant(false)
      .setDueDate(LocalDateTime.now().plusDays(2))
      .setUserId("632f2d1c7e05bb050cdda4cb");

    HttpEntity<CreateTaskInput> request = new HttpEntity<>(createTaskInput, headers);
    String url = generateUrl("/tasks/create");

    try {
      ResponseEntity<TaskItemResponse> result = restTemplate.postForEntity(url, request, TaskItemResponse.class);
      TaskItemResponse task = result.getBody();

      assert task != null;

      return ResponseEntity.ok().body(task);
    } catch (HttpClientErrorException exception) {
      switch (exception.getRawStatusCode()) {
        case 401:
          // TODO do something
          break;
        case 422:
          // TODO do something
          break;
        default:
          // TODO do something
          break;
      }
    }

    return ResponseEntity.noContent().build();
  }

  @GetMapping("/all-tasks")
  public ResponseEntity allTasks() {
    HttpEntity<CreateTaskInput> request = new HttpEntity<>(headers);
    String url = generateUrl("/tasks");

    ResponseEntity<TaskItemResponse[]> result = restTemplate.exchange(url, HttpMethod.GET, request, TaskItemResponse[].class);
    TaskItemResponse[] tasks = result.getBody();

    assert tasks != null;

    return ResponseEntity.ok().body(tasks);
  }

  @PostMapping("/delete-task")
  public ResponseEntity deleteTask() {
    String taskId = "6339a2b6ef26d9d6be2f8df4";

    HttpEntity<UpdateTaskInput> request = new HttpEntity<>(headers);
    String url = generateUrl("/tasks/" + taskId);

    restTemplate.exchange(url, HttpMethod.DELETE, request, Void.class);

    return ResponseEntity.noContent().build();
  }
}
