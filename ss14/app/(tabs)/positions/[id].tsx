import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { usePositions } from "../../../hooks/usePositions";
import { PositionStatus } from "../../../types";

const getStatusColor = (status: PositionStatus) => {
  console.log(status);

  switch (status) {
    case "ACTIVE":
      return "#38A169";
    case "INACTIVE":
      return "#E53E3E";
    default:
      return "#718096";
  }
};

export default function PositionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getPositionById, loading } = usePositions();

  const position = getPositionById(id);

  if (loading) return <ActivityIndicator size="large" />;
  if (!position)
    return <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>;

  const statusColor = getStatusColor(position.positionStatus);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tên vị trí</Text>
        <Text style={styles.valueName}>{position.positionName}</Text>

        <Text style={styles.label}>Mô tả</Text>
        <Text style={styles.valueDescription}>{position.description}</Text>

        <Text style={styles.label}>Trạng thái</Text>
        <Text
          style={[
            styles.valueStatus,
            { color: "white", backgroundColor: statusColor },
          ]}
        >
          {position.positionStatus}
        </Text>

        <Text style={styles.label}>Ngày tạo</Text>
        <Text style={styles.valueDescription}>
          <Text>
            {new Date(position.createdAt).toLocaleDateString("vi-VN")}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    elevation: 3,
  },
  label: { fontSize: 16, color: "gray", marginTop: 20 },
  valueName: { fontSize: 28, fontWeight: "bold", color: "#2D3748" },
  valueDescription: { fontSize: 24, color: "#D69E2E", fontWeight: "500" },
  valueStatus: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 3,
    borderRadius: 5,
    minWidth: "auto",
    alignSelf: "baseline",
  },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});
