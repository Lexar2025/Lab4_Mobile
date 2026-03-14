import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function UserDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const json = await response.json();
        setUser(json);
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Пользователь не найден</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Контакты</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
        <Text style={styles.label}>Телефон:</Text>
        <Text style={styles.value}>{user.phone}</Text>
        <Text style={styles.label}>Сайт:</Text>
        <Text style={styles.value}>{user.website}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Адрес</Text>
        <Text style={styles.label}>Улица:</Text>
        <Text style={styles.value}>{user.address.street}</Text>
        <Text style={styles.label}>Дом:</Text>
        <Text style={styles.value}>{user.address.suite}</Text>
        <Text style={styles.label}>Город:</Text>
        <Text style={styles.value}>{user.address.city}</Text>
        <Text style={styles.label}>Индекс:</Text>
        <Text style={styles.value}>{user.address.zipcode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Компания</Text>
        <Text style={styles.label}>Название:</Text>
        <Text style={styles.value}>{user.company.name}</Text>
        <Text style={styles.label}>Слоган:</Text>
        <Text style={styles.value}>{user.company.catchPhrase}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#0066cc',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#0066cc',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  error: {
    fontSize: 16,
    color: '#cc0000',
  },
});
