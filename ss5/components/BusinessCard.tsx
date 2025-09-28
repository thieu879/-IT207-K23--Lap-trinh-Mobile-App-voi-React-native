import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface BusinessCardProps {
  name?: string;
  jobTitle?: string;
  contactInfo?: string;
  avatarUrl?: string;
}

const BusinessCard = ({
  name = "Special Week",
  jobTitle = "Software Engineer",
  contactInfo = "+84 909090909",
  avatarUrl = "https://i.pinimg.com/736x/fd/35/a8/fd35a836d0498b7838a85608a459835a.jpg",
}: BusinessCardProps) => {
  return (
    <>
      <View style={style.card}>
        <Image
          source={{
            uri: avatarUrl,
          }}
          style={style.avatar}
        />
        <Text style={style.name}>{name}</Text>
        <Text style={style.job}>{jobTitle}</Text>
        <Text style={style.phone}>{contactInfo}</Text>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  job: {
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
  },
});

export default BusinessCard;
