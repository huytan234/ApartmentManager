import React, { useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import APIs, { endpoints } from "../../configs/APIs";


const NotificationScreen = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const [notification, setNotification] = React.useState([]);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const response = await APIs.get(endpoints['notification']); 
                setNotification(response.data);
            } catch (error) {
                console.error('Error fetching Notification:', error);
            } finally {
                setLoading(false);
            }
        };
        loadNotifications();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông báo</Text>
            <FlatList
                data={notification}
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
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
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


export default NotificationScreen;