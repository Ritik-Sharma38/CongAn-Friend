import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigators/authStack';

function App(){
    return (
            <NavigationContainer>
                <AuthStack/>
            </NavigationContainer>
    );
  }

export default App;
