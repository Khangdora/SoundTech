import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LaunchScreen from './components/screens/LaunchScreen';
import HomeScreen from './components/screens/HomeScreen';
import SongScreen from './components/screens/SongScreen';

const Stack = createStackNavigator();

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async() => {
            // Kiểm tra trạng thái đăng nhập (ví dụ: từ AsyncStorage, API, hoặc biến toàn cục)
            const userToken = await AsyncStorage.getItem('userToken'); // Thay đổi theo cách bạn lưu token
            setIsLoggedIn(!!userToken); // Cập nhật trạng thái đăng nhập
        };

        checkLoginStatus();
    }, []);

    return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
            <>
                <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} />
                <Stack.Screen 
            name="Song" 
            component={SongScreen} 
            options={{ headerShown: false }} />
            </>
        ) : (
          <Stack.Screen 
              name="Launch" 
              options={{ headerShown: false }} 
          >
              {props => <LaunchScreen {...props} setIsLoggedIn={setIsLoggedIn} />} 
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});