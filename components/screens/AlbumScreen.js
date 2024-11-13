import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

{/* Font Awesome 5 */}
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faSearch, faUserCircle, faBookOpen, faBell, faHeart, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { setPaused } from '../tools/actions';

const AlbumScreen = ({ route }) => {

    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.currentSong);
    const isPaused = useSelector((state) => state.isPaused);
    const duration = useSelector((state) => state.duration);
    const position = useSelector((state) => state.position);

    const { album } = route.params;

    const navigation = useNavigation();
    const { top, right, bottom, left } = useSafeAreaInsets();

    useEffect(() => {


    });
    
    return (
        <SafeAreaView style={[styles.container,{
            marginTop: top,
            marginRight: right,
            marginBottom: bottom,
            marginLeft: left
        }]}>
            
        </SafeAreaView>
    )

}