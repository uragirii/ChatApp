import database from '@react-native-firebase/database'

export const getUserData = async ()=>{
    const ref = database().ref("users/123");
    const snapshot = await ref.once('value');
    return snapshot
}

export const createUser = async userId =>{
    const ref = database().ref(`users/${userId}`);
    const snapshot = await ref.once('value')
    if(snapshot.val() === null){
        const user = {
            id : userId,
            chatRooms : null,
        }
        await ref.set(user);
        return user
    }
    return snapshot.val()
}

// export const send = async (messages, chatId) =>{
//     const ref = 
// }