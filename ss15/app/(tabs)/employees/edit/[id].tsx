import EmployeeForm from "@/components/EmployeeForm";
import { Employee } from "@/data/mockData";
import { useEmployees } from "@/hooks/useEmployees";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function EditEmployeeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getEmployeeByIdFromServer } = useEmployees();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const employeeData = await getEmployeeByIdFromServer(parseInt(id));
        setEmployee(employeeData);
      } catch (error) {
        console.error("Error loading employee:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEmployee();
    }
  }, [id, getEmployeeByIdFromServer]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="tomato" />
        <Text style={styles.loadingText}>Đang tải thông tin nhân viên...</Text>
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy nhân viên</Text>
      </View>
    );
  }

  return <EmployeeForm initialData={employee} isEdit={true} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
  },
});
