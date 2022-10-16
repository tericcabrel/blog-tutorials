package com.tericcabrel.taskman.controllers;

import com.tericcabrel.taskman.entities.Task;
import com.tericcabrel.taskman.requests.CreateTaskInput;
import com.tericcabrel.taskman.requests.ErrorResponse;
import com.tericcabrel.taskman.requests.UpdateTaskInput;
import com.tericcabrel.taskman.services.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(name = "Task", description = "Manage user tasks")
@RestController
public class TaskController {
    public TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(summary = "Create a new task")
    @ApiResponses({
        @ApiResponse(responseCode = "201", content = {
            @Content(schema = @Schema(implementation = Task.class), mediaType = "application/json")
        }),
        @ApiResponse(responseCode = "500", content = {
            @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json")
        }),
    })
    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody CreateTaskInput createTaskInput) {
        Task taskCreated = taskService.create(createTaskInput.toTask());

        return new ResponseEntity<>(taskCreated, HttpStatus.CREATED);
    }

    @Operation(summary = "Retrieve all tasks")
    @ApiResponses({
        @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = Task[].class), mediaType = "application/json")
        }),
        @ApiResponse(responseCode = "500", content = {
            @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json")
        })
    })
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> allTasks() {
        List<Task> tasks = taskService.findAll();

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @Operation(summary = "Retrieve a task")
    @ApiResponses({
        @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = Task.class), mediaType = "application/json")
        }),
        @ApiResponse(responseCode = "500", content = {
            @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json")
        }),
        @ApiResponse(responseCode = "404", content = {
            @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json")
        })
    })
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> oneTask(@PathVariable int id) {
        Optional<Task> optionalTask = taskService.findById(id);

        if (optionalTask.isPresent()) {
            return new ResponseEntity<>(optionalTask.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Update task information")
    @ApiResponses({
        @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = Task.class), mediaType = "application/json")
        }),
        @ApiResponse(responseCode = "500", content = {
            @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json")
        }),
        @ApiResponse(responseCode = "404", content = {
            @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json")
        }),
    })
    @PatchMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable int id, @RequestBody UpdateTaskInput updateTaskInput) {
        Optional<Task> optionalTask = taskService.findById(id);

        if (optionalTask.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Task taskToUpdate = optionalTask.get();

        taskToUpdate.setStatus(updateTaskInput.status());
        taskToUpdate.setDueDate(updateTaskInput.dueDate());

        Task taskUpdated = taskService.update(taskToUpdate);

        return new ResponseEntity<>(taskUpdated, HttpStatus.OK);
    }

    @Operation(summary = "Delete a task")
    @ApiResponses({
        @ApiResponse(responseCode = "206", content = {
            @Content(schema = @Schema(), mediaType = "application/json")
        }),
        @ApiResponse(responseCode = "500", content = {
            @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json")
        })
    })
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable int id) {
        taskService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
