import React, { useState, useEffect, useContext, useRef } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../configs/Firebase';
import { MyDispatchContext, MyUserContext } from '../../configs/UserContext';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);

  const isRoomCreated = useRef(false);  // Sử dụng useRef để theo dõi trạng thái

  const getRoom = async () => {
    const unsubscribe = onSnapshot(collection(db, 'chatRooms'), (snapshot) => {
      let rooms = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (user.role === 1 && Array.isArray(data.participants) && data.participants.includes(user.id)) {
          rooms.push({ ...data, id: doc.id });
          setChatRooms(rooms);
        }
      });
      if (user.role === 1) {
        if (rooms.length > 0) {
          setSelectedRoom(rooms[0].id); // Chọn phòng đầu tiên mà sinh viên có thể tham gia
        } else {
          createChatRoom(); // Tạo phòng mới nếu không có phòng nào
        }
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }

  const createChatRoom = async () => {
    try {
      const newRoom = await addDoc(collection(db, 'chatRooms'), {
        createdAt: Timestamp.now(),
        participants: [user.id],
        ten_cd: user.first_name,
        email: user.email,
        role: 1,
      });
      setSelectedRoom(newRoom.id);
      isRoomCreated.current = true;  // Đánh dấu phòng đã được tạo
    } catch (error) {
      console.error('Error creating chat room:', error);
      alert('Error creating chat room');
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      const q = query(collection(db, `chatRooms/${selectedRoom}/messages`), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let msgs = [];
        snapshot.forEach((doc) => {
          msgs.push({ ...doc.data(), id: doc.id });
        });
        setMessages(msgs);
      });
      return () => unsubscribe();
    }
  }, [selectedRoom]);

  const sendMessage = async () => {
    if (message.trim() && selectedRoom) {
      await addDoc(collection(db, `chatRooms/${selectedRoom}/messages`), {
        text: message,
        createdAt: Timestamp.now(),
        userId: user.id,
        role: 1,
        email: user.email,
        ten: user.first_name,
      });
      setMessage('');
    }
  };

  const renderItem = ({ item }) => {
    const isSentByCurrentUser = item.userId === user.id;
    return (
      <View style={[styles.messageContainer, isSentByCurrentUser ? styles.messageSent : styles.messageReceived]}>
        <Text style={styles.username}>{item.ten}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted // Đảo ngược để tin nhắn mới nhất nằm dưới cùng
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Nhập tin nhắn..."
        />
        <Button title="Gửi" onPress={sendMessage} color="red"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  messageSent: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  messageReceived: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  username: {
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default ChatScreen;
