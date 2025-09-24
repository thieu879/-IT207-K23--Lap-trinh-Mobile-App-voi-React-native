import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Send } from 'lucide-react-native';

export default function Ex3() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }}
          />
          <Text style={styles.username}>thuy_anh26</Text>
        </View>

        <Image
          style={styles.postImage}
          source={{
            uri: "https://i.pinimg.com/736x/b8/86/b2/b886b20ce517adae1f8b2fb5bad00fe6.jpg",
          }}
        />

        <View style={styles.actionBar}>
          <Heart size={28} color="red" style={styles.icon} />
          <MessageCircle size={28} color="#000" style={styles.icon} />
          <Send size={28} color="#000" style={styles.icon} />
        </View>

        <View>
          <Text style={styles.descriptionText}>
            <Text style={styles.username}>thuy_anh26</Text> Một buổi chiều yên
            bình bên bờ biển. 🌊☀️
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: Dimensions.get('window').width - 48,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
