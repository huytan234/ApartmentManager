import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, Alert } from "react-native";
import { TextInput, Button, RadioButton, Card } from "react-native-paper";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateAccountScreen = () => {
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleRegister = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        try {
            setLoading(true);
            let form = new FormData();
            form.append('username', username);
            form.append('password', password);
            form.append('role', 1);

            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log(form);

            const res = await authAPI(accessToken).post(endpoints['add-user'], form, {
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
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.note}>
                 <Text style={styles.noteText}>Đăng ký tài khoản cư dân</Text>
            </Card>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleRegister} style={styles.button} loading={loading}>
                Đăng ký
            </Button>
        </ScrollView>
    );
};

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            padding: 16,
        }, input: {
            marginBottom: 16,
            marginTop: 10
        }, button: {
            marginVertical: 8,
            backgroundColor: 'red'
        }, note: {
            marginVertical: 12,
            padding: 12,
            backgroundColor: 'red',
            borderRadius: 20,
        }, noteText: {
            color: 'white',
            textAlign: 'center'
        }
    });


export default CreateAccountScreen;