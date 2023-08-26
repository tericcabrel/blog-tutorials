package com.tericcabrel.taskman.requests;

import com.tericcabrel.taskman.entities.TaskStatusEnum;

import java.util.Date;

public record UpdateTaskInput(TaskStatusEnum status, Date dueDate) {

}
