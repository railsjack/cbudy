import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';

const { persistor, store } = configureStore();
console.disableYellowBox = true;
export default function App() {
  return <Root store={store} persistor={persistor} />;
}
