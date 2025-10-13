import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Home from './ex1/Home'
import ButtonNav from '@/components/ex2/ButtonNav'

export default function _layout() {
  return (
    <SafeAreaView>
      <ButtonNav></ButtonNav>
    </SafeAreaView>
  )
}
