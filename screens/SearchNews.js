import React, { Component } from 'react';
//Importando o modulo axios que é utilizado para lidar com solicitações HTTP
import axios from 'axios';
import { StyleSheet, Button, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, Linking, Picker } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

class SearchNews extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [], // Armazena um objeto do Json
      isLoading: false, // Checa se o Json está carregando
      searchComplete: false,
      page: 1,
      query: "",
      language: "any",
      sortBy: "publishedAt",
      isANewSearch: true
    }
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
        <Text style={{ textShadowColor: 'black', color: "#E8E8E8", textShadowOffset: { width: 1, height: 3 }, textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40 }}>Resultados</Text>
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
          marginStart: 5,
          marginEnd: 5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  handleClick = async () => {
    const execute = this.setState({ page: 1, isLoading: true, searchComplete: false, isANewSearch: true })
    this.makeRequest()
  }


  makeRequest = async () => {
    if(this.state.language == 'any' || this.state.language == ''){
      var urlAPI = `https://newsapi.org/v2/everything?q=${this.state.query}&sortBy=${this.state.sortBy}&pageSize=10&page=${this.state.page}&apiKey=4a9888460f184e599a97ed2a0dda9a26`
    }else{
      var urlAPI = `https://newsapi.org/v2/everything?q=${this.state.query}&sortBy=${this.state.sortBy}&language=${this.state.language}&pageSize=10&page=${this.state.page}&apiKey=4a9888460f184e599a97ed2a0dda9a26`
    }
    
    //Fazendo a solicitação da API, depois armazenando o resultado numa arrow function que vai setar os valores do projeto
    axios.get(urlAPI)
      .then(response => {
        // Os três pontinhos(...) são necessário para pegar todos os elementos da array, pois expande a array
        if (this.state.isANewSearch) {
          this.setState({ dataSource: response.data.articles, isLoading: false, searchComplete: true, isANewSearch: false });
        } else {
          var tempData = [...this.state.dataSource, ...response.data.articles]
          this.setState({ dataSource: tempData, isLoading: false, searchComplete: true });
        }
      })

      .catch(error => {
        if (error == 'Error: Request failed with status code 426') {
          alert('Não há mais notícias para serem exibidas')
        } else {
          alert(`Erro ao solicitar notícias ${error}`)
        }
      });
  }

  handleSearch = (text) => {
    this.setState({ query: text })
  }

  loadNextPage() {
    this.setState({ page: this.state.page + 1 });
    this.makeRequest()
  }



  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }
    if (this.state.searchComplete) {
      return (
        <View style={styles.container}>
          <View style={styles.horizontalContainer}>
            <TextInput multiline={true} placeholder='Pesquisar' style={styles.inputSearch} onChangeText={this.handleSearch} />
            <Picker
              selectedValue={this.state.language}
              mode='dialog'
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }>
              <Picker.Item label="Qualquer idioma" value="any" />
              <Picker.Item label="Árabe" value="ar" />
              <Picker.Item label="Alemão" value="de" />
              <Picker.Item label="Chinês" value="zh" />
              <Picker.Item label="Espanhol" value="es" />
              <Picker.Item label="Frânces" value="fr" />
              <Picker.Item label="Hebraico" value="he" />
              <Picker.Item label="Inglês" value="en" />
              <Picker.Item label="Italiano" value="it" />
              <Picker.Item label="Neerlandês" value="nl" />
              <Picker.Item label="Norueguês" value="no" />
              <Picker.Item label="Português" value="pt" />
              <Picker.Item label="Russo" value="ru" />
            </Picker>
          </View>
          <View style={styles.horizontalContainer}>
            <Picker
              selectedValue={this.state.sortBy}
              mode='dialog'
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ sortBy: itemValue })
              }>
              <Picker.Item label="Ordem de publicação" value="publishedAt" />
              <Picker.Item label="Relevância" value="relevancy" />
              <Picker.Item label="Popularidade" value="popularity" />
            </Picker>
          </View>
          <Button title="Pesquisar" onPress={this.handleClick}></Button>

          <FlatList
            ListHeaderComponent={this.FlatListHeader}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            data={this.state.dataSource}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.25}
            onEndReached={({ distanceFromEnd }) => {
              this.loadNextPage()
            }}
            getItemLayout={(data, index) => (
              { length: 400, offset: 400 * index, index }
            )}
            renderItem={({ item }) =>
              <View>
                <TouchableOpacity onPress={() => { Linking.openURL(item.url) }}>
                  {item.urlToImage == null ? <Image
                    style={{ width: '70%', height: 250, alignSelf: "center", margin: 20 }}
                    source={{ uri: 'https://drogariaguarulhos.com.br/media/catalog/product/placeholder/default/notfound.png' }}>
                  </Image> : <Image
                    style={{ width: '70%', height: 250, alignSelf: "center" }}
                    source={{ uri: item.urlToImage }}>
                    </Image>}
                  <Text style={styles.noticiaTitulo}>{item.title}</Text>
                  {item.description == null ? null : <Text style={styles.noticiaDesc}>{item.description}</Text>}
                </TouchableOpacity>
              </View>
            }

          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.horizontalContainer}>
          <TextInput multiline={true} placeholder='Pesquisar' style={styles.inputSearch} onChangeText={this.handleSearch} />
          <Picker
            selectedValue={this.state.language}
            mode='dialog'
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }>
            <Picker.Item label="Qualquer idioma" value="any" />
            <Picker.Item label="Árabe" value="ar" />
            <Picker.Item label="Alemão" value="de" />
            <Picker.Item label="Chinês" value="zh" />
            <Picker.Item label="Espanhol" value="es" />
            <Picker.Item label="Frânces" value="fr" />
            <Picker.Item label="Hebraico" value="he" />
            <Picker.Item label="Inglês" value="en" />
            <Picker.Item label="Italiano" value="it" />
            <Picker.Item label="Neerlandês" value="nl" />
            <Picker.Item label="Norueguês" value="no" />
            <Picker.Item label="Português" value="pt" />
            <Picker.Item label="Russo" value="ru" />
          </Picker>
        </View>
        <View style={styles.horizontalContainer}>
            <Picker
              selectedValue={this.state.sortBy}
              mode='dialog'
              style={{height: 50, color: '#E8E8E8', width: '52%'}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ sortBy: itemValue })
              }>
              <Picker.Item label="Ordem de publicação" value="publishedAt" />
              <Picker.Item label="Relevância" value="relevancy" />
              <Picker.Item label="Popularidade" value="popularity" />
            </Picker>
          </View>
        <Button title="Pesquisar" onPress={this.handleClick}></Button>
      </View>
    )
  }
}
export default SearchNews

const styles = StyleSheet.create({
  container: {
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 25,
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  picker: {
    height: 50,
    color: '#E8E8E8',
    width: '50%'
  },
  horizontalContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
  },
  inputSearch: {
    height: 50,
    width: '50%',
    color: '#E8E8E8'
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