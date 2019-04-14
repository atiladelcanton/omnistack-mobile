import React, { Component } from 'react';
import { View, Text, FlatList , TouchableOpacity } from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import ImageFileViewer from  'react-native-file-viewer';
import api from '../../services/api';
import style from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default class Box extends Component {

 state ={ box:{}};
  async componentDidMount(){
    const box = await AsyncStorage.getItem('@rocktbox:box');
    const response = await api.get(`boxes/${box}`);
      this.setState({box: response.data});
  }
  handleUpload = () =>{
    
  }
  renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={()=>{}}
        style={style.file}>

        <View style={style.fileInfo}>
          <Icon name='insert-drive-file' size={24} color='#A5CFFF' />
          <Text style={style.fileTitle}>{item.title}</Text>
        </View>

        <Text style={style.fileDate}>
          Há {" "}  {distanceInWords(item.createdAt, new Date(), {
                            locale:pt
                        })}
        </Text>

      </TouchableOpacity>
  );
  render() {
    return (
      <View style={style.container}>
        <Text style={style.boxTitle}>{this.state.box.title}</Text>
        <FlatList 
          data={this.state.box.files} 
          style={style.list} 
          keyExtractor={file => file._id}
          ItemSeparatorComponent={() => <View style={style.separator} />}
          renderItem={this.renderItem}
        />

        <TouchableOpacity style={style.fab} onPress={this.handleUpload}>
          <Icon name='cloud-upload' size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }
}
