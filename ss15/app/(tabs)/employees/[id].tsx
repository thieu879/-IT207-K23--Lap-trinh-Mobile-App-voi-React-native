import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Employee, Gender } from "../../../data/mockData";
import { useEmployees } from "../../../hooks/useEmployees";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function EmployeeDetailScreen() {
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

  const formatGender = (gender: Gender) => {
    return gender === Gender.MALE ? "Nam" : "Nữ";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <InfoRow label="Mã nhân viên" value={employee.employeeCode} />
        <InfoRow label="Họ và tên" value={employee.employeeName} />
        <InfoRow label="Số điện thoại" value={employee.phoneNumber} />
        <InfoRow label="Giới tính" value={formatGender(employee.gender)} />
        <InfoRow
          label="Ngày sinh"
          value={new Date(employee.dateBirth).toLocaleDateString("vi-VN")}
        />
        <InfoRow label="Vị trí" value={employee.positionName} />
        <InfoRow
          label="Ngày tạo"
          value={new Date(employee.createdAt).toLocaleDateString("vi-VN")}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 15 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
  },
  card: { backgroundColor: "white", borderRadius: 10, padding: 20 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontSize: 16, color: "gray" },
  value: { fontSize: 16, fontWeight: "bold" },
});
