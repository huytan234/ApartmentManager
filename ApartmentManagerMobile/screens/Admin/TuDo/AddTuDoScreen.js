import React from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIs, { authAPI, endpoints } from "../../../configs/APIs";

const AddTuDoScreen = () => {
    const [name, setName] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const handleAddTuDo = async () => {
        try {
            setLoading(true);
            let form = new FormData();
            form.append('name', name);

            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log(form);

            const res = await authAPI(accessToken).post(endpoints['add-tudo'], form, {
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
                 <Text style={styles.noteText}>Thêm tủ đồ</Text>
            </Card>
            <Text style={styles.label}>Tên tủ đồ:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập tên tủ đồ....."
                value={name}
                onChangeText={setName}
            />

            <Button
                mode="contained"
                style={styles.button}
                loading={loading}
                onPress={handleAddTuDo} 
            >
                Thêm tủ đồ
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

export default AddTuDoScreen;