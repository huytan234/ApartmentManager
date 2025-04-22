import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Card } from "react-native-paper";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import APIs, { authAPI, endpoints } from "../../configs/APIs";



const ServiceScreen = ({navigation}) => {
    const [service, setService] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('token');
                const res = await authAPI(accessToken).get(endpoints['services']);
                
                if (res.status === 200) {
                    setService(res.data);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchServices();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="red" />;
    }

    const renderServiceItem = ({ item }) => (
        <Card style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>Giá: {item.price} VND</Text>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách dịch vụ</Text>
            <FlatList
                data={service}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderServiceItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#f9f9f9",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
        color: "#555",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    list: {
        paddingBottom: 16,
    },
});


export default ServiceScreen;