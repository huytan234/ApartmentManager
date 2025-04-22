import React, {useState, useContext, useEffect} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";
import { MyDispatchContext, MyUserContext } from "../../configs/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIs, { endpoints } from "../../configs/APIs";

const ProfileScreen = ({navigation}) => {
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [user, setUser]= React.useState('');
    const dispatch = useContext(MyDispatchContext);
    const nav = useNavigation();
    
    const handleLogout = () => {
        setDialogVisible(true);
    };
 
    const handleConfirmLogout = () => {
        setDialogVisible(false);
        dispatch({type: "logout"})
        nav.navigate('Login');
    };

    const handleCancelLogout = () => {
        setDialogVisible(false);
    };

    const handleGetUser = async ()=>{
        setLoading(true);
        try{
            const accessToken = await AsyncStorage.getItem('token');
            let res= await APIs.get(endpoints['current-user'],{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUser(res.data);
            console.log(res.data);
        }catch(ex){
            console.log(ex)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        handleGetUser()
    },[])
    useEffect(() => {
        console.log('User context:', user); 
    }, [user]);

    return (
        <View style={styles.container}>
        <ScrollView>
            <Card style={styles.card}>
            <Card.Title title="Thông tin cư dân" />
                <Card.Content>
                    <TextInput style={styles.input} label="Họ và tên" value={`${user.last_name || ''} ${user.first_name || ''}`} disabled />
                    <TextInput style={styles.input} label="Email" value={user.email || ''} disabled />
                    <TextInput style={styles.input} label="Username" value={user.username || ''} disabled />
                </Card.Content>
            </Card>
            <Button mode="contained" 
                loading={loading} 
                style={styles.logoutButton} 
                onPress={handleLogout}>
            Đăng xuất
            </Button>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Đăng xuất</Dialog.Title>
                <Dialog.Description>
                    Bạn có chắc chắn thoát tài khoản không?
                </Dialog.Description>
                <Dialog.Button label="Không" onPress={handleCancelLogout} />
                <Dialog.Button label="Có" onPress={handleConfirmLogout} />
            </Dialog.Container>
        </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEDEC',
        padding: 16,
        color:"#000",
    },
    card: {
        marginBottom: 20,
        padding: 16,
    },
    input: {
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    logoutButton: {
        backgroundColor: 'red',
        marginVertical: 20,
    },
});



export default ProfileScreen;