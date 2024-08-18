import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Platform, TouchableOpacity, TextInput, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const mockAlbums = [
  { id: '1', title: 'Vacation', imageUri: 'https://example.com/vacation.jpg' },
  { id: '2', title: 'Family', imageUri: 'https://example.com/family.jpg' },
];

const mockVideos = [
  { id: '1', title: 'Summer Trip', videoUri: 'https://example.com/video1.mp4' },
  { id: '2', title: 'Birthday Party', videoUri: 'https://example.com/video2.mp4' },
];

export default function TabTwoScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Replace this with actual authentication logic
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}
    >
      {!isLoggedIn ? (
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" color="#FF69B4" onPress={handleLogin} />
        </View>
      ) : (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">My Profile</ThemedText>
            <Button title="Logout" color="#FF69B4" onPress={handleLogout} />
          </ThemedView>
          
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://example.com/profile-picture.jpg' }}
              style={styles.profileImage}
            />
            <ThemedText type="title">Jane Doe</ThemedText>
            <ThemedText>Welcome to my profile!</ThemedText>
          </View>
          
          <Collapsible title="Albums">
            <FlatList
              data={mockAlbums}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.albumItem}>
                  <Image source={{ uri: item.imageUri }} style={styles.albumImage} />
                  <ThemedText>{item.title}</ThemedText>
                </View>
              )}
            />
            <ExternalLink href="https://example.com/my-albums">
              <ThemedText type="link">View all albums</ThemedText>
            </ExternalLink>
          </Collapsible>
          
          <Collapsible title="Videos">
            <FlatList
              data={mockVideos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.videoItem} onPress={() => alert('Play video')}>
                  <Ionicons name="play-circle" size={60} color="#FF69B4" />
                  <ThemedText>{item.title}</ThemedText>
                </TouchableOpacity>
              )}
            />
            <ExternalLink href="https://example.com/my-videos">
              <ThemedText type="link">View all videos</ThemedText>
            </ExternalLink>
          </Collapsible>
          
          <Collapsible title="Settings">
            <ThemedText>
              Customize your profile and app settings here. For more details, visit our{' '}
              <ExternalLink href="https://example.com/settings">
                <ThemedText type="link">Settings Page</ThemedText>
              </ExternalLink>.
            </ThemedText>
          </Collapsible>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  albumItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFB6C1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
});
