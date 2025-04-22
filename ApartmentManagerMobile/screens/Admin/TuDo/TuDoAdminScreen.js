import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, IconButton } from "react-native-paper";

const TuDoAdminScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
           <Card style={styles.note}>
                 <Text style={styles.noteText}>Thông tin tủ đồ</Text>
            </Card>
            <TouchableOpacity onPress={() => navigation.navigate('Add-TuDo')}>
                <View style={styles.iconService}>
                    <Text style={styles.label}>Thêm tủ đồ:</Text>
                    <IconButton
                        icon="file-cabinet" 
                        color="#FF4B4B"  
                        size={30}
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Add-Package')}>
                <View style={styles.iconService}>
                    <Text style={styles.label}>Thêm món hàng:</Text>
                    <IconButton
                        icon="gift-outline" 
                        color="#FF4B4B"  
                        size={30}
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('DeletePackage')}>
                <View style={styles.iconService}>
                    <Text style={styles.label}>Xóa món hàng:</Text>
                    <IconButton
                        icon="gift-outline" 
                        color="#FF4B4B"  
                        size={30}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },  note: {
        marginVertical: 12,
        padding: 12,
        backgroundColor: 'red',
        borderRadius: 5,
    }, noteText: {
        color: 'white',
        textAlign: 'center'
    }, button: {
        justifyContent: 'center',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        width: '80%',
        height: 80
    }, iconService: {
        width: '70%',            // Chiều rộng 90% của màn hình
        height: 80,              // Chiều cao cố định là 80
        backgroundColor: '#f0f0f0', // Màu nền (có thể thay đổi theo ý bạn)
        justifyContent: 'center',   // Canh giữa theo chiều dọc
        alignItems: 'center',       // Canh giữa theo chiều ngang
        borderRadius: 10,           // Bo góc cho hình chữ nhật
        flexDirection: 'row',       // Sắp xếp Text và IconButton theo hàng ngang
        marginVertical: 10, 
        alignSelf: 'center',        // Khoảng cách dọc giữa các thành phần khác
    },
    label: {
        fontSize: 18,               // Kích thước chữ
        color: '#000',              // Màu chữ
        marginRight: 10,            // Khoảng cách bên phải của chữ với icon
    }
  });

export default TuDoAdminScreen;