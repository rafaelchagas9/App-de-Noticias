import React, { Component } from 'react';

//Importando o modulo axios que é utilizado para lidar com solicitações HTTP
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, Linking} from 'react-native';

class TopBr extends Component<Props> {
    constructor(props) {
      super(props)
      this.state={ 
        dataSource: [], // Armazena um objeto do Json
        isLoading: true,// Checa se o Json está carregando 
        page: 1
      }
    }
  
    render(){
      return (
        <View style={styles.container}>
          <Text></Text>
        </View>
      )
    }

  componentDidMount(){
    this.makeRequest()
  }

  makeRequest(){
    //Fazendo a solicitação da API, depois armazenando o resultado numa arrow function que vai setar os valores do projeto
    axios.get(`https://newsapi.org/v2/top-headlines?country=br&pageSize=10&page=${this.state.page}&apiKey=4a9888460f184e599a97ed2a0dda9a26`)
      .then(response => {
        if(this.state.dataSource == 0){
          var fullData = response.data.articles
        }else{
          var data = this.state.dataSource
          var tempData = response.data.articles
          var fullData = data
        }
        this.setState({isLoading:false, dataSource: fullData});
  })

  .catch(error => {
    console.log(error);
  });
  }

  FlatListHeader = () => {
    return (
      <View elevation={1} 
        style={{
          height: 100,
          width: "97%",
          margin: 5,
          backgroundColor: "#1E1E1E",
          border: 4.9,
          borderColor: "black",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 16,
          },
          shadowOpacity: 20,
          shadowRadius: 7.49
        }}
      >
        <Text style={{  textShadowColor: 'black', color: "#E8E8E8", textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40}}>Últimos Artigos - BR</Text>
      </View>
    );
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          marginTop: 12,
          marginBottom: 12,
          marginStart:5, 
          marginEnd: 5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  loadNextPage(){
    console.log(this.state.dataSource.length)
    this.setState({ page: this.state.page+1 });
    this.makeRequest()
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" style={styles.loadingActivity}/>
        </View>
      ) 
    }
    return (
      <View style={styles.container}>
        <FlatList 
          ListHeaderComponent = { this.FlatListHeader }   
          ItemSeparatorComponent = { this.FlatListItemSeparator }
          data={this.state.dataSource}
          keyExtractor = {(item, index) => index.toString()}
          onEndReachedThreshold={0.2}
          onEndReached={({ distanceFromEnd }) => {
            this.loadNextPage()
          }}
          renderItem={({ item }) => 
          <View>
            <TouchableOpacity onPress={()=>{Linking.openURL(item.url)}}>
            {item.urlToImage == null ? <Image
          style={{width: '70%', height: 250, alignSelf: "center", margin:20}}
          source={{uri: 'https://drogariaguarulhos.com.br/media/catalog/product/placeholder/default/notfound.png'}}>
          </Image> : <Image
          style={{width: '70%', height: 250, alignSelf: "center"}}
          source={{uri: item.urlToImage}}>
          </Image>}
            <Text style={styles.noticiaTitulo}>{item.title}</Text>
            {item.description == null ? null : <Text style={styles.noticiaDesc}>{item.description}</Text>}
          </TouchableOpacity>
          </View>
        }
          
        />
      </View>
    );
  }
}

export default TopBr

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
    },
    loadingActivity:{
      alignSelf:"center",
      justifyContent: "center"
    }
  });