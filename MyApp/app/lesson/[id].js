import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lessonContent = {
  1: {
    title: 'React Native\'e Giriş',
    content: `
React Native, Facebook tarafından geliştirilen açık kaynaklı bir mobil uygulama geliştirme framework'üdür. 
JavaScript ve React kullanarak native mobil uygulamalar geliştirmenize olanak sağlar.

Temel Özellikler:
• Tek kod tabanıyla hem iOS hem Android için uygulama geliştirme
• Native performans
• Geniş bileşen kütüphanesi
• Hot Reloading özelliği
• Büyük geliştirici topluluğu

React Native'i Neden Kullanmalıyız?
1. Hızlı Geliştirme
2. Maliyet Etkinliği
3. Geniş Ekosistem
4. Kolay Öğrenme Eğrisi
    `,
    question: {
      type: 'code',
      text: "Aşağıdaki kod bloğunda eksik olan kısmı tamamlayın. React Native'de bir metin göstermek için hangi bileşeni kullanmalıyız?",
      code: `import { View, [BOŞLUK] } from 'react-native';

function Welcome() {
  return (
    <View>
      [BOŞLUK]Merhaba React Native![/BOŞLUK]
    </View>
  );
}`,
      answer: 'Text',
      hint: 'Metin göstermek için kullanılan temel bileşen'
    }
  },
  2: {
    title: 'Temel Bileşenler',
    content: `
React Native'in temel bileşenleri, mobil uygulama geliştirmede sıkça kullanılan yapı taşlarıdır.

View: En temel container bileşeni
Text: Metin gösterimi için kullanılır
TouchableOpacity: Dokunmatik etkileşimler için
Image: Resim gösterimi
ScrollView: Kaydırılabilir içerik
TextInput: Kullanıcı girişi
Button: Buton oluşturma

Örnek Kullanım:
import { View, Text } from 'react-native';

function MyComponent() {
  return (
    <View>
      <Text>Merhaba React Native!</Text>
    </View>
  );
}
    `,
    question: {
      type: 'code',
      text: "Aşağıdaki kod bloğunda eksik olan kısmı tamamlayın. Dokunmatik etkileşimler için hangi bileşeni kullanmalıyız?",
      code: `import { View, Text, [BOŞLUK] } from 'react-native';

function Button() {
  return (
    [BOŞLUK] onPress={() => alert('Tıklandı!')}>
      <Text>Tıkla</Text>
    [/BOŞLUK]>
  );
}`,
      answer: 'TouchableOpacity',
      hint: 'Dokunmatik etkileşimler için kullanılan bileşen'
    }
  },
  3: {
    title: 'Stil ve Tasarım',
    content: `
React Native'de stil tanımlamaları StyleSheet API'si kullanılarak yapılır.

Temel Stil Özellikleri:
• flex: Esnek düzen için
• margin: Dış boşluk
• padding: İç boşluk
• backgroundColor: Arka plan rengi
• borderRadius: Köşe yuvarlaklığı

Örnek StyleSheet Kullanımı:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 16,
    color: '#333'
  }
});
    `,
    question: {
      type: 'code',
      text: "Aşağıdaki stil tanımlamasında eksik olan özelliği tamamlayın. Metnin rengini belirlemek için hangi özelliği kullanmalıyız?",
      code: `const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    [BOŞLUK]: '#333'
  }
});`,
      answer: 'color',
      hint: 'Metin rengini belirleyen CSS özelliği'
    }
  },
  4: {
    title: 'Navigasyon',
    content: `
React Native'de sayfa geçişleri için React Navigation kütüphanesi kullanılır.

Temel Navigasyon Tipleri:
• Stack Navigator
• Tab Navigator
• Drawer Navigator

Örnek Stack Navigator Kullanımı:
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
    `,
    question: {
      type: 'code',
      text: "Aşağıdaki navigasyon kodunda eksik olan kısmı tamamlayın. Stack Navigator'ı oluşturmak için hangi fonksiyonu kullanmalıyız?",
      code: `import { NavigationContainer } from '@react-navigation/native';
import { [BOŞLUK] } from '@react-navigation/stack';

const Stack = [BOŞLUK]();`,
      answer: 'createStackNavigator',
      hint: 'Stack Navigator oluşturmak için kullanılan fonksiyon'
    }
  },
};

