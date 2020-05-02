import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProductNavigator from './navigation/ProductNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf')
  })
}

export default function App() {
  const [isLoadedFont , setLoadFont] = useState(false); 
  return !isLoadedFont ?
  <AppLoading startAsync = {fetchFont} onFinish = {() => setLoadFont(true)} />
  : 
  (
    <Provider store = {store}>
      <ProductNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
