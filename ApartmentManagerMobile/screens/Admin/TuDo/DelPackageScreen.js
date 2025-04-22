import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Alert } from "react-native";
import { Card, IconButton } from "react-native-paper";
import APIs, { endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DelPackageScreen = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPackages = async () => {
            setLoading(true);
            try {
                const response = await APIs.get(endpoints['get-package']);
                if (response.status === 200) {
                    const filteredPackages = response.data.filter(pkg => pkg.status === 1);
                    console.log('Filtered Packages:', filteredPackages); // Kiểm tra gói đã lọc
                    setPackages(filteredPackages);
                } else {
                    Alert.alert('Lỗi', 'Không thể tải danh sách món hàng.');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPackages();
    }, []);

    // Hàm gọi API xóa món hàng
    const handleDeletePackage = async (packageId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa món hàng này?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const accessToken = await AsyncStorage.getItem('token');
                            const response = await APIs.delete(endpoints['delete-package'](packageId), {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });
    
                            console.log('Delete Response:', response); // Kiểm tra phản hồi khi xóa
    
                            if (response.status === 204) { // Kiểm tra trạng thái phản hồi
                                Alert.alert("Thành công", "Món hàng đã được xóa.");
                                
                                // Cập nhật danh sách sau khi xóa
                                setPackages((prevPackages) => prevPackages.filter(pkg => pkg.id !== packageId));
                            } else {
                                const errorMessage = response.data?.message || 'Không thể xóa món hàng.';
                                Alert.alert("Lỗi", errorMessage);
                            }
                        } catch (error) {
                            const errorResponse = error.response?.data || error.message;
                            console.error('Error deleting package:', errorResponse);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (!packages.length) {
        return <Text style={styles.noPackagesText}>Không có đơn hàng nào để xóa.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách món hàng có thể xóa</Text>
            <FlatList
                data={packages}
                renderItem={({ item }) => {
                    return (
                        <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={styles.packageText}>Tên món hàng: {item.name}</Text>
                                <IconButton
                                    icon="delete-outline"
                                    color="red"
                                    size={28}
                                    style={styles.deleteButton}
                                    onPress={() => {
                                        handleDeletePackage(item.id);
                                    }} 
                                />
                            </View>
                        </Card>
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f0f0f5", // Updated background color
    },
    header: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 16,
        textAlign: "center",
        color: "#333", // Softer text color
    },
    noPackagesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: "#666", // Softer color for no content
    },
    card: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#ffffff", // White background for a clean card
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#e0e0e0", // Light border for a polished look
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    packageText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#444", // Softer text color
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: "red", // Clear red border for the delete button
        borderRadius: 8,
        padding: 6,
    },
    list: {
        paddingBottom: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default DelPackageScreen;
