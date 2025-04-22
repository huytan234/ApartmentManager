import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image  } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MyUserContext } from "../../configs/UserContext";



const HomeScreenUser = ({navigation}) => {
    const user = useContext(MyUserContext);
    console.log(user)
    return (
        <View style={styles.container}>

            <View style={styles.wrapHeader}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
                        <Avatar.Image size={100} 
                            style={styles.avatar} 
                            source={{ uri: user.avatar }} 
                        />
                    </TouchableOpacity>
                    <View style={styles.contentWrapper}>
                        <Text style={styles.greeting}>Xin chào</Text>
                        <Text style={styles.resident}>Cư dân: {user.first_name}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ChatUser')}>
                        <View style={styles.iconsWrap}>
                            <AntDesign name="message1" size={30} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.flex}>
                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="receipt" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('DanhSach')}
                        />
                    </View>
                    <Text style={styles.label}>DS Hóa Đơn</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="account-cog" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate("Service")}
                        />
                    </View>
                    <Text style={styles.label}>Dịch vụ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="receipt" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate("GetCard")} 
                        />
                    </View>
                    <Text style={styles.label}>Thẻ ra vào</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="file-cabinet" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate("DanhSachTuDo")} 
                        />
                    </View>
                    <Text style={styles.label}>Tủ đồ</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.flex}>
                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="gift-outline" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate("Package")}
                        />
                    </View>
                    <Text style={styles.label}>Hàng hóa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="chart-bar" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('RegisterAccess')} 
                        />
                    </View>
                    <Text style={styles.label}>Đăng ký thẻ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="message-alert-outline" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('Feedback')} 
                        />
                    </View>
                    <Text style={styles.label}>Phản ánh</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="text-box-check-outline" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('SurveyAnswer')} 
                        />
                    </View>
                    <Text style={styles.label}>Khảo sát</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/apartment.jpg')} />
            </View>

        </View>
    )
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        top: 20,
    }, wrapHeader: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "red"
    }, header: {
        flexDirection: 'row',
        alignItems: 'center',
    }, avatar: {
        marginTop: 20,
        marginRight: 20,
    }, contentWrapper: {
        justifyContent: 'center',
    }, greeting: {
        fontSize: 20,
        fontWeight: 'bold',
    }, resident: {
        fontSize: 18,
        color: 'white',
    }, iconsWrap: {
        padding: 5,
    }, flex:{
        flexDirection: 'row',
        marginTop: 20
    }, service: {
        width: 80,
        alignItems: 'center',
        margin: 10,
    }, iconService: {
        width: 60,
        height: 60,
        backgroundColor: '#f5f5f5', 
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    }, label: {
        marginTop: 5,
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
    }, image: {
        width: 380,
        height: 250,
        marginTop: 20,
    }, imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default HomeScreenUser;