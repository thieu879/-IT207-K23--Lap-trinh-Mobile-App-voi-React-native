package com.example.todo.controller;

import com.example.todo.dto.StatusUpdateRequest;
import com.example.todo.dto.TaskRequest;
import com.example.todo.model.Task;
import com.example.todo.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task create(@Valid @RequestBody TaskRequest req) {
        return taskService.create(req);
    }

    @GetMapping
    public List<Task> all() {
        return taskService.findAll();
    }

    @GetMapping("/{id}")
    public Task one(@PathVariable("id") Long id) {
        return taskService.findById(id);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable("id") Long id, @Valid @RequestBody TaskRequest req) {
        return taskService.update(id, req);
    }

    @PatchMapping(value = "/{id}/status")
    public Task updateStatus(
            @PathVariable("id") Long id,
            @RequestBody(required = false) java.util.Map<String, Object> body,
            @RequestParam(value = "status", required = false) String statusParam
    ) {
        try {
            String value = null;
            if (body != null && body.get("status") != null) {
                value = String.valueOf(body.get("status"));
            } else if (statusParam != null) {
                value = statusParam;
            }
            if (value == null || value.trim().isEmpty()) {
                throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Missing status");
            }
            return taskService.updateStatusEnum(id, com.example.todo.model.Status.valueOf(value.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Invalid status value");
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        taskService.delete(id);
    }
}


