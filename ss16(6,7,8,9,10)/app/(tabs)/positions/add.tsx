import { createPosition } from "@/apis/position.api";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { clearCreateStatus } from "@/redux/slices/position.slice";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { CreatePositionRequest } from "../../../apis/position.api";
import PositionForm from "../../../components/PositionForm";

export default function AddPositionScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { createStatus, error } = useAppSelector((state) => state.position);

  const handleAddPosition = async (data: CreatePositionRequest) => {
    dispatch(createPosition(data));
  };

  useEffect(() => {
    if (createStatus === "FULFILLED") {
      Alert.alert("Thành công", "Thêm vị trí thành công!", [
        {
          text: "OK",
          onPress: () => {
            dispatch(clearCreateStatus());
            if (router.canGoBack()) {
              router.back();
            }
          },
        },
      ]);
    }
  }, [createStatus, router, dispatch]);

  useEffect(() => {
    if (createStatus === "FAILED" && error) {
      Alert.alert("Lỗi", error);
    }
  }, [createStatus, error]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <PositionForm
        onSubmit={handleAddPosition}
        submitButtonText="THÊM VỊ TRÍ"
        isLoading={createStatus === "PENDING"}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
