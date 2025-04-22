import React, { useContext, useEffect } from "react";
import {FlatList, View, Text, ScrollView, StyleSheet, TextInput , TouchableOpacity, Alert} from "react-native";
import { Card, Button, List } from "react-native-paper";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyUserContext } from "../../configs/UserContext";

const SurveyAnswerScreen = ({navigation}) => {
    const user = useContext(MyUserContext);
    const [loading, setLoading] = React.useState(false);
    const [question, setQuestion] = React.useState([]);
    const [answer, setAnswer] = React.useState('');
    const [ selectedQuestion, setSelectedQuestion] = React.useState(null);

    
    // Lấy danh sách dữ liệu câu hỏi
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const res = await APIs.get(endpoints['surveyquestions']);
                
                const surveyQuestions = res.data.map(question => ({
                    id: question.id,
                    question_text: question.question_text
                }));
                
                setQuestion(surveyQuestions);
            } catch (error) {
                console.error("Error fetching question:", error);
            } finally {
                setLoading(false);
            }
        };
        
        loadQuestions();
    }, []);

    //render lấy iteam câu hỏi
    const renderQuestionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.questionItem}
            onPress={() => setSelectedQuestion(item)}
        >
            <Text style={styles.surveyText}>{item.question_text}</Text>
        </TouchableOpacity>
    );

    const handleAddAnswer = async () => {
        if (!selectedQuestion) {
            Alert.alert('Thông báo', 'Vui lòng chọn một câu hỏi.');
            return;
        }
    
        const userId = user?.id; // Lấy userId từ context
        console.log('User ID:', userId); // Kiểm tra giá trị của userId
    
        if (!userId) {
            Alert.alert('Thông báo', 'Người dùng không hợp lệ.');
            return;
        }
    
        try {
            setLoading(true);
            const data = new FormData();
            data.append('user', user.userId); // Kiểm tra rằng userId không phải là null
            data.append('question', selectedQuestion.id);
            data.append('answer', answer);
    
            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log('Data:', data);
    
            // Gửi dữ liệu dưới dạng FormData
            const res = await authAPI(accessToken).post(endpoints['surveyAnswer'], data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            if (res.status === 201) {
                Alert.alert('Notification', 'Đã gửi câu trả lời!');
            }
        } catch (ex) {
            console.error('Error adding answer:', ex.response?.data || ex.message);
        } finally {
            setLoading(false);
        }
    }



    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.label}>Thông tin người dùng:</Text>
                <Text style={styles.userInfo}>Tên: {user.first_name}</Text>
            </Card>


            <View >
                <Text style={styles.questionText}>Câu hỏi:     {selectedQuestion ? selectedQuestion.question_text : ''}</Text>
            </View>
            
            <Text style={styles.label}>Danh sách câu hỏi:</Text>
            {/* Hiển thị danh sách các khảo sát */}
            <FlatList
                data={question} // Dữ liệu là danh sách các khảo sát
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderQuestionItem} // Render từng mục khảo sát
                style={styles.flatList} // Thay đổi kích thước của FlatList
            />

            <Card style={styles.card}>
                <Text style={styles.label}>Trả lời:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập câu trả lời của bạn..."
                    value={answer}
                    onChangeText={setAnswer}
                    multiline={true}
                />
            </Card>

            <Button
                mode="contained"
                style={styles.button}
                loading={loading}
                onPress={handleAddAnswer} 
            >
                Trả lời 
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    card: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    userInfo: {
        fontSize: 14,
        color: '#555',
    },
    questionText: {
        fontSize: 16,
        color: '#555',
    },
    textInput: {
            height: 80,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            textAlignVertical: 'top',
    }, button: {
            backgroundColor: 'red'
    },  questionItem: {
            padding: 10,
            backgroundColor: '#f9f9f9',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
    },  flatList: {
            maxHeight: 150,
            marginBottom: 20,
    }
});

export default SurveyAnswerScreen;