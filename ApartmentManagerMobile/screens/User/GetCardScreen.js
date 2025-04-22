import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { MyUserContext } from '../../configs/UserContext';
import APIs, { endpoints } from '../../configs/APIs'; // Đảm bảo rằng bạn đã nhập APIs

const ResidentFamilyScreen = () => {
  const user = useContext(MyUserContext);
  const [data, setData] = useState([]); // Thay đổi tên state cho đúng ngữ nghĩa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
        const loadAccess = async () => {
        setLoading(true);
        try {
            const response = await APIs.get(endpoints['get-access']); 
            console.log(response.data);
            // Lọc chỉ lấy những đối tượng của user_id đang đăng nhập
            const userData = response.data.filter(item => item.user_id === user.id); // Sử dụng user.id
            setData(userData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
        };
        loadAccess();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Danh sách thẻ ra vào</Text>
        <FlatList
            data={data} // Sử dụng data đã được lọc
            keyExtractor={item => item.id.toString()} 
            renderItem={({ item }) => (
            <View style={styles.item}>
                <Text style={styles.text}>Name: {item.name}</Text> 
                <Text style={styles.text}>CCCD: {item.cccd}</Text> 
                <Text style={styles.text}>SĐT: {item.sdt}</Text> 
                {/* <Text style={styles.text}>Relationship: {item.relationship}</Text>  */}
            </View>
            )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24, // Kích thước chữ lớn hơn
        fontWeight: 'bold', // In đậm
        textAlign: 'center', // Căn giữa
        marginVertical: 16, // Khoảng cách trên và dưới
    },
    item: {
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
    },
});

export default ResidentFamilyScreen;
