import React, { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card } from "react-native-paper";
import { MyUserContext } from "../../configs/UserContext";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";


const FeedbackScreen = ({navigation}) => {
    const user = useContext(MyUserContext);
    const [loading, setLoading] = React.useState(false);
    const [content, setContent] = React.useState('');

    const handleSubmitFeedback = async() => {
        setLoading(true);
        try {
            let form = new FormData()
            form.append('content', content)

            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log(form);

            const res = await authAPI(accessToken).post(endpoints['add-feedback'], form,{
                headers:{
                       'Content-Type': "multipart/form-data",
                }
            })
            if(res.status===201)
                Alert.alert('Notification', 'Gửi thành công!!!!');
        } catch(ex){
            console.error(ex.response?.data || ex.message);
        } finally{
            setLoading(false)
        }

        
    };


    return(
        <View style={styles.container}>
            <Card style={styles.note}>
                <Text style={styles.noteText}>Phản ánh</Text>
            </Card>
            <Text style={styles.user}>Cư dân: {user.first_name}</Text>
            <Text style={styles.label}>Nội dung</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Nhập nội dung"
                
                onChangeText={setContent}
                multiline={true}
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.button} 
                loading={loading} 
                onPress={handleSubmitFeedback}
            >
                <Text style={styles.buttonText}>Gửi phản ánh</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5', 
    },
    user: {
        fontSize: 22, 
        fontWeight: '600', 
        marginBottom: 16,
        color: '#333', 
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333', 
    },
    input: {
        height: 50,
        borderColor: '#ccc', 
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    textArea: {
        height: 120, 
        textAlignVertical: 'top',
        paddingVertical: 10,
    },
    button: {
        backgroundColor: 'red', 
        padding: 16,
        alignItems: 'center',
        borderRadius: 8, 
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18, 
        fontWeight: 'bold',
    },
    note: {
        padding: 16,
        backgroundColor: 'red', 
        borderRadius: 8,
        marginBottom: 20, 
    },
    noteText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default FeedbackScreen;