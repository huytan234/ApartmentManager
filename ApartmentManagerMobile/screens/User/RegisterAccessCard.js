import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyUserContext } from "../../configs/UserContext";
import { Picker } from "@react-native-picker/picker";

const RegisterAccessCarcd = () => {
    const user = useContext(MyUserContext);
    const [userAccess, setUserAccess] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState(false);
    
    const change = (field, value) => {
        setUserAccess((current) => {
            return {
                ...current, [field]: value
            };
        });
    }
    const fields = [
        {
          label: "Họ và tên",
          icon: "text",
          field: "name",
        },
        {
          label: "CCCD",
          icon: "text",
          field: "cccd",
        },
        {
          label: "Số điện thoại",
          icon: "text",
          field: "sdt",
        },
        {
            label: "Quan hệ gia đình", 
            icon: "dropdown",           
            field: "relationship",
            options: [
                { value: 0, label: 'Vợ/Chồng' },
                { value: 1, label: 'Con' },
                { value: 2, label: 'Bố/Mẹ' },
                { value: 3, label: 'Anh/Em' }
            ]
        }
      ];

      const handleSubmit = async () => {
        setErr(false);
        console.log(user.id);
        let form = new FormData();
        for(let f in userAccess) {
            form.append(f, userAccess[f]);
        }
        
        const accessToken = await AsyncStorage.getItem('token');
        console.log('Token:', accessToken); 
        setLoading(true);
        try {
            let res = await authAPI(accessToken).post(endpoints['register-access'](user.id), form, {
                headers: {
                    'Content-Type': "multipart/form-data",
                }
            });
            
            console.log(res.data);
            if (res.status === 201) {
                Alert.alert('Notification', 'Tạo thành công!!!');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.note}>
                <Text style={styles.noteText}>Thông tin người được đăng ký</Text>
            </Card>
            {fields.map((f) => {
                if (f.field === 'relationship') {
                    return (
                        <View key={f.field} style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>{f.label}</Text>
                            <Picker
                                selectedValue={userAccess.relationship}
                                onValueChange={(value) => change(f.field, value)}
                                style={styles.picker}
                            >
                                {f.options.map((option) => (
                                    <Picker.Item 
                                        key={option.value} 
                                        label={option.label} 
                                        value={option.value} />
                                ))}
                            </Picker>
                        </View>
                    );
                } else {
                    return (
                        <TextInput
                            style={styles.input}
                            key={f.field}
                            label={f.label}
                            value={userAccess[f.field]} // Gán giá trị từ state
                            onChangeText={(value) => change(f.field, value)} // Thay đổi giá trị
                        />
                    );
                }
            })}
    
            <Button 
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                style={styles.button}
            >Đăng kí</Button>
        </View>
    );


}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 12,
    }, input: {
        marginVertical: 10,
        backgroundColor: 'white',
    }, button: {
        marginTop: 20,
        padding: 5,
        backgroundColor: 'red',
    }, note: {
        marginVertical: 12,
        padding: 12,
        backgroundColor: 'red',
        borderRadius: 20,
    }, noteText: {
        color: 'white',
        textAlign: 'center',
    }, pickerContainer: {
        marginVertical: 10,
    },
    pickerLabel: {
        marginBottom: 5,
        fontSize: 16,
    },
    picker: {
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
    }
})

export default RegisterAccessCarcd;