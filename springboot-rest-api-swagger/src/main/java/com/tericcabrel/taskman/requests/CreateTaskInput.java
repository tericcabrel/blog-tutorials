package com.tericcabrel.taskman.requests;

import com.tericcabrel.taskman.entities.Task;
import com.tericcabrel.taskman.entities.TaskStatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;

@Schema(title = "CreateTaskInput", description = "Parameters required to create a task", required = true)
public record CreateTaskInput(String name, String description, TaskStatusEnum status, Date dueDate) {
    public Task toTask() {
        Task task = new Task();

        task.setName(name)
            .setDescription(description)
            .setStatus(status)
            .setDueDate(dueDate);

        return task;
    }
}
