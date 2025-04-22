import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { IconButton } from "react-native-paper";
import APIs, { endpoints } from '../../configs/APIs';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TuDoUserScreen = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hàm load danh sách đơn hàng
    const loadPackages = async () => {
        setLoading(true);
        try {
            const response = await APIs.get(endpoints['get-package']); // Lấy danh sách đơn hàng
            const dataWithUpdates = response.data.map(item => ({ ...item, updated: false }));
            setPackages(dataWithUpdates);
            await loadUpdatedStates();
        } catch (error) {
            console.error('Error fetching packages:', error);
            Alert.alert('Lỗi', 'Không thể tải danh sách đơn hàng.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPackages(); // Load danh sách đơn hàng khi component được mount
    }, []);

    const loadUpdatedStates = async () => {
        const storedData = await AsyncStorage.getItem('update-package');
        if (storedData) {
            const updatedStates = JSON.parse(storedData);
            setPackages(prevAccess =>
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
            "Bạn có muốn lấy đơn hàng?",
            [
                { text: "Hủy", style: "cancel" },
                { 
                    text: "Xác nhận", 
                    onPress: async () => {
                        try {
                            await APIs.patch(endpoints['update-package'](id));
                            setPackages((prevAccess) =>
                                prevAccess.map(item =>
                                    item.id === id ? { ...item, status: 1, updated: true } : item // Cập nhật trạng thái và đánh dấu là đã cập nhật
                                )
                            );
                            // Lưu trạng thái đã cập nhật vào AsyncStorage
                            await AsyncStorage.setItem('update-package', JSON.stringify({
                                ...await AsyncStorage.getItem('update-package') && JSON.parse(await AsyncStorage.getItem('update-package')),
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


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!packages.length) {
        return <Text>Không có đơn hàng nào trong tủ đồ.</Text>;
    }

    // Hàm render mỗi item đơn hàng
    const renderItem = ({ item }) => (
        <View style={[styles.packageItem, item.updated && styles.updatedItem]} >
            <View>
                <Text style={styles.packageText}>Tên món hàng: {item.name}</Text>
                <Text style={styles.packageText}>Tên tủ đồ: {item.tuDo.name}</Text>
            </View>
            <IconButton
                    icon="check"
                    color="green"
                    size={20}
                    onPress={() => handleUpdateStatus(item.id)} // Gọi hàm khi nhấn vào icon
                    style={styles.iconButton}
                />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách đơn hàng trong tủ đồ</Text>
            <FlatList
                data={packages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    packageItem: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
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
    packageText: {
        fontSize: 16,
        marginBottom: 5,
    }, updatedItem: {
        backgroundColor: '#d4edda', 
    },
});

export default TuDoUserScreen;