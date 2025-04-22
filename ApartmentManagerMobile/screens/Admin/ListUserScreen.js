import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIs, { authAPI, endpoints } from '../../configs/APIs';
import { MyUserContext } from '../../configs/UserContext';

const ListUserScreen = () => {
    const [loading, setLoading] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const response = await APIs.get(endpoints['users']);
                const filteredUsers = response.data.filter(user => user.role === 1); 
                setUsers(filteredUsers);
                // setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleDeleteUser = (userId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa người dùng này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const accessToken = await AsyncStorage.getItem('token');
                            const response = await APIs.delete(endpoints['delete-user'](userId), {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}` 
                                }
                            });
                            setUsers(users.filter(user => user.id !== userId)); 
                            Alert.alert('Success', 'Xóa cư dân thành công!!');
                        } catch (error) {
                            console.error('Error deleting user:', error);
                        }
                    }
                }
            ]
        );
    };

    

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>DANH SÁCH CƯ DÂN</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userName}>Tài khoản cư dân: {item.username}</Text>
                        <IconButton
                            icon="delete" 
                            color="red"
                            size={20}
                            style={styles.deleteButton}
                            onPress={() => handleDeleteUser(item.id)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    userItem: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    userName: {
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: "red", // Clear red border for the delete button
        borderRadius: 8,
        padding: 6,
    },
});

export default ListUserScreen;
