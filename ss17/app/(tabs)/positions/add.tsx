import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import PositionForm from "../../../components/PositionForm";
import { useCreatePosition } from "../../../hooks/usePositions";
import { CreatePosition } from "../../../types";

export default function AddPositionScreen() {
  const createPositionMutation = useCreatePosition();

  const handleAddPosition = (data: CreatePosition) => {
    createPositionMutation.mutate(data);
  };

  if (createPositionMutation.isPending) {
    return (
      <>
        <Stack.Screen options={{ title: "Thêm vị trí" }} />
        <ActivityIndicator size="large" style={styles.loading} />
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Thêm vị trí" }} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <PositionForm
          onSubmit={handleAddPosition}
          submitButtonText="Thêm vị trí"
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
