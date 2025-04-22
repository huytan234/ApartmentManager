import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../configs/Firebase';
import { MyDispatchContext, MyUserContext } from '../../configs/UserContext';
import APIs, { authAPI, endpoints } from '../../configs/APIs';
import { useNavigation } from '@react-navigation/native';

const ChatListScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigation = useNavigation();
  
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);

  const getRoom = async (id) => {
    const unsubscribe = onSnapshot(collection(db, 'chatRooms'), (snapshot) => {
      let rooms = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (user.role === 0) {
          rooms.push({ ...data, id: doc.id });
        }
      });
      setChatRooms(rooms);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
      getRoom();
  
  }, [user.role, navigation]);

  const handleViewChat = (roomId) => {
    navigation.navigate('ChatDetail', { roomId });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={{ fontSize: 18 }}>Tên cư dân: {item.ten_cd}</Text>
      <Button title="Chi tiết" onPress={() => handleViewChat(item.id)} color="red"/>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ChatListScreen;
