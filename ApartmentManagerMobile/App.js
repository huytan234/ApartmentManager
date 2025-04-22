import React, { useContext, useReducer } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

 // Ẩn tất cả các warning logs
LogBox.ignoreAllLogs();

// Import các màn hình của bạn
import LoginScreen from './screens/Login/LoginScreen';
import HomeScreenUser from './screens/User/HomeScreenUser';
import HomeScreenAdmin from './screens/Admin/HomeScreenAdmin';
import NotificationScreen from './screens/User/NotificationScreen';
import ProfileScreen from './screens/User/ProfileScreen';
import CreateAccountScreen from './screens/Admin/CreateAccountScreen';
import FeedbackScreen from './screens/User/FeedbackScreen';
import ServiceScreen from './screens/User/ServiceScreen';
import FeedbackScreenAdmin from './screens/Admin/FeedbackScreenAdmin';
import UpdateProfileScreen from './screens/User/UpdateProfileScreen';
import RegisterAccessCard from './screens/User/RegisterAccessCard';
import ServiceScreenAdmin from './screens/Admin/ServiceScreenAdmin';
import NotiAdminScreen from './screens/Admin/NotiAdminScreen';
import ChatScreen from './screens/ChatFireBase/ChatScreen';
import ChatDetailScreen from './screens/ChatFireBase/Chat';
import ChatListScreen from './screens/ChatFireBase/RoomChat';
import GetAccessCardScreen from './screens/Admin/GetAccessCardScreen';
import BillAdminScreen from './screens/Admin/BillAdminScreen';
import BillUserScreen from './screens/User/BillUserScreen';
import GetBillScreen from './screens/User/GetBillScreen';
import ListBillScreen from './screens/Admin/ListBillScreen';
import ListUserScreen from './screens/Admin/ListUserScreen';
import GetCardScreen from './screens/User/GetCardScreen';
//Tủ đồ admin
import TuDoAdminScreen from './screens/Admin/TuDo/TuDoAdminScreen';
import AddTuDoScreen from './screens/Admin/TuDo/AddTuDoScreen';
import AddPackageScreen from './screens/Admin/TuDo/AddPackageScreen';
import TuDoUserScreen from './screens/User/TuDoUserScreen';
import TuDoScreen from './screens/User/TuDoScreen';
import DelPackageScreen from './screens/Admin/TuDo/DelPackageScreen';
// Khảo sát
import SurveyScreenAdmin from './screens/Admin/survey/SurveyScreenAdmin';
import SurveyTitleScreen from './screens/Admin/survey/SurveyTitleScreen';
import SurveyQuestionScreen from './screens/Admin/survey/SurveyQuestionScreen';
import SurveyAnswerScreen from './screens/User/SurveyAnswerScreen';
import GetSurveyAnswerScreen from './screens/Admin/survey/GetSurveyAnswerScreen';

// Khai báo các Contexts và Reducer
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyDispatchContext, MyUserContext } from './configs/UserContext';
import { MyUserReducer } from './configs/UserReducer';

const HomeStack = createNativeStackNavigator();

function Login() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='Login' component={LoginScreen} />
    </HomeStack.Navigator>
  );
}


function MyHome() {
  const user = useContext(MyUserContext);
  return (
    <HomeStack.Navigator>
      {user?.role === 0 ? (
        <HomeStack.Screen
          options={{ headerShown: false }}
          name='HomeAdmin'
          component={HomeScreenAdmin} />
      ) : (
        <HomeStack.Screen
          options={{ headerShown: false }}
          name='HomeUser'
          component={HomeScreenUser} />
      )}
      <HomeStack.Screen name='Service' component={ServiceScreen} />
      <HomeStack.Screen name='Feedback' component={FeedbackScreen} />
      <HomeStack.Screen name='CreateAccount' component={CreateAccountScreen} />
      <HomeStack.Screen name='FeedbackAdmin' component={FeedbackScreenAdmin} />
      <HomeStack.Screen name='UpdateProfile' component={UpdateProfileScreen} />
      <HomeStack.Screen name='RegisterAccess' component={RegisterAccessCard} />
      <HomeStack.Screen name='GetAccess' component={GetAccessCardScreen} />
      <HomeStack.Screen name='ServiceAdmin' component={ServiceScreenAdmin} />
      <HomeStack.Screen name='ListUser' component={ListUserScreen} />
      <HomeStack.Screen name='GetCard' component={GetCardScreen} />
      {/* Hóa Đơn */}
      <HomeStack.Screen name='BillAdmin' component={BillAdminScreen} />
      <HomeStack.Screen name='BillUser' component={BillUserScreen} />
      <HomeStack.Screen name='DanhSach' component={GetBillScreen} />
      <HomeStack.Screen name='ListBill' component={ListBillScreen} />
      {/* Tủ đồ */}
      <HomeStack.Screen name='TuDoAdmin' component={TuDoAdminScreen} />
      <HomeStack.Screen name='Add-TuDo' component={AddTuDoScreen} />
      <HomeStack.Screen name='Add-Package' component={AddPackageScreen} />
      <HomeStack.Screen name='Package' component={TuDoUserScreen} />
      <HomeStack.Screen name='DanhSachTuDo' component={TuDoScreen} />
      <HomeStack.Screen name='DeletePackage' component={DelPackageScreen} />
      {/* chat */}
      <HomeStack.Screen
        name='ChatUser'
        component={ChatScreen}
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <HomeStack.Screen name='ChatAdmin' component={ChatListScreen} />
      <HomeStack.Screen name='ChatDetail' component={ChatDetailScreen} />
      {/* Khảo sát */}
      <HomeStack.Screen name='SurveyAdmin' component={SurveyScreenAdmin} />
      <HomeStack.Screen name='SurveyTitle' component={SurveyTitleScreen} />
      <HomeStack.Screen name='SurveyQuestion' component={SurveyQuestionScreen} />
      <HomeStack.Screen name='SurveyAnswer' component={SurveyAnswerScreen} />
      <HomeStack.Screen name='GetSurveyAnswer' component={GetSurveyAnswerScreen} />
    </HomeStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

const MyTabNavigator = () => {
  const user = useContext(MyUserContext);
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'red',
        // position: 'absolute',
        width: '90%',
        left: '5%',
        bottom: 15,
        height: 60,
        borderRadius: 20
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
    }}>

      <Tab.Screen name="Home" component={MyHome}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
        }}
      />

      {user?.role === 0 ? (
        <Tab.Screen name="Thông báo Admin" component={NotiAdminScreen}
          options={{
            tabBarIcon: ({ color }) => <AntDesign name="notification" size={24} color={color} />
          }}
        />
      ) : (
        <Tab.Screen name="Thông báo" component={NotificationScreen}
          options={{
            tabBarIcon: ({ color }) => <AntDesign name="notification" size={24} color={color} />
          }}
        />
      )}


      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
        }}
      />

    </Tab.Navigator>
  )
}


const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <NavigationContainer>
      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          {user === null ? (
            // Nếu chưa đăng nhập, chỉ hiển thị màn hình Login
            <Login />
          ) : (
            // Nếu đã đăng nhập, hiển thị Bottom Tabs
            <MyTabNavigator />
          )}

        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
    </NavigationContainer>
  )
}

export default App;