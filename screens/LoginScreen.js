import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import {createUser} from '../Fire'


export default class LoginScreen extends Component {
    state = {
        name : "",
        isLoading : false
    }
    
    getData = ()=>{
        if(this.state.name!==""){
            this.setState({
                isLoading : true
            })
            createUser(this.state.name).then(snapshot =>{
                this.setState({
                    isLoading:false
                })
                // this.props.navigation.navigate("User")
                this.props.navigation.navigate("User", snapshot)
            })
        }
    }

  render() {
    if(this.state.isLoading){
        return (
            <View style={{flex : 1, alignItems : "center", alignContent:"center"}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    else{
        return (
            <View style={styles.container}>
              <View style={styles.circle}/>
              <View style={{marginTop : 64}}>
                  <Image 
                      source = {require("../assests/chat.png")} 
                      style={{width:100, height :100, alignSelf:"center"}}
                  />
              </View>
              <View style={{marginHorizontal :32}}>
                  <Text style={styles.header} >Username</Text>
                  <TextInput 
                      style= {styles.input} 
                      placeholder="Username"
                      onChangeText = { name=>{
                          this.setState({name});
                      }}
                      value = {this.state.name}
                  />
                  <View style={{alignItems : "flex-end", marginTop:64}}>
                      <TouchableOpacity style={styles.continue} onPress={this.getData}>
                          <Text>-></Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </View>
          );
    }
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        backgroundColor : "#F4F5F7"
    },
    circle : {
        width : 500,
        height : 500,
        borderRadius : 500/2,
        backgroundColor : "#FFF",
        position : "absolute",
        left : -120,
        top : -20
    },
    header: {
        fontWeight : "800",
        fontSize : 30,
        color : "#514E5A",
        marginTop : 32
    },
    input : {
        marginTop : 32,
        height : 50, 
        borderWidth : StyleSheet.hairlineWidth,
        borderColor : "#BAB7C3",
        borderRadius : 30,
        paddingHorizontal : 16,
        color : "#514E5A",
        fontWeight : "600"
    },
    continue : {
        width : 70,
        height : 70,
        borderRadius : 70/ 2,
        backgroundColor : "#9075E3",
        alignItems : "center",
        justifyContent : "center"
    }
})