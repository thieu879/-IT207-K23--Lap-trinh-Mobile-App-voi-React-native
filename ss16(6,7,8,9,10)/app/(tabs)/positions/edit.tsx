import { getPositionById, updatePosition } from "@/apis/position.api";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { clearUpdateStatus } from "@/redux/slices/position.slice";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { UpdatePositionRequest } from "../../../apis/position.api";
import PositionForm from "../../../components/PositionForm";

export default function EditPositionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const positionId = Number(id);

  const dispatch = useAppDispatch();
  const { currentPosition, status, updateStatus, error } = useAppSelector(
    (state) => state.position
  );

  useEffect(() => {
    if (positionId) {
      dispatch(getPositionById(positionId));
    }
  }, [dispatch, positionId]);

  const handleUpdatePosition = async (data: UpdatePositionRequest) => {
    if (positionId) {
      dispatch(updatePosition({ id: positionId, positionData: data }));
    }
  };

  useEffect(() => {
    if (updateStatus === "FULFILLED") {
      Alert.alert("Thành công", "Cập nhật vị trí thành công!", [
        {
          text: "OK",
          onPress: () => {
            dispatch(clearUpdateStatus());
            if (router.canGoBack()) {
              router.back();
            }
          },
        },
      ]);
    }
  }, [updateStatus, router, dispatch]);

  useEffect(() => {
    if (updateStatus === "FAILED" && error) {
      Alert.alert("Lỗi", error);
    }
  }, [updateStatus, error]);

  if (status === "PENDING") {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Lỗi: {error}</Text>;
  }

  if (!currentPosition) {
    return <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>;
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <PositionForm
        onSubmit={handleUpdatePosition}
        initialValues={{
          positionName: currentPosition.positionName,
          description: currentPosition.description,
          positionStatus: currentPosition.positionStatus,
        }}
        submitButtonText="CẬP NHẬT"
        isLoading={updateStatus === "PENDING"}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});
