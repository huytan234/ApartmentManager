import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import { MyUserContext } from "../../configs/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/APIs";

const BillAdminScreen = () => {
    const [user, setUser] = React.useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [service, setService] = React.useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [name, setName] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('token');
                const resUser = await authAPI(accessToken).get(endpoints['users']);
                const res = await authAPI(accessToken).get(endpoints['services']);
                if (resUser.status === 200) {
                    setUser(resUser.data);
                } else {
                    console.error("Error fetching user data:", resUser.status);
                }
    
                if (res.status === 200) {
                    setService(res.data);
                } else {
                    console.error("Error fetching services data:", resServices.status);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const renderServiceItem = ({ item }) => (
        <TouchableOpacity
            style={styles.surveyItem}
            onPress={() => setSelectedService(item)}
        >
            <Text style={styles.surveyText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderUserItem = ({ item }) => (
        <TouchableOpacity
            style={styles.surveyItem}
            onPress={() => setSelectedUser(item)}
        >
            <Text style={styles.surveyText}>{item.username}</Text>
        </TouchableOpacity>
    );

    const handleAddBill = async () => {
        try {
            setLoading(true);
            // Tạo dữ liệu để gửi
            const data = {
                user: selectedUser.id,
                service: selectedService.id,
                name: name,
                amount: amount
            };

            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log('Data:', data);

            // Gửi dữ liệu dưới dạng JSON
            const res = await authAPI(accessToken).post(endpoints['add-bill'], data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.status === 201) {
                Alert.alert('Notification', 'Tạo thành công!');
            }
        } catch (ex) {
            console.error('Error adding question:', ex);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.textinput}>User:     {selectedUser ? selectedUser.username : ''}</Text>
            </View>
            
            <Text style={styles.label}>Danh sách User:</Text>
            {/* Hiển thị danh sách các khảo sát */}
            <FlatList
                data={user} // Dữ liệu là danh sách các khảo sát
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUserItem} // Render từng mục khảo sát
                style={styles.flatList} // Thay đổi kích thước của FlatList
            />

            <View >
                <Text style={styles.textinput}>Service:     {selectedService ? selectedService.name : ''}</Text>
            </View>
            
            <Text style={styles.label}>Danh sách dịch vụ:</Text>
            {/* Hiển thị danh sách các khảo sát */}
            <FlatList
                data={service} // Dữ liệu là danh sách các khảo sát
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderServiceItem} // Render từng mục khảo sát
                style={styles.flatList} // Thay đổi kích thước của FlatList
            />

            <Text style={styles.label}>Tên hóa đơn:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập hóa đơn....."
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Giá tiền:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập giá tiền....."
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
            <Button
                mode="contained"
                style={styles.button}
                loading={loading}
                onPress={handleAddBill} 
            >
                Thêm hóa đơn
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: '#333',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      borderRadius: 5,
    }, button: {
        backgroundColor: 'red'
    },  note: {
        marginVertical: 12,
        padding: 12,
        backgroundColor: 'red',
        borderRadius: 5,
    }, noteText: {
        color: 'white',
        textAlign: 'center'
    },  surveyItem: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },  surveyText: {
        fontSize: 16,
    },  flatList: {
        maxHeight: 100, // Đặt chiều cao tối đa của FlatList
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 5,
    }, title: {
        fontSize: 20
    },  textinput: {
        fontSize: 16,
        marginVertical: 10,
    }
  });

export default BillAdminScreen;