export default function Lesson() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const lesson = lessonContent[id];
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    checkLessonProgress();
  }, []);

  const checkLessonProgress = async () => {
    try {
      const progress = await AsyncStorage.getItem('lessonProgress');
      if (progress) {
        const completedLessons = JSON.parse(progress);
        if (completedLessons[id]) {
          setShowResult(true);
          setUserAnswer(lesson.question.answer);
        }
      }
    } catch (error) {
      console.error('İlerleme kontrolü sırasında hata:', error);
    }
  };

  const saveProgress = async () => {
    try {
      const progress = await AsyncStorage.getItem('lessonProgress');
      const completedLessons = progress ? JSON.parse(progress) : {};
      completedLessons[id] = true;
      await AsyncStorage.setItem('lessonProgress', JSON.stringify(completedLessons));
    } catch (error) {
      console.error('İlerleme kaydedilirken hata:', error);
    }
  };

  const handleSubmit = async () => {
    if (userAnswer.trim().toLowerCase() === lesson.question.answer.toLowerCase()) {
      await saveProgress();
      setShowResult(true);
      Alert.alert(
        "Tebrikler!", 
        "Doğru cevap! Devam etmek için bir sonraki derse geçebilirsiniz.",
        [
          {
            text: "Ana Sayfaya Dön",
            onPress: () => router.push("/")
          },
          {
            text: "Devam Et",
            style: "cancel"
          }
        ]
      );
    } else {
      Alert.alert("Yanlış Cevap", "Tekrar deneyin!");
    }
  };

  const renderCodeQuestion = () => {
    const codeLines = lesson.question.code.split('\n');
    return (
      <View style={styles.codeContainer}>
        {codeLines.map((line, index) => {
          if (line.includes('[BOŞLUK]')) {
            return (
              <View key={index} style={styles.codeLine}>
                <Text style={styles.codeText}>
                  {line.split('[BOŞLUK]')[0]}
                </Text>
                <TextInput
                  style={styles.codeInput}
                  value={userAnswer}
                  onChangeText={setUserAnswer}
                  placeholder="Cevabınızı yazın"
                  placeholderTextColor="#666"
                  editable={!showResult}
                />
                <Text style={styles.codeText}>
                  {line.split('[/BOŞLUK]')[1] || ''}
                </Text>
              </View>
            );
          }
          return (
            <Text key={index} style={styles.codeText}>
              {line}
            </Text>
          );
        })}
      </View>
    );
  };

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ders bulunamadı</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.content}>{lesson.content}</Text>
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>Soru:</Text>
        <Text style={styles.questionText}>{lesson.question.text}</Text>
        
        {renderCodeQuestion()}
        
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={showResult}
        >
          <Text style={styles.submitButtonText}>Kontrol Et</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.hintButton}
          onPress={() => setShowHint(!showHint)}
        >
          <Text style={styles.hintButtonText}>
            {showHint ? 'İpucunu Gizle' : 'İpucu Göster'}
          </Text>
        </TouchableOpacity>

        {showHint && (
          <Text style={styles.hintText}>İpucu: {lesson.question.hint}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 30,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  questionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#444',
  },
  codeContainer: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  codeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  codeText: {
    color: '#d4d4d4',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  codeInput: {
    backgroundColor: '#2d2d2d',
    color: '#fff',
    padding: 5,
    borderRadius: 4,
    minWidth: 100,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hintButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  hintButtonText: {
    color: '#666',
    fontSize: 14,
  },
  hintText: {
    marginTop: 10,
    color: '#666',
    fontStyle: 'italic',
  },
}); 