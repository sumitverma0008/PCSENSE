import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import BuildTypeScreen from './screens/BuildTypeScreen';
import UsageProfileScreen from './screens/UsageProfileScreen';
import BudgetScreen from './screens/BudgetScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import ResultsScreen from './screens/ResultsScreen';
import ComponentDetailsScreen from './screens/ComponentDetailsScreen';
import PriceDashboardScreen from './screens/PriceDashboardScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createStackNavigator();

const theme = {
  colors: {
    primary: '#667eea',
    accent: '#764ba2',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    error: '#B00020',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#667eea',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'PCSensei'}}
          />
          <Stack.Screen
            name="BuildType"
            component={BuildTypeScreen}
            options={{title: 'Choose Type'}}
          />
          <Stack.Screen
            name="UsageProfile"
            component={UsageProfileScreen}
            options={{title: 'Select Usage'}}
          />
          <Stack.Screen
            name="Budget"
            component={BudgetScreen}
            options={{title: 'Set Budget'}}
          />
          <Stack.Screen
            name="Preferences"
            component={PreferencesScreen}
            options={{title: 'Preferences'}}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{title: 'Recommendations'}}
          />
          <Stack.Screen
            name="ComponentDetails"
            component={ComponentDetailsScreen}
            options={{title: 'Component Details'}}
          />
          <Stack.Screen
            name="PriceDashboard"
            component={PriceDashboardScreen}
            options={{title: 'Price Tracking'}}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{title: 'About PCSensei'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
