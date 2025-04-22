import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import APIs, { endpoints } from "../../../configs/APIs";

const GetSurveyAnswerScreen = () => {
    const [answers, setAnswers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await APIs.get(endpoints['getSurveyAnswer']); 
                console.log(response.data);
                setAnswers(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnswers();
    }, []);

    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        );
    }

    const renderAnswerItem = ({ item }) => (
        <Card style={styles.card}>
        <Card.Content>
            <Title>{item.username}</Title>
            <Paragraph>Câu hỏi: {item.question_text}</Paragraph>
            <Paragraph>Câu trả lời: {item.answer}</Paragraph>
        </Card.Content>
        </Card>
    ); 
    return (
        <View>
            <Text style={styles.header}>Danh sách khảo sát</Text>
            <FlatList
                data={answers}
                keyExtractor={(item) => item.id}
                renderItem={renderAnswerItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
    },
    card: {
      marginVertical: 5,
      padding: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default GetSurveyAnswerScreen;