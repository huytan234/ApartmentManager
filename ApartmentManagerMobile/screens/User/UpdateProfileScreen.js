// import React, { useContext, useEffect, useState } from "react";
// import { View, Text, Alert, Image, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
// import { Button, HelperText, TextInput, TouchableRipple } from "react-native-paper";
// import * as ImagePicker from 'expo-image-picker';
// import APIs, { endpoints } from "../../configs/APIs";
// import { MyUserContext } from "../../configs/UserContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const UpdateProfileScreen = () => {
//     const USER = useContext(MyUserContext);  // Lấy user từ context
//     const [user, setUser] = useState({});  // Dùng để lưu trữ và cập nhật thông tin người dùng
//     const [avatar, setAvatar] = useState(null);
//     const [err, setErr] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const fields = [{
//         "label": "Tên",
//         "icon": "text",
//         "name": "first_name"
//     }, {
//         "label": "Họ và tên lót",
//         "icon": "text",
//         "name": "last_name"
//     }, {
//         "label": "Email",
//         "icon": "email",
//         "name": "email"
//     }, {
//         "label": "Tên đăng nhập",
//         "icon": "account",
//         "name": "username"
//     }];

//     useEffect(() => {
//         if (USER) {
//             setUser({
//                 first_name: USER.first_name || '',
//                 last_name: USER.last_name || '',
//                 email: USER.email || '',
//                 username: USER.username || '',
//             });
//         }
//     }, [USER]);

//     const pickImage = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền truy cập vào thư viện ảnh.");
//         } else {
//             let res = await ImagePicker.launchImageLibraryAsync();
//             if (!res.canceled) {
//                 updateState("avatar", res.assets[0]);
//             }
//         }
//     };
    
//     const updateState = (field, value) => {
//         setUser(current => ({ ...current, [field]: value }));
//     };


//     const handleUpdateProfile = async () => {
//         if (user['password'] !== user['confirm']) {
//             setErr(true);
//         } else {
//             setErr(false);
//             let form = new FormData();
//             for (let key in user) {
//                 if (key !== 'confirm') {
//                     if (key === 'avatar') {
//                         form.append(key, {
//                             uri: user.avatar.uri,
//                             name: user.avatar.fileName || 'avatar.jpg',
//                             type: user.avatar.type || 'image/jpeg'
//                         });
//                     } else {
//                         form.append(key, user[key]);
//                     }
//                 }
//             }

//             setLoading(true)
//             // console.info(USER.id)
//             // console.info(USER)
//             try {
//                 const authToken = await AsyncStorage.getItem("token");
//                 // console.log("Form data gửi lên:", JSON.stringify(form, null, 2));
//                 console.log("Avatar URI:", user.avatar.uri);

//                 let res = await APIs.patch(endpoints['update-Profile'](USER.id), form, {
//                     headers: { 
//                         // 'Content-Type': 'multipart/form-data', 
//                         Authorization: `Bearer ${authToken}`,
//                     },

//                 });

//                 if (res.status === 200 && res.data) {
                  
//                     setUser({});
                  
//                     Alert.alert("Success", "Cập nhật thành công!");
//                 } else {
//                     Alert.alert("Error", res.data?.message || "Something went wrong");
//                 }

//             } catch (ex) {
//                 console.error(ex);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <View style={[styles.container, styles.margin]}>
//             <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//                 <ScrollView>

//                     {fields.map((c) => (
//                         <TextInput
//                             secureTextEntry={c.secureTextEntry}
//                             value={user[c.name] || ''}
//                             onChangeText={(text) => updateState(c.name, text)}
//                             style={styles.margin}
//                             key={c.name}
//                             label={c.label}
//                             right={<TextInput.Icon icon={c.icon} />}
//                         />
//                     ))}

//                     <HelperText type="error" visible={err}>
//                         Đã xảy ra lỗi. Vui lòng kiểm tra lại thông tin!
//                     </HelperText>

//                     <TouchableRipple style={styles.margin} onPress={pickImage}>
//                         <Text>Chọn ảnh đại diện...</Text>
//                     </TouchableRipple>

//                     {user.avatar && <Image source={{ uri: user.avatar.uri }} style={styles.avatar} />}

