import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LikeButtonProps {
  isLiked?: boolean;
  onPress?: (isLiked: boolean) => void;
}

const LikeButton = ({
  isLiked: controlledIsLiked,
  onPress,
}: LikeButtonProps) => {
  const [internalIsLiked, setInternalIsLiked] = useState(false);
  const isLiked =
    controlledIsLiked !== undefined ? controlledIsLiked : internalIsLiked;
  const handlePress = () => {
    const newIsLiked = !isLiked;
    if (onPress) {
      onPress(newIsLiked);
    } else {
      setInternalIsLiked(newIsLiked);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, isLiked ? styles.liked : styles.notLiked]}
    >
      <Text style={styles.text}>{isLiked ? "Đã thích" : "Thích"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  liked: {
    backgroundColor: "#007AFF",
  },
  notLiked: {
    backgroundColor: "#8E8E93",
  },
});

export default LikeButton;
