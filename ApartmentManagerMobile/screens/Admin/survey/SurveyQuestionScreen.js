import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, FlatList, TouchableOpacity  } from "react-native";
import { Card, Button, ActivityIndicator } from "react-native-paper";
import APIs, { authAPI, endpoints } from "../../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SurveyQuestionScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [survey, setSurvey] = useState([]);
    const [question_text, setQuestion_text] = useState('');
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    const loadTitle = async () => {
        try {
            let res = await APIs.get(endpoints['surveys']);

            const surveyTitles = res.data.map(survey => ({
                id: survey.id,
                title: survey.title
            }));
            setSurvey(surveyTitles);
        } catch (ex) {
            console.error(ex);
        }
    }

    React.useEffect(() => {
        loadTitle();
    }, []);

    const handleAddQuestion = async () => {
        if (!selectedSurvey) {
            Alert.alert('Thông báo', 'Vui lòng chọn một khảo sát.');
            return;
        }

        try {
            setLoading(true);

            // Tạo dữ liệu để gửi
            const data = {
                survey: selectedSurvey.id,
                question_text: question_text
            };

            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken);
            console.log('Data:', data);

            // Gửi dữ liệu dưới dạng JSON
            const res = await authAPI(accessToken).post(endpoints['surveyquestion'], data, {
                headers: {
                    'Content-Type': 'multipart/form-data',

                }
            });

            if (res.status === 201) {
                Alert.alert('Notification', 'Thêm câu hỏi thành công!');
            }
        } catch (ex) {
            console.error('Error adding question:', ex);
        } finally {
            setLoading(false);
        }
    }

    const renderSurveyItem = ({ item }) => (
        <TouchableOpacity
            style={styles.surveyItem}
            onPress={() => setSelectedSurvey(item)}
        >
            <Text style={styles.surveyText}>{item.title}</Text>
        </TouchableOpacity>
    );

    

    return (
        <View style={styles.container}>
           <Card style={styles.note}>
                 <Text style={styles.noteText}>Câu hỏi khảo sát</Text>
            </Card>
            <View >
                <Text style={styles.textinput}>Tiêu đề:     {selectedSurvey ? selectedSurvey.title : ''}</Text>
            </View>
            
            <Text style={styles.label}>Danh sách khảo sát:</Text>
            {/* Hiển thị danh sách các khảo sát */}
            <FlatList
                data={survey} // Dữ liệu là danh sách các khảo sát
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSurveyItem} // Render từng mục khảo sát
                style={styles.flatList} // Thay đổi kích thước của FlatList
            />
            
            <Text style={styles.label}>Thêm câu hỏi:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập câu hỏi....."
                value={question_text}
                onChangeText={setQuestion_text}
                multiline={true}
            />
            <Button
                mode="contained"
                style={styles.button}
                loading={loading}
                onPress={handleAddQuestion} 
            >
                Thêm câu hỏi
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },  label: {
        fontSize: 16,
        marginTop: 15,
        marginBottom: 8,
        color: '#333',
    },  input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 5,
    },  button: {
        backgroundColor: 'red'
    },  note: {
        marginVertical: 12,
        padding: 12,
        backgroundColor: 'red',
        borderRadius: 5,
    },  noteText: {
        color: 'white',
        textAlign: 'center'
    },  textinput: {
        fontSize: 16,
        marginVertical: 10,
    },  surveyItem: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },  surveyText: {
        fontSize: 16,
    },  flatList: {
        maxHeight: 150, // Đặt chiều cao tối đa của FlatList
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 5,
    }, title: {
        fontSize: 20
    }
  });

export default SurveyQuestionScreen;