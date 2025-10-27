import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Bạn đang xem chi tiết Item {id}
      </Text>
    </View>
  );
}
