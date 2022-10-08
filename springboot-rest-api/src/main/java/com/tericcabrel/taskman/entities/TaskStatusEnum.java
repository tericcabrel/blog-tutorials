package com.tericcabrel.taskman.entities;

public enum TaskStatusEnum {
    PENDING("pending"),
    IN_PROGRESS("in_progress"),
    DONE("done"),
    KILLED("killed");

    private final String status;

    TaskStatusEnum(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }
}
