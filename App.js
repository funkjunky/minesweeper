import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import squares from './Minesweeper/squares';

import Minesweeper from './Minesweeper';

export default function App() {
  const store = configureStore({ reducer: { squares } });

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Minesweeper />
      </Provider>
      <StatusBar style="auto" />
    </View>
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
