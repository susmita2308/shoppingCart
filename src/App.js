/* eslint-disable */ 
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import { Provider } from 'react-redux'

import {  collection, getDocs } from 'firebase/firestore/lite';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import db from './Database/firebase';
import store from './Store/store';
import { BrowserRouter } from 'react-router-dom';

function App() {
  useEffect(()=> {
    getData()
  }, [])
  
  const getData = async () => {
    try {
      const data = collection(db, 'products');
    const productData = await getDocs(data);
    console.log("productData ", productData);
    const productList = productData.docs.map(doc => doc.data());
    console.log("productList ", productList);
    } catch(e){
      console.log("error ",e );
    }
  }

  return (
      <div style={styles.rootContaner}> 
    <Provider store={store}>
    <HomeScreen />     
    </Provider>
      </div>
  );
}

const styles = {
  rootContaner: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'red',
    height: '100vh'
  }
}


export default App;
