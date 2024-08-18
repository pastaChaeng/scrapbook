import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const tabBarColors = {
  light: {
    tint: '#FF69B4', // Barbie Pink
    background: '#FFF0F5', // Lavender Blush
  },
  dark: {
    tint: '#FFB6C1', // Light Pink
    background: '#353636', // Dark Gray
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarColors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          backgroundColor: tabBarColors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          borderRadius: 15,
          paddingVertical: 5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? 'home' : 'home'}
              size={24}
              color={color}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? 'user' : 'user-o'}
              size={24}
              color={color}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#FFB6C1', // Light Pink background for icons
    padding: 4,
  },
});
