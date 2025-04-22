import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import { MyUserContext } from "../../configs/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceScreenAdmin = () => {
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState(''); 
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');

    const handleAddService = async () => {
        try {
            setLoading(true);
            let form = new FormData();
            form.append('name', name);
            form.append('description', description);
            form.append('price', price);

            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log(form);

            const res = await authAPI(accessToken).post(endpoints['add-service'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.status === 201) {
                Alert.alert('Notification', 'Tạo thành công!!!');
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
           <Card style={styles.note}>
                 <Text style={styles.noteText}>Thêm dịch vụ</Text>
            </Card>
            <Text style={styles.label}>Tên dịch vụ:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập tên dịch vụ....."
                value={name}
                onChangeText={setName}
            />
        
            <Text style={styles.label}>Mô tả chi tiết:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập mô tả....."
                value={description}
                onChangeText={setDescription}
                multiline={true}
            />
    
            <Text style={styles.label}>Giá tiền:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập giá tiền....."
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button
                mode="contained"
                style={styles.button}
                loading={loading}
                onPress={handleAddService} 
            >
                Thêm Dịch vụ
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
    }
  });

export default ServiceScreenAdmin;