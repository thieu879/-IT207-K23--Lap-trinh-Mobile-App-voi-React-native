import React, { useState } from 'react'
import { View ,Button,Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

const [count, setCount] = useState(0);
export default function Ex1() {
  return (
    <SafeAreaView >
        <View>
            <Text>{count}</Text>
        </View>
        <View>
            <Button title='-' onPress={()=> setCount(count - 1)}></Button>
            <Button title='+' onPress={()=> setCount(count + 1)}></Button>
        </View>
    </SafeAreaView>
  )
}

