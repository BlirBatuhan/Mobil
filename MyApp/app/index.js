import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lessons = [
  {
    id: 1,
    title: 'React Native\'e Giriş',
    description: 'React Native nedir ve neden kullanılır?',
    level: 'Başlangıç'
  },
  {
    id: 2,
    title: 'Temel Bileşenler',
    description: 'View, Text, TouchableOpacity ve diğer temel bileşenler',
    level: 'Başlangıç'
  },
  {
    id: 3,
    title: 'Stil ve Tasarım',
    description: 'StyleSheet kullanımı ve responsive tasarım',
    level: 'Orta'
  },
  {
    id: 4,
    title: 'Navigasyon',
    description: 'Sayfa geçişleri ve navigasyon yapısı',
    level: 'Orta'
  }
];

export default function Home() {
  const [completedLessons, setCompletedLessons] = useState({});

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const progress = await AsyncStorage.getItem('lessonProgress');
      if (progress) {
        setCompletedLessons(JSON.parse(progress));
      }
    } catch (error) {
      console.error('İlerleme yüklenirken hata oluştu:', error);
    }
  };

  const getProgressPercentage = () => {
    const completed = Object.values(completedLessons).filter(Boolean).length;
    return Math.round((completed / lessons.length) * 100);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>React Native Öğrenme Yolculuğu</Text>
      <Text style={styles.subHeader}>Adım adım React Native öğrenin</Text>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Genel İlerleme: {getProgressPercentage()}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} />
        </View>
      </View>
      
      <View style={styles.lessonsContainer}>
        {lessons.map((lesson) => (
          <Link href={`/lesson/${lesson.id}`} key={lesson.id} asChild>
            <TouchableOpacity style={styles.lessonCard}>
              <View style={styles.lessonHeader}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                {completedLessons[lesson.id] && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
              <Text style={styles.lessonLevel}>{lesson.level}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  lessonsContainer: {
    padding: 20,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  lessonLevel: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badge: {
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 