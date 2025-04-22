import react, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import APIs, { endpoints } from '../../configs/APIs';
import { ActivityIndicator } from 'react-native-paper';

const ListBillScreen = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadBills = async () => {
        setLoading(true);
        try {
            const response = await APIs.get(endpoints['bills']);
            const paidBills = response.data.filter(bill => bill.status === 1);
            setBills(paidBills);
        } catch (error) {
            console.error('Error fetching bills:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteBill = async (billId) => {
        try {
            const response = await APIs.delete(endpoints['delete-bill'](billId));
            // if (response.status === 204) {
            //     Alert.alert('Thành công', 'Hóa đơn đã được xóa.');
            //     setBills(bills.filter(bill => bill.id !== billId));  // Xóa hóa đơn khỏi danh sách
            // } else {
            //     Alert.alert('Lỗi', 'Không thể xóa hóa đơn.');
            // }
            setBills(bills.filter(bill => bill.id !== billId));
        } catch (error) {
            console.error('Error deleting bill:', error);
            setBills(bills.filter(bill => bill.id !== billId)); 
        }
    };

    const confirmDelete = (billId) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa hóa đơn này không?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => deleteBill(billId) },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        loadBills();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!bills.length) {
        return <Text>Không có hóa đơn nào.</Text>;
    }

    // Hàm render mỗi item hóa đơn
    const renderItem = ({ item }) => (
        <View style={styles.billItem}>
            <Text style={styles.billText}>Tên: {item.name}</Text>
            <Text style={styles.billText}>Số tiền: {item.amount}</Text>
            <Text style={styles.billText}>Phương thức thanh toán: {item.payment_method}</Text>

            {/* Nút Xóa hóa đơn */}
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item.id)}
            >
                <Text style={styles.deleteButtonText}>Xóa hóa đơn</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách hóa đơn</Text>
            <FlatList
                data={bills}
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
    billItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    billText: {
        fontSize: 16,
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: '#ff3b3b',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ListBillScreen;
