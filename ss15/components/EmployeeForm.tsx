import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Employee, Gender } from "../data/mockData";
import { useEmployees } from "../hooks/useEmployees";
import { usePositions } from "../hooks/usePositions";

interface EmployeeFormProps {
  initialData?: Employee;
  isEdit?: boolean;
}

export default function EmployeeForm({
  initialData,
  isEdit = false,
}: EmployeeFormProps) {
  const router = useRouter();
  const { positions, loading: positionsLoading } = usePositions();
  const { addEmployee, updateEmployee, loading } = useEmployees();

  const [formData, setFormData] = useState({
    employeeCode: initialData?.employeeCode || "",
    employeeName: initialData?.employeeName || "",
    phoneNumber: initialData?.phoneNumber || "",
    gender: initialData?.gender || Gender.MALE,
    positionId: initialData?.positionId || undefined,
  });
  const [date, setDate] = useState(
    initialData?.dateBirth ? new Date(initialData.dateBirth) : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const validateForm = () => {
    if (!formData.employeeCode.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mã nhân viên");
      return false;
    }
    if (!formData.employeeName.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên nhân viên");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
      return false;
    }
    if (!formData.positionId) {
      Alert.alert("Lỗi", "Vui lòng chọn vị trí công việc");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      ...formData,
      dateBirth: date.toISOString().split("T")[0],
    };

    try {
      if (isEdit && initialData) {
        await updateEmployee(initialData.id, payload);
        Alert.alert("Thành công", "Cập nhật nhân viên thành công");
      } else {
        await addEmployee(payload);
        Alert.alert("Thành công", "Thêm nhân viên thành công");
      }
      router.back();
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra");
    }
  };

  if (positionsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="tomato" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Mã nhân viên *</Text>
      <TextInput
        style={styles.input}
        value={formData.employeeCode}
        onChangeText={(v) => handleInputChange("employeeCode", v)}
        placeholder="VD: NV0004"
        editable={!isEdit}
      />

      <Text style={styles.label}>Tên nhân viên *</Text>
      <TextInput
        style={styles.input}
        value={formData.employeeName}
        onChangeText={(v) => handleInputChange("employeeName", v)}
        placeholder="Nguyễn Văn A"
      />

      <Text style={styles.label}>Số điện thoại *</Text>
      <TextInput
        style={styles.input}
        value={formData.phoneNumber}
        onChangeText={(v) => handleInputChange("phoneNumber", v)}
        placeholder="09..."
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(v) => handleInputChange("gender", v)}
        >
          <Picker.Item label="Nam" value={Gender.MALE} />
          <Picker.Item label="Nữ" value={Gender.FEMALE} />
        </Picker>
      </View>

      <Text style={styles.label}>Ngày sinh</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString("vi-VN")}
          editable={false}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={"spinner"}
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Vị trí công việc *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.positionId}
          onValueChange={(v) => handleInputChange("positionId", v)}
        >
          <Picker.Item label="-- Chọn vị trí --" value={undefined} />
          {positions.map((pos) => (
            <Picker.Item key={pos.id} label={pos.positionName} value={pos.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>
              {isEdit ? "Lưu thay đổi" : "Thêm mới"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
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
  label: { fontSize: 16, marginBottom: 8, color: "#333", fontWeight: "600" },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#000",
  },
  pickerContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: { marginTop: 20, marginBottom: 40 },
  submitButton: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
