import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, Linking} from 'react-native';

class SearchNews extends Component<Props> {
    constructor(props) {
      super(props)
      this.state={ 
        dataSource: [], // Armazena um objeto do Json
        isLoading: true // Checa se o Json está carregando 
      }
    }
  
    render(){
      return (
        <View style={styles.container}>
          <Text></Text>
        </View>
      )
    }
  }
export default SearchNews 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1E1E',
    },
    noticiaTitulo: {
      padding: 10,
      color: "#E8E8E8",
      fontSize: 20,
      fontWeight: 'bold'
    },
    noticiaDesc: {
      paddingStart: 10,
      paddingEnd: 5,
      paddingBottom: 10,
      paddingTop: 10,
      color: "#E8E8E8"
    }
  });