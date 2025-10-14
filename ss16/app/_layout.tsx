import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ex1 from "./Ex1";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import Ex2 from "./Ex2";
import Ex3 from "./Ex3";
import Ex4 from "./Ex4";
import Ex5 from "./Ex5";

export default function _layout() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        {/* <Ex1 /> */}
        {/* <Ex2></Ex2> */}
        {/* <Ex3></Ex3> */}
        {/* <Ex4></Ex4> */}
        {/* <Ex5></Ex5> */}
      </SafeAreaView>
    </Provider>
  );
}
