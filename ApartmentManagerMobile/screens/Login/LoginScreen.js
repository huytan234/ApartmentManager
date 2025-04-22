import { useNavigation } from "@react-navigation/native";
import React, {useContext} from "react";
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { MyDispatchContext } from "../../configs/UserContext";
import APIs, { authAPI, authApi, endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = () => {
    const fields = [{
        "label": "Tên đăng nhập",
        "icon": "account",
        "name": "username"
    }, {
        "label": "Mật khẩu",
        "icon": "eye",
        "name": "password",
        "secureTextEntry": true
    }];

    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const nav = useNavigation();
    const dispatch = useContext(MyDispatchContext);

    const updateState = (field, value) => {
        setUser(current => {
            return {...current, [field]: value}
        });
    }

    const login = async () => {
        setLoading(true);
        try {
            let res = await APIs.post(endpoints['login'], {
                ...user,
                // 'client_id': 'piatEjT04jIfPWIVF6KSHS7QxyvbDaktNH4DUHoe',
                // 'client_secret': 'lZOGKIsA2H845dRVjmsqgHg1PGNOWlBRiJDj7u5glgNZOXnjAZzhxrtpnqJGpTvXxE6dRoKifnLPAj4SVzuEkEUH2zwG4vxIrRfrfe4sqmxAawv9OH0e2hEL2N40iR6k',
                
                'client_id': 'Z92Y8cE5VcpSQx6J2CXoh8CLpS6xvtjjPptotmOC',
                'client_secret': 't0u7ybaSO2IPHT7skp3IkzvNyHnEoWIWlRokCNSGlf5z299RQpJiaqhZ33L8AJzXda9IQXKpdD8FSfKijVP64lKlRrxukc6OW6oOwU3XsCwkigESJV5RKKsgCunA3PY8',

                'grant_type': 'password'
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.info(res.data);

            await AsyncStorage.setItem("token", res.data.access_token);

            setTimeout(async () => {
                let user = await authAPI(res.data.access_token).get(endpoints['current-user']);
                let userData = user.data;
                console.info(userData);

                dispatch({
                    'type': "login",
                    'payload': userData
                })

                if (userData.role === 0) {
                    nav.navigate('HomeAdmin'); // Điều hướng admin
                } else if (userData.role === 1) {
                    nav.navigate('HomeUser'); // Điều hướng user
                }

            }, 100);
        } catch (ex) {
            console.error(ex.response?.data || ex.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>HUYTAN APARTMENT</Text>
                {fields.map(c => (
                    <TextInput
                        secureTextEntry={c.secureTextEntry}
                        value={user[c.name]}
                        onChangeText={t => updateState(c.name, t)}
                        style={styles.innerContainer}
                        key={c.name}
                        label={c.label}
                        right={<TextInput.Icon icon={c.icon}/>}
                    />
                ))}
                <Button
                    style={styles.button}
                    icon="account"
                    loading={loading}
                    mode="contained"
                    onPress={login}
                >
                    ĐĂNG NHẬP
                </Button>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',     
        backgroundColor: '#e0e0e0',   
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        padding: 10,
        textAlign: 'center',       
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    button: {
        marginTop: 5,
    },
});


export default LoginScreen;