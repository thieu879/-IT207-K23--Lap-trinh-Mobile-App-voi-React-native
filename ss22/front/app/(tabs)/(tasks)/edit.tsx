import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as yup from "yup";
import TaskForm from "../../../components/TaskForm";
import { TaskFormData, TaskPriority } from "../../../types";
import { useUpdateTask } from "../../../hooks/useTasks";

// Schema tương tự Add
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên công việc là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
  priority: yup
    .mixed<TaskPriority>()
    .oneOf(Object.values(TaskPriority))
    .required(),
  description: yup.string().required().default(""),
});

export default function EditTaskScreen() {
  const router = useRouter();
  // Lấy dữ liệu được truyền từ TaskListItem
  const params = useLocalSearchParams() as unknown as TaskFormData & {
    id: string;
  };
  const { mutate: updateTask, isPending } = useUpdateTask();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: params.name || "",
      priority: params.priority || TaskPriority.Medium,
      description: params.description || "",
    },
  });

  const onSubmit = handleSubmit((data: TaskFormData) => {
    if (!params.id) return;
    updateTask(
      { id: params.id, payload: data },
      {
        onSuccess: () => router.back(),
      }
    );
  });

  if (!params.id) {
    return (
      <View>
        <Text>Không tìm thấy công việc.</Text>
      </View>
    );
  }

  return (
    <TaskForm control={control} errors={errors} onSubmit={onSubmit} isEdit />
  );
}
