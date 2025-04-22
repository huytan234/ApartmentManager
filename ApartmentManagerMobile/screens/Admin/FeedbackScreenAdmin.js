import React, {useState, useEffect, useContext} from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";

const FeedbackScreenAdmin = () => {
    const [feedbacks, setFeedbacks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await APIs.get(endpoints['feedbacks']); 
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    const renderFeedbackItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>{item.user_username}</Title>
                <Paragraph style={styles.content}>{item.content}</Paragraph>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách phản hồi</Text>
            <FlatList
                data={feedbacks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderFeedbackItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 20,
        textAlign: 'center',
    },
    card: {
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1E88E5',
    },
    content: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingBottom: 20,
    },
});

export default FeedbackScreenAdmin;
