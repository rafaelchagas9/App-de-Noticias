import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
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
        <Icon name="ios-home" size={24}></Icon>
      )
    }
  },
  SearchNews: {screen: SearchNews,
  navigationOptions:{
    tabBarLabel: 'Procurar',
    tabBarIcon: ({tintColor}) => (
    <Icon name="ios-search" size={24}></Icon>
    )
  }},
  TopBr: {screen: TopBr,
    navigationOptions: {
      tabBarLabel: 'Brasil'
    }
  }
});

export default createAppContainer(TabNavigator);
