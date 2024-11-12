import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

{/* Font Awesome 5 */}
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faSearch, faUserCircle, faBookOpen, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HomeScreen = () => {

    const [suggestions, setSuggestions] = useState([]);

    const user = useSelector(state => state.userData);

    const navigation = useNavigation();

    useEffect(() => {
      // async function getUserData() {
      //   const userData = await AsyncStorage.getItem('userData');
      //   setUser(JSON.parse(userData));
      // }
      // getUserData();

      const fetchSuggestions = async () => {
        try {
          const response = await axios.get('https://fimflex.com/api/soundtech/suggestion');
          setSuggestions(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          //setLoading(false);
        }
      };
      fetchSuggestions();

    }, []);

    const handleSongPress = (song) => {
      navigation.navigate('Song', { song });
    };

      const charts = [
        {
          id: '1',
          image: 'https://via.placeholder.com/100',
          top: '50',
          name: 'Canada',
          title: 'Bảng xếp hạng hàng ngày'
        },
        {
          id: '2',
          image: 'https://via.placeholder.com/100',
          top: '50',
          name: 'Vietnam',
          title: 'Bảng xếp hạng hàng ngày'
        },
        {
          id: '3',
          image: 'https://via.placeholder.com/100',
          top: '50',
          name: 'Canada',
          title: 'Bảng xếp hạng hàng ngày'
        }
      ];

    const SuggestionsCard = ({ item }) => {
        return (
            <TouchableOpacity style={styles.containerSuggestionCard} onPress={() => handleSongPress(item)}>
                <Image source={{ uri: item.thumbnail }} style={styles.imageSuggestionCard} />
                <View style={styles.contentSuggestionCard}>
                    <Text style={styles.titleSuggestionCard}>{item.title}</Text>
                    <Text style={styles.artistSuggestionCard}>
                      {item.artists_info.map((artist) => artist.name).join(', ')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
      };
    
      const ChartsCard = ({ image, top, name, title }) => {
        return (
            <TouchableOpacity style={styles.containerChartsCard}>
                <Image source={{ uri: image }} style={styles.imageChartsCard} />
                <View style={styles.contentChartsCard}>
                    <Text style={styles.topChartsCard}>{top}</Text>
                    <Text style={styles.nameChartsCard}>{name}</Text>
                </View>
                <Text style={styles.titleChartsCard}>{title}</Text>
            </TouchableOpacity>
        );
      };

    return (
        <SafeAreaView style={styles.container}>
            { user ? (
                <>
        <View style={styles.header}>
            <View style={styles.leftSection}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.rightSection}>
                <FontAwesomeIcon icon={faBell} style={styles.bellIcon} />
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </View>
        </View>
        
        <ScrollView>

            <View style={styles.greetingContent}>
                <Text style={styles.greeting_title}>Xin chào,</Text>
                <Text style={styles.greeting_user}>{user.fullname}</Text>
                <View style={styles.containerSearch}>
                    <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Bạn muốn nghe gì?"
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            {/* Gợi ý bài hát */}
            <View style={styles.content}>
                <Text style={styles.titleHome}>Gợi ý bài hát</Text>
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.id}
                    renderItem={SuggestionsCard}
                    contentContainerStyle={styles.containerCard}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    />
            </View>

            {/* Xếp hạng */}
            <View style={styles.content}>
                <View style={styles.titleContent}>
                  <Text style={styles.titleHome}>Xếp hạng</Text>
                  <Text style={styles.moreHome}>Xem thêm</Text>
                </View>
                <FlatList
                    data={charts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <ChartsCard
                        image={item.image}
                        top={item.top}
                        name={item.name}
                        title={item.title}
                      />
                    )}
                    contentContainerStyle={styles.containerCard}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    />
            </View>

        </ScrollView>
            
        <View style={styles.footer}>
            <View style={styles.footerItem}>
                <FontAwesomeIcon icon={faHome} style={[styles.footerIcon, styles.footerIconActive]} />
                <Text style={[styles.footerText,styles.footerIconActive]}>Trang chủ</Text>
            </View>
            <View style={styles.footerItem}>
                <FontAwesomeIcon icon={faSearch} style={styles.footerIcon} />
                <Text style={styles.footerText}>Tìm kiếm</Text>
            </View>
            <View style={styles.footerItem}>
                <FontAwesomeIcon icon={faUserCircle} style={styles.footerIcon} />
                <Text style={styles.footerText}>Feed</Text>
            </View>
            <View style={styles.footerItem}>
                <FontAwesomeIcon icon={faBookOpen} style={styles.footerIcon} />
                <Text style={styles.footerText}>Thư viện</Text>
            </View>
        </View>
        </>
        ) : (
            <Text>Loading...</Text>
        )}
        </SafeAreaView>
            
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  footerIconActive: {
    color: '#19b3c2',
  },
  footerText: {
    fontSize: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 35,
    height: 35,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  greetingContent: {

  },
  greeting_user: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  greeting_title: {
    fontSize: 16,
    marginTop: 5,
    marginHorizontal: 16,
    color: '#999',
  },
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    borderColor: '#f2f2f2',
    borderWidth: 1,
    marginVertical: 5,
  },
  searchIcon: {
    color: '#999',
    marginRight: 8,
  },
  inputSearch: {
    flex: 1,
    color: '#333',
  },
  containerSuggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: 8,
    overflow: 'hidden',
    width: 200,
    height: 300,
  },
  imageSuggestionCard: {
    width: 200,
    height: 300
  },
  contentSuggestionCard: {
    flex: 1,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  titleSuggestionCard: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  artistSuggestionCard: {
    fontSize: 12,
    color: '#fff',
  },
  titleHome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  containerCard: {
    paddingHorizontal: 8,
  },
  containerChartsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: 'column',
  },
  imageChartsCard: {
    width: 150,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
  },
  contentChartsCard: {
    flex: 1,
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    width: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topChartsCard: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
  },
  nameChartsCard: {
    fontSize: 15,
    color: '#fff',
  },
  titleChartsCard: {
    fontSize: 12,
    color: '#333',
    padding: 8
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moreHome: {
    fontSize: 12,
    color: '#333',
    marginHorizontal: 16,
    marginVertical: 8,
  }
});

export default HomeScreen;