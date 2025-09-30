import React, { useEffect, useRef, useState } from 'react'
import { View ,Button,Text,TextInput} from 'react-native';

const [count, setCount] = useState(0);
export default function Ex3() {
  const inputRef = useRef<TextInput>(null);
  return (
    <View style={{ padding: 20 }}>
    <Text>Ô nhập liệu </Text>
    <TextInput
      ref={inputRef}
      style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      placeholder="Nhập gì đó..."
    />
    <Button
      title="Focus input"
      onPress={() => inputRef.current?.focus()} 
    />
  </View>
  )
}