//                     <Button
//                         icon="account"
//                         loading={loading}
//                         mode="contained"
//                         onPress={handleUpdateProfile}
//                     >
//                         XÁC NHẬN
//                     </Button>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     row: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//     },
//     margin: {
//         margin: 5,
//     },
//     avatar: {
//         width: 80,
//         height: 80,
//         borderRadius: 20,
//     },
// });

// export default UpdateProfileScreen;

import React, { useContext, useEffect, useState } from "react";
import { View, Text, Alert, Image, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Button, HelperText, TextInput, TouchableRipple } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import APIs, { endpoints } from "../../configs/APIs";
import { MyUserContext } from "../../configs/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateProfileScreen = () => {
    const USER = useContext(MyUserContext);  // Lấy user từ context
    const [user, setUser] = useState({});  // Dùng để lưu trữ và cập nhật thông tin người dùng
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const fields = [{
        "label": "Tên",
        "icon": "text",
        "name": "first_name"
    }, {
        "label": "Họ và tên lót",
        "icon": "text",
        "name": "last_name"
    }, {
        "label": "Email",
        "icon": "email",
        "name": "email"
    }, {
        "label": "Tên đăng nhập",
        "icon": "account",
        "name": "username"
    }];

    useEffect(() => {
        if (USER) {
            setUser({
                first_name: USER.first_name || '',
                last_name: USER.last_name || '',
                email: USER.email || '',
                username: USER.username || '',
            });
        }
    }, [USER]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Quyền truy cập bị từ chối", "Ứng dụng cần quyền truy cập vào thư viện ảnh.");
        } else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                updateState("avatar", res.assets[0]);
            }
        }
    };
    
    const updateState = (field, value) => {
        setUser(current => ({ ...current, [field]: value }));
    };

    const handleUpdateProfile = async () => {
        if (user['password'] !== user['confirm']) {
            setErr(true);
        } else {
            setErr(false);
            let form = new FormData();
            for (let key in user) {
                if (key !== 'confirm') {
                    if (key === 'avatar') {
                        form.append(key, {
                            uri: user.avatar.uri,
                            name: user.avatar.fileName || 'avatar.jpg',
                            type: user.avatar.type || 'image/jpeg'
                        });
                    } else {
                        form.append(key, user[key]);
                    }
                }
            }

            setLoading(true);

            try {
                const authToken = await AsyncStorage.getItem("token");
                console.log("Form data gửi lên:", form);
                console.log("Avatar URI:", user.avatar.uri);

                let res = await APIs.patch(endpoints['update-Profile'](USER.id), form, {
                    headers: { 
                        Authorization: `Bearer ${authToken}`,  // Xóa Content-Type để axios tự thêm
                    },
                });

                if (res.status === 200 && res.data) {
                    setUser({});
                    Alert.alert("Success", "Cập nhật thành công!");
                } else {
                    Alert.alert("Error", res.data?.message || "Something went wrong");
                }

            } catch (ex) {
                console.error(ex);
                Alert.alert("Error", "Cập nhật thất bại. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={[styles.container, styles.margin]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    {fields.map((c) => (
                        <TextInput
                            value={user[c.name] || ''}
                            onChangeText={(text) => updateState(c.name, text)}
                            style={styles.margin}
                            key={c.name}
                            label={c.label}
                            right={<TextInput.Icon icon={c.icon} />}
                        />
                    ))}

                    <HelperText type="error" visible={err}>
                        Đã xảy ra lỗi. Vui lòng kiểm tra lại thông tin!
                    </HelperText>

                    <TouchableRipple style={styles.margin} onPress={pickImage}>
                        <Text>Chọn ảnh đại diện...</Text>
                    </TouchableRipple>

                    {user.avatar && <Image source={{ uri: user.avatar.uri }} style={styles.avatar} />}

                    <Button
                        style={{backgroundColor: 'red'}}
                        icon="account"
                        loading={loading}
                        mode="contained"
                        onPress={handleUpdateProfile}
                    >
                        XÁC NHẬN
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    margin: {
        margin: 5,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 20,
    },
});

export default UpdateProfileScreen;
