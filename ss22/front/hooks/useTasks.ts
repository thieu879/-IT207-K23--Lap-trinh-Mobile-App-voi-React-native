import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  fetchTask as fetchTaskApi,
  fetchTasks as fetchTasksApi,
  updateTask as updateTaskApi,
  updateTaskStatus as updateTaskStatusApi,
} from "@/apis/task.apis";
import { Task, TaskFormData, TaskStatus } from "@/types";

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
  details: () => [...taskKeys.all, "detail"] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
};

export const useTasks = () => {
  return useQuery({
    queryKey: taskKeys.lists(),
    queryFn: async () => {
      const res = await fetchTasksApi();
      return res.data;
    },
  });
};

export const useTask = (id?: string) => {
  return useQuery({
    queryKey: id ? taskKeys.detail(id) : taskKeys.details(),
    queryFn: async () => {
      if (!id) return null;
      const res = await fetchTaskApi(id);
      return res.data as Task;
    },
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: TaskFormData) => createTaskApi(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; payload: TaskFormData }) =>
      updateTaskApi(vars.id, vars.payload),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
      qc.invalidateQueries({ queryKey: taskKeys.detail(vars.id) });
    },
  });
};

export const useUpdateTaskStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; status: TaskStatus }) =>
      updateTaskStatusApi(vars.id, vars.status),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
      qc.invalidateQueries({ queryKey: taskKeys.detail(vars.id) });
    },
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTaskApi(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
      qc.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
};
