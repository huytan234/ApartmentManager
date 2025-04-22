import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { authAPI, endpoints } from "../../configs/APIs";
import { Card } from "react-native-paper";

const TuDoScreen = () => {
    const [tudo, setTudo] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchTuDo = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('token');
                const res = await authAPI(accessToken).get(endpoints['tudos']);
                
                if (res.status === 200) {
                    setTudo(res.data);
                }
            } catch (error) {
                console.error("Error fetching tudo:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTuDo();
    }, []);
    
    if (loading) {
        return <ActivityIndicator size="large" color="red" />;
    }

    const renderTuDoItem = ({ item }) => (
        <Card style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
        </Card>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách tủ đồ</Text>
            <FlatList
                data={tudo}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTuDoItem}
                contentContainerStyle={styles.list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 28, // Tăng kích thước tiêu đề để nổi bật hơn
        fontWeight: "600", // Tăng độ đậm của tiêu đề
        marginBottom: 16,
        textAlign: "center",
        color: "#333", // Màu chữ tối hơn để tương phản tốt hơn
    },
    card: {
        width: 120,
        marginBottom: 16, // Tăng khoảng cách giữa các card
        padding: 20, // Tăng khoảng cách bên trong card
        borderRadius: 20, // Bo tròn nhẹ card
        backgroundColor: "#fff", // Màu nền trắng cho card
        // elevation: 5, // Hiệu ứng nâng cho Android
        alignItems: 'center', 
        justifyContent: 'center',
    },
    name: {
        fontSize: 20, // Kích thước lớn hơn cho tên tủ đồ
        fontWeight: "600", // Độ đậm nhẹ hơn cho chữ
        color: "#1f78b4", // Màu xanh dương để thu hút sự chú ý
        marginBottom: 6,
        textAlign: 'center',
    },
    list: {
        paddingBottom: 30, 
    },
});

export default TuDoScreen;