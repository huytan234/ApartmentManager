import React, { useEffect } from "react";
import { Alert, Text, View, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-paper";
import APIs, { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const AddPackageScreen = () => {
    const [loading, setLoading] = React.useState(false);
    const [tudo, setTudo] = React.useState('');
    const [name, setName] = React.useState(''); 
    const [status, setStatus] = React.useState('');
    const [selectedTuDo, setSelectedTuDo] = React.useState(null);
    
    const loadTuDo = async () => {
        try {
            let res = await APIs.get(endpoints['tudos']);

            const TuDo = res.data.map(tudo => ({
                id: tudo.id,
                name: tudo.name
            }));
            setTudo(TuDo);
        } catch (ex) {
            console.error(ex);
        }
    }

    React.useEffect(() => {
        loadTuDo();
    }, []);

    const renderTuDo = ({ item }) => (
        <TouchableOpacity
            style={styles.TuDoItem}
            onPress={() => setSelectedTuDo(item)}
        >
            <Text style={styles.TuDoText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleAddPackage = async () => {
        try {
            setLoading(true);
            let form = new FormData();
            form.append('name', name);

            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log(form);

            const res = await authAPI(accessToken).post(endpoints['add-package'](selectedTuDo.id), form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.status === 201) {
                Alert.alert('Notification', 'Thêm thành công!!!');
            }
        } catch (ex) {
            console.error(ex.response?.data || ex.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
           <Card style={styles.note}>
                 <Text style={styles.noteText}>Thêm món hàng</Text>
            </Card>
            <Text style={styles.label}>Tên của tủ đồ: {selectedTuDo ? selectedTuDo.name : ''}</Text>
            <FlatList
                data={tudo}
                renderItem={renderTuDo}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatlist}
            />
            <Text style={styles.label}>Tên của đơn hàng:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập tên....."
                value={name}
                onChangeText={setName}
            />
        
            {/* <Text style={styles.label}>Trạng thái:</Text>
            <Picker
                selectedValue={status}
                style={styles.picker}
                onValueChange={(itemValue) => setStatus(itemValue)}
            >
                <Picker.Item label="WAITING" value={0} />
                <Picker.Item label="RECEIVED" value={1} />
            </Picker> */}
            <Button
                mode="contained"
                style={styles.button}
                loading={loading}
                onPress={handleAddPackage} 
            >
                Thêm món hàng
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
    },  TuDoItem: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },  TuDoText: {
        fontSize: 16,
    }, flatlist: {
        maxHeight: 200
    }
  });

export default AddPackageScreen;