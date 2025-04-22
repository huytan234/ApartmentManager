import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";


const GetAccessCardScreen = () => {
    const [loading, setLoading] = React.useState(false);
    const [getaccess, setGetAccess] = React.useState([]);
    useEffect(() => {
        const loadAccess = async () => {
            setLoading(true);
            try {
                const response = await APIs.get(endpoints['get-access']); 
                const dataWithUpdates = response.data.map(item => ({ ...item, updated: false }));
                setGetAccess(dataWithUpdates);
                await loadUpdatedStates(); //load sau khi cập nhật status
            } catch (error) {
                console.error('Error fetching Notification:', error);
            } finally {
                setLoading(false);
            }
        };
        loadAccess();
    }, []);

    const loadUpdatedStates = async () => {
        const storedData = await AsyncStorage.getItem('update-card');
        if (storedData) {
            const updatedStates = JSON.parse(storedData);
            setGetAccess(prevAccess =>
                prevAccess.map(item => ({
                    ...item,
                    updated: updatedStates[item.id] || false // Cập nhật trạng thái từ AsyncStorage
                }))
            );
        }
    };

    const handleUpdateStatus = async (id) => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn thay đổi trạng thái thẻ này?",
            [
                { text: "Hủy", style: "cancel" },
                { 
                    text: "Xác nhận", 
                    onPress: async () => {
                        try {
                            await APIs.patch(endpoints['update-card'](id));
                            setGetAccess((prevAccess) =>
                                prevAccess.map(item =>
                                    item.id === id ? { ...item, status: 1, updated: true } : item // Cập nhật trạng thái và đánh dấu là đã cập nhật
                                )
                            );
                            // Lưu trạng thái đã cập nhật vào AsyncStorage
                            await AsyncStorage.setItem('update-card', JSON.stringify({
                                ...await AsyncStorage.getItem('update-card') && JSON.parse(await AsyncStorage.getItem('update-card')),
                                [id]: true // Đánh dấu là đã cập nhật
                            }));
                            Alert.alert("Thành công", "Trạng thái thẻ đã được cập nhật.");
                        } catch (error) {
                            console.error('Error updating status:', error);
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={[styles.notificationItem, item.updated && styles.updatedItem]}>
            <View style={styles.notificationItem}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Họ và tên: {item.name}</Text>
                    <Text style={styles.description}>CCCD: {item.cccd}</Text>
                    <Text style={styles.description}>SDT: {item.sdt}</Text>
                </View>
                <IconButton
                    icon="check"
                    color="green"
                    size={20}
                    onPress={() => handleUpdateStatus(item.id)} // Gọi hàm khi nhấn vào icon
                    style={styles.iconButton}
                />
            </View>
        </View>
    );
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách đăng ký thẻ</Text>
            <FlatList
                data={getaccess}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingBottom: 70
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center', 
    },
    notificationItem: {
        flexDirection: 'row', // Sắp xếp theo hàng
        justifyContent: 'space-between', // Căn chỉnh khoảng cách giữa text và icon
        alignItems: 'center', // Căn giữa theo chiều dọc
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    updatedItem: {
        backgroundColor: '#d4edda', // Màu nền sau khi cập nhật thành công (màu xanh nhạt)
    },
    textContainer: {
        flex: 1, // Cho phép textContainer chiếm không gian còn lại
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    iconButton: {
        // Bạn có thể thêm các style tùy chọn cho icon button
    },
});

export default GetAccessCardScreen;