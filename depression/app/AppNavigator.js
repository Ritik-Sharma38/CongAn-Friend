import { createStackNavigator } from 'react-navigation-stack';
import Depression from './Depression';
import Loading from './Welcome'; 

const AppNavigator = createStackNavigator({
    Depression: { screen: Depression },
    Welcome: { screen: Loading }
});

export default AppNavigator;