import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import database from '@react-native-firebase/database'

const beforeSending = (messages)=>{
  let newMessages = []
  messages.forEach(message=>{
    newMessages.push({
      _id: message._id,
      text : message.text,
      createdAt : message.createdAt,
      user : message.user._id
    })
  })
  return newMessages
}

const parseMessages = (message)=>{
  let _isMounted = false;
  let newMessages = []
  if (message === null){
    return []
  }
  newMessages = Object.keys(message).map((key)=>{
    let temp = message[key]
    return {
      _id : temp._id,
      text : temp.text,
      user : {
        _id : temp.user,
        name : String(temp.user)
      }
    }
  })
  return newMessages

}

export default class ChatScreen extends React.Component {
  state = {
    messages: [],
    user : {
      _id : this.props.route.params.user._id,
      name : this.props.route.params.user._id
    },
    chatID : this.props.route.params.chatId,
    userData : {}
  }

  

  componentDidMount() {
    const ref = database().ref(`/chats/${this.state.chatID}/messages`)
    ref.on('value', (snapshot)=>{
      const newMsg = parseMessages(snapshot.val())
      this.setState({
        messages : newMsg
      })
    })
  }
  componentWillUnmount(){
    const ref = database().ref(`/chats/${this.state.chatID}/messages`)
    ref.off('value', (snapshot)=>{return true})
  }
  async onSend(messages = []) {
    const newMessages = GiftedChat.append(this.state.messages, messages)
    this.setState(() => ({
      messages: newMessages,
    }))
    const ref = database().ref(`/chats/${this.state.chatID}/messages`)
    await ref.set(beforeSending(newMessages))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={this.state.user}
        renderUsernameOnMessage={true}
      />
    )
  }
}