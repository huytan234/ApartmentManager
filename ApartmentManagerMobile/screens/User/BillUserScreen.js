import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Image, ScrollView  } from "react-native";
import APIs, { endpoints } from "../../configs/APIs";
import { ActivityIndicator, Button, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BillUserScreen = ({ route }) => {
    const { billId, userId } = route.params; // Lấy billId và userId từ route
    const [billDetails, setBillDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
    const [billImage, setBillImage] = useState(null);

    const BILL_CHOICES = [
        { label: 'MOMO', value: 0 },
        { label: 'VNPAY', value: 1 },
        { label: 'NGÂN HÀNG', value: 2 },
    ];

    useEffect(() => {
        console.log("Received billId:", billId);
        console.log("Received userId:", userId);
        const loadBillDetails = async () => {
            setLoading(true);
            try {
                const response = await APIs.get(endpoints['get-bill'](billId));  // Sử dụng API đã thêm
                if (response.data.user === userId) {  // Đảm bảo hóa đơn là của người dùng đang đăng nhập
                    setBillDetails(response.data);
                }
            } catch (error) {
                console.error('Error fetching bill details:', error);
            } finally {
                setLoading(false);
            }
        };
        loadBillDetails();
    }, [billId, userId]);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Quyền truy cập bị từ chối', 'Ứng dụng cần quyền truy cập vào thư viện ảnh.');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets) {
                setBillImage(result.assets[0]);  // Lưu hình ảnh đã chọn vào state
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const handlePayment = async () => {
        const formData = new FormData();
        formData.append('payment_method', selectedPaymentMethod);

        if (billImage) {
            formData.append('bill_image', {
                uri: billImage.uri,
                name: billImage.fileName || 'bill_image.jpg',
                type: billImage.type || 'image/jpeg',
            });
        }

        try {
            const accessToken = await AsyncStorage.getItem('token');
            const response = await APIs.patch(endpoints['update-bill'](billId), formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,  // Sử dụng Bearer Token cho xác thực
                    'Content-Type': 'multipart/form-data',  // Với formData, đảm bảo rằng Content-Type là multipart/form-data
                }
            });
            if (response.status === 200) {
                Alert.alert("Cập nhật thành công", "Hóa đơn đã được cập nhật!");
            }
        } catch (error) {
            console.error("Error updating bill:", error);
        }
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!billDetails) {
        return <Text>Không tìm thấy hóa đơn</Text>;  // Hiển thị nếu không tìm thấy hóa đơn
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Thông tin chuyển khoản" />
                <Card.Content>
                    <Text style={styles.cardText}>Ngân hàng: TpBank</Text>
                    <Text style={styles.cardText}>Số tài khoản: 04255944201</Text>
                    <Text style={styles.cardText}>Chủ tài khoản: Nguyễn Huy Tân</Text>
                </Card.Content>
            </Card>

            <Text style={styles.header}>Chi tiết hóa đơn</Text>
            <Text style={styles.label}>Tên: {billDetails.name}</Text>
            <Text style={styles.label}>Số tiền: {billDetails.amount}</Text>

            <Text style={styles.label}>Chọn phương thức thanh toán:</Text>
            <Picker
                selectedValue={selectedPaymentMethod}
                onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                style={styles.picker}
            >
                {BILL_CHOICES.map(choice => (
                    <Picker.Item key={choice.value} label={choice.label} value={choice.value} />
                ))}
            </Picker>

            <Button mode="contained" onPress={pickImage} style={{ marginTop: 20, backgroundColor: 'red' }}>
                Chọn hình ảnh chuyển khoản
            </Button>

            {billImage && <Image source={{ uri: billImage.uri }} style={styles.image} />}

            <Button 
                mode="contained" 
                loading={loading}  
                onPress={handlePayment} 
                style={styles.button}
            >
                Thanh toán
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 20,
    }, 
    button: {
        marginTop: 20,
        backgroundColor: 'red',
    },
    card: {
        padding: 16,
        borderRadius: 8,
        elevation: 2,
        marginBottom: 20, // Để có khoảng trống giữa card và các thành phần khác
    },
    cardText: {
        fontSize: 16,
        marginBottom: 4,
    }
});

export default BillUserScreen;
