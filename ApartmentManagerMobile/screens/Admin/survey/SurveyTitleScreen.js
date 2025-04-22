import React from "react";
import { View, Text, StyleSheet, TextInput, Alert  } from "react-native";
import { Card, Button } from "react-native-paper";
import APIs, { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SurveyTitleScreen = ({navigation}) => {
    const [loading, setLoading] = React.useState(false);
    const [title, setTitle] = React.useState(''); 
    const [description, setDescription] = React.useState('');
    const [type_survey, setType_survey] = React.useState('');

    const handleAddTitle = async () => {
        try {
            setLoading(true);
            let form = new FormData();
            form.append('title', title);
            form.append('description', description);
            form.append('type_survey', type_survey);

            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log(form);

            const res = await authAPI(accessToken).post(endpoints['surveyTitle'], form, {
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
                 <Text style={styles.noteText}>Thêm tiêu đề khảo sát</Text>
            </Card>
            <Text style={styles.label}>Tên tiêu đề:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập tên tiêu đề....."
                value={title}
                onChangeText={setTitle}
            />
        
            <Text style={styles.label}>Mô tả tiêu đề:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập mô tả....."
                value={description}
                onChangeText={setDescription}
                multiline={true}
            />
    
            <Text style={styles.label}>Loại tiêu đề:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập....."
                value={type_survey}
                onChangeText={setType_survey}
                keyboardType="numeric"
            />
            <Button
                mode="contained"
                style={styles.button}
                loading={loading}
                onPress={handleAddTitle} 
            >
                Thêm tiêu đề
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

export default SurveyTitleScreen;