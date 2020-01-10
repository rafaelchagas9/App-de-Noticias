import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, Linking} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import 'react-native-gesture-handler';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TopUs from './screens/TopUs'
import TopBr from './screens/TopBr'
import SearchNews from './screens/SearchNews'

const TabNavigator = createBottomTabNavigator({
  TopUs: {screen: TopUs,
    navigationOptions:{
      tabBarLabel: 'EUA',
      tabBarIcon: ({tintColor}) => (
        <Icon name="flag-usa" size={20} color='#E8e8e8'></Icon>
      )
    }
  },
  SearchNews: {screen: SearchNews,
  navigationOptions:{
    tabBarLabel: 'Procurar',
    tabBarIcon: ({tintColor}) => (
    <Icon name="search" size={20} color='#E8e8e8'></Icon>
    )
  }},
  TopBr: {screen: TopBr,
    navigationOptions: {
      tabBarLabel: 'Brasil',
      tabBarIcon:({tintColor}) => (
        <Icon name="bold" size={20} color='#E8e8e8'></Icon>
      )
    }
  }
},
  {
    tabBarOptions:{
      style:{
        backgroundColor: '#0d0d0d'
      }
    }
  }
);

export default createAppContainer(TabNavigator);
