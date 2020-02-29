import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TextInput, Button } from 'react-native'
import database from '@react-native-firebase/database'


function Item({ title , props, userId}) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => {props.navigation.navigate("Chat", {chatId : title, user : userId})}}>
        <Text style={styles.title}>Chat Room No : {title}</Text>
      </TouchableOpacity>
    );
  }

export default class UserScreen extends Component {
    state = {
        userData : {},
        chatRooms : [],
        newRoom : ""
    }
    async addChatRoom(){
        
        let newChatRooms = this.state.chatRooms
        newChatRooms.push(this.state.newRoom)
        this.setState({
            chatRooms : newChatRooms
        })

        const ref = database().ref(`users/${this.state.userData._id}/chatRooms/${this.state.newRoom}`);
        await ref.set(true)
    }
    componentDidMount(){
        this.addChatRoom =  this.addChatRoom.bind(this)
        let params = this.props.route.params
        if(!params.chatRooms){
            this.setState({
                userData : {
                    _id : params.id,
                },
                chatRooms : []
            })
        }else{
            this.setState({
                userData : {
                    _id : params.id,
                },
                chatRooms : Object.keys(params.chatRooms)
            })
        }
    }
    render() {
        let listData;
        if (this.state.chatRooms.length===0){
            listData = (
                <Text>No Chat Rooms found</Text>
            )
        }
        else{
            listData = (
                <FlatList
                    data={this.state.chatRooms}
                    renderItem={({ item }) => <Item title={item} props = {this.props} userId = {this.state.userData} />}
                    keyExtractor={item => item}
                />
            )
        }

        return (
            <View>
                {listData}
                <TextInput 
                      style= {styles.input} 
                      placeholder="Join New Chat Room"
                      onChangeText = { chatId=>{
                          this.setState({newRoom : chatId});
                      }}
                      value = {this.state.name}
                  />
                  <Button style={{margin:10}} title="Join Room" onPress={this.addChatRoom} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      input : {
        margin : 10,
        height : 50, 
        borderWidth : StyleSheet.hairlineWidth,
        borderColor : "#BAB7C3",
        paddingHorizontal : 16,
        color : "#514E5A",
        fontWeight : "600"
    },
})
