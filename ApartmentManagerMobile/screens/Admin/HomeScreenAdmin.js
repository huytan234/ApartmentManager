import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MyUserContext } from "../../configs/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../configs/APIs";

const HomeScreenAdmin = ({navigation}) => {
    const user = useContext(MyUserContext);
    const [loading, setLoading] = React.useState(true);
    const [totalResidents, setTotalResidents] = React.useState(0);

    const fetchResidentsCount = async () => {
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('token');
            const response = await authAPI(accessToken).get(endpoints['users']);

            if (response.status === 200) {
                const users = response.data;
                const residents = users.filter(user => user.role === 1); // 1 là role cho Resident
                setTotalResidents(residents.length); // Tính tổng số cư dân
            }
        } catch (error) {
            console.error("Error fetching resident count:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResidentsCount();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <View style={styles.wrapHeader}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
                        <Avatar.Image 
                            size={100} style={styles.avatar} 
                            source={{ uri: user.avatar }}   
                        />
                    </TouchableOpacity>
                    <View style={styles.contentWrapper}>
                        <Text style={styles.greeting}>Xin chào</Text>
                        <Text style={styles.resident}>Admin: {user.first_name}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ChatAdmin')}>
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
                            icon="cash" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('CreateAccount')} 
                        />
                    </View>
                    <Text style={styles.label}>Đăng ký TK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="message-alert-outline" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('FeedbackAdmin')}
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
                            onPress={() => navigation.navigate('SurveyAdmin')} 
                        />
                    </View>
                    <Text style={styles.label}>Khảo sát</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="file-cabinet" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('TuDoAdmin')} 
                        />
                    </View>
                    <Text style={styles.label}>Tủ đồ</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.flex}>
                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="account-cog" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('ServiceAdmin')} 
                        />
                    </View>
                    <Text style={styles.label}>Service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="chart-bar" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('GetAccess')}
                        />
                    </View>
                    <Text style={styles.label}>Thẻ ra vào</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="receipt" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('BillAdmin')} 
                        />
                    </View>
                    <Text style={styles.label}>Hóa đơn</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.service}>
                    <View style={styles.iconService}>
                        <IconButton 
                            icon="receipt" 
                            color="#FF4B4B"  
                            size={30}        
                            onPress={() => navigation.navigate('ListBill')} 
                        />
                    </View>
                    <Text style={styles.label}>DS Hóa Đơn</Text>
                </TouchableOpacity>
            </View>

            {/* Thống kê cư dân */}
            <Card style={styles.card}>
                <Text style={styles.title}>Thống kê số cư dân</Text>
                <Text style={styles.total}>Số lượng cư dân hiện tại: {totalResidents}</Text>
            </Card>


            <TouchableOpacity onPress={() => navigation.navigate('ListUser')}>
                <View style={styles.icon2}>
                    <Text style={styles.label2}>Danh sách cư dân</Text>
                    {/* <IconButton
                        icon="gift-outline" 
                        color="#FF4B4B"  
                        size={30}
                    /> */}
                </View>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        top: 20
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
        backgroundColor: '#f5f5f5',  // light grey background
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
    }, loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },  card: {
        padding: 20,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    total: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
    }, icon2: {
        width: '70%',           
        height: 80,              
        backgroundColor: '#fff', 
        justifyContent: 'center',   
        alignItems: 'center',       
        borderRadius: 10,           
        flexDirection: 'row',       
        marginVertical: 10, 
        alignSelf: 'center',       
    },label2: {
        fontSize: 18,               
        color: '#000',             
        marginRight: 10,            
    }
})

export default HomeScreenAdmin;

