import React, { JSX } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

export default function Ex4(): JSX.Element {
  const netInfo = useNetInfo();

  const isConnected = netInfo.isConnected;
  const type = netInfo.type;

  return (
    <View style={styles.container}>
      {!isConnected && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Không có kết nối mạng</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.title}>Trạng thái kết nối mạng</Text>
        <Text style={styles.text}>
          Có kết nối không?{" "}
          <Text style={{ fontWeight: "bold" }}>
            {isConnected ? "Có" : "Không"}
          </Text>
        </Text>
        {isConnected && (
          <Text style={styles.text}>
            Loại kết nối: <Text style={{ fontWeight: "bold" }}>{type}</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  banner: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 4,
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
});
