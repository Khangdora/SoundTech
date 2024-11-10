import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
{/* Font Awesome 5 */}
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faSearch, faUserCircle, faBookOpen, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

{/* Sự kiện âm thanh */}
import TrackPlayer from 'react-native-track-player';

const SongScreen = ({ route }) => {

    const [user, setUser] = useState(null);
    const { song } = route.params;

    const navigation = useNavigation();

    const [isPlaying, setIsPlaying] = useState(false);
    let audioPlayer = null;

    useEffect(() => {

        async function getUserData() {
            const userData = await AsyncStorage.getItem('userData');
            setUser(JSON.parse(userData));
        }

        getUserData();
          
        const setupPlayer = async () => {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add({
                id: song.id,
                url: song.url_play,
                title: song.title,
                artist: 'Track Artist',
                artwork: song.thumbnail,
              });
            await TrackPlayer.play();
        };

        setupPlayer();
        
        //Clear unmount
        return () => {
            TrackPlayer.stop();
        };

    }, []);

    const handlePlayPause = async () => {
    if (isPlaying) {
        await TrackPlayer.pause();
    } else {
        await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
    };

    return (
        <View style={styles.container}>
        <Image source={{ uri: song.poster }} style={styles.poster} />
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.artist}>
            {song.artists_info.map((artist) => artist.name).join(', ')}
            </Text>
            <Text style={styles.genre}>Genre: {song.genre.split(',').map((g) => g.trim()).join(', ')}</Text>
            <Text style={styles.duration}>Duration: {song.duration} seconds</Text>
            <Text style={styles.url}>URL: {song.url_play}</Text>
        </View>
        <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
                <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    poster: {
      width: '100%',
      height: '60%',
    },
    infoContainer: {
      padding: 16,
      backgroundColor: '#1f1f1f',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
    },
    artist: {
      fontSize: 16,
      color: '#ccc',
      marginBottom: 8,
    },
    genre: {
      fontSize: 16,
      color: '#ccc',
      marginBottom: 8,
    },
    duration: {
      fontSize: 16,
      color: '#ccc',
      marginBottom: 8,
    },
    url: {
      fontSize: 16,
      color: '#ccc',
    },
    controlsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    button: {
      backgroundColor: '#6200ee',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginHorizontal: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default SongScreen;