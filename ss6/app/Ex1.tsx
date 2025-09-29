import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const listEmployee = [
  { name: "Nguyễn Văn A" },
  { name: "Nguyễn Văn B" },
  { name: "Nguyễn Văn C" },
  { name: "Trần Thị D" },
  { name: "Phạm Văn E" },
  { name: "Lê Hoàng F" },
  { name: "Đỗ Minh G" },
  { name: "Võ Thị H" },
  { name: "Bùi Quang I" },
  { name: "Phan Thị J" },
];

const EmpItem = ({ name }: { name: string }) => (
  <View>
    <Text>{name}</Text>
  </View>
);
export default function Ex1() {
  return (
    <View>
      <View style={style.container}>
        <FlatList
          data={listEmployee}
          renderItem={({ item }) => <EmpItem name={item.name} />}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

