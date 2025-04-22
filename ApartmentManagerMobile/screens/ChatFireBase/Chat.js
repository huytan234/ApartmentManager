import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../../configs/Firebase';
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp, doc } from 'firebase/firestore';
import { MyDispatchContext, MyUserContext } from '../../configs/UserContext';
import { useRoute } from '@react-navigation/native';

const ChatDetailScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState(null);
  
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const route = useRoute();  // Thay cho useParams
  const { roomId } = route.params;

  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, `chatRooms/${roomId}`);
      const unsubscribeRoom = onSnapshot(roomRef, (doc) => {
        if (doc.exists()) {
          setRoomInfo(doc.data());
        }
      });

      const q = query(collection(db, `chatRooms/${roomId}/messages`), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let msgs = [];
        snapshot.forEach(doc => {
          msgs.push({ ...doc.data(), id: doc.id });
        });
        setMessages(msgs);
      });
      setLoading(false);

      return () => {
        unsubscribeRoom();
        unsubscribe();
      };
    }
  }, [roomId]);

  const sendMessage = async () => {
    if (message.trim() && roomId) {
      await addDoc(collection(db, `chatRooms/${roomId}/messages`), {
        text: message,
        createdAt: Timestamp.now(),
        userId: user.id,
        ten: `${user.first_name} ${user.last_name}`,
        role: user.role,
        email: user.email,
      });
      setMessage('');
    }
  };

  const renderUsername = (userName, userId, userRole) => {
    let displayName = userName;
    if (userRole === 0 && userId !== user.id) {
      displayName += `Quản lý`;
    }
    if (userId === user.id) {
      displayName = 'Bạn';
    }
    return displayName;
  };

  const calculateTimeDifference = (timestamp) => {
    const now = new Date();
    const createdAt = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const diffInMs = now - createdAt;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 0) {
      return `${diffInDays} ngày trước`;
    } else if (diffInHours > 0) {
      return `${diffInHours} giờ trước`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} phút trước`;
    } else {
      return 'Vừa xong';
    }
  };

  const renderItem = ({ item }) => {
    const isSentByCurrentUser = item.userId === user.id;
    const createdAt = item.createdAt ? calculateTimeDifference(item.createdAt) : 'Unknown time';
    return (
      <View style={[styles.messageContainer, isSentByCurrentUser ? styles.messageSent : styles.messageReceived]}>
        <Text style={styles.messageTime}>{createdAt}</Text>
        <Text style={styles.messageUsername}>{renderUsername(item.ten, item.userId, item.role)}:</Text>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {roomInfo && (
        <View style={styles.chatHeader}>
          <Text style={styles.chatHeaderText}>Cư dân: {`${roomInfo.ten_cd}`}</Text>
        </View>
      )}

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Nhập tin nhắn..."
          onSubmitEditing={sendMessage}
        />
        <Button title="Gửi" onPress={sendMessage} color="red"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatHeader: {
    padding: 10,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  chatHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  messageTime: {
    fontSize: 12,
    color: '#555',
  },
  messageUsername: {
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
    marginBottom: 20
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  button:{
    backgroundColor: 'red'
  }
});

export default ChatDetailScreen;
