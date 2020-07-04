import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './navigators/authStack'
import Welcome from './screens/welcome'

const Stack = createStackNavigator()
console.disableYellowBox = true
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="authStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
