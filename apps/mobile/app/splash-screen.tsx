import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function CustomAnimatedSplash({
  onFinish,
}: {
  onFinish: () => void;
}) {
  // 1. 애니메이션 값 초기화
  const fadeAnim = useRef(new Animated.Value(0)).current; // 로고 투명도
  const slideAnim = useRef(new Animated.Value(0)).current; // 하단 심볼 움직임 (0 to 1)

  useEffect(() => {
    // 2. 병렬 애니메이션 실행
    Animated.parallel([
      // 로고 서서히 나타나기
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // 심볼이 왼쪽 아래에서 대각선으로 슥 올라오기
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 애니메이션 완료 후 메인으로 이동 (약간의 대기시간 부여 가능)
      setTimeout(onFinish, 1500);
    });
  }, []);

  // 심볼 이동 경로 계산 (사선 방향)
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.5, 0], // 왼쪽에서 중앙으로
  });

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.3, 0], // 아래에서 위로
  });

  return (
    <View style={styles.container}>
      {/* 배경: 캡처본의 진한 남색 톤 적용 */}
      <LinearGradient
        colors={['#16215B', '#0A0E29']}
        style={StyleSheet.absoluteFill}
      />

      {/* 중앙 텍스트 로고 영역 */}
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.logoText}>AZIT</Text>
        <Text style={styles.subText}>러닝 크루를 위한 제휴 서비스</Text>
      </Animated.View>

      {/* 하단 'A' 심볼 (이미지 파일이 있다면 <Animated.Image>로 교체하세요) */}
      <Animated.View
        style={[
          styles.symbolContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Animated.Image
          source={require('../assets/images/splash_bg_img.png')}
          style={styles.symbolImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center', zIndex: 10 },
  logoText: {
    fontSize: 52,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  subText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 10,
    opacity: 0.9,
  },
  symbolContainer: {
    position: 'absolute',
    bottom: -10,
    left: 0,
  },
  symbolImage: {
    width: 60, // 심볼 크기에 맞게 조절
    height: 60,
  },
});
