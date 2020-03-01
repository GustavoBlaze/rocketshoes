import { createAppContainer } from 'react-navigation';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './pages/Main';
import Header from './components/Header';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
    },
    {
      defaultNavigationOptions: {
        header: navigation => <Header {...navigation} />,
      },
    }
  )
);

export default Routes;
