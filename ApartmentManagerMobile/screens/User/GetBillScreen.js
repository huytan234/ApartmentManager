import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MyUserContext } from "../../configs/UserContext";
import APIs, { endpoints } from "../../configs/APIs"; 
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const GetBillScreen = () => {
    const USER = useContext(MyUserContext);
    const [bill, setBill] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadBills = async () => {
            setLoading(true); 
            try {
                console.log("Fetching bills for user ID:", USER.id);
                const response = await APIs.get(endpoints['bills']);
                const filteredBills = response.data.filter(bill => bill.user === USER.id);
                console.log("Filtered bills for user:", filteredBills);
                setBill(filteredBills);
            } catch (error) {
                console.error('Error fetching Bill:', error);
            } finally {
                setLoading(false);
            }
        };
        loadBills();
    }, [USER.id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const renderItem = ({ item }) => {
        console.log("Bill ID:", item.id);  // Log ra ID của mỗi hóa đơn
        return (
            <TouchableOpacity 
                onPress={() => navigation.navigate('BillUser', { billId: item.id, userId: USER.id })} 
                style={styles.notificationItem}
            >
                <Text style={styles.title}>Tên hóa đơn: {item.name}</Text>
                <Text style={styles.description}>Tiền: {item.amount}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông tin hóa đơn</Text>
            <FlatList
                data={bill}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()} // Sử dụng id của bill làm key
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationItem: {
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    }
});

export default GetBillScreen;
