import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';

export default function CustomAnimatedSplash({
  onFinish,
}: {
  onFinish: () => void;
}) {
  useEffect(() => {
    const showSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Failed to hide splash screen', error);
      }

      const timer = setTimeout(() => {
        onFinish();
      }, 1500);

      return () => clearTimeout(timer);
    };
    showSplash();
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#003483', '#000b1d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Image
        source={require('../assets/images/splash-bg-symbol.png')}
        style={styles.symbolImage}
        resizeMode="stretch"
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoImage: {
    width: 182,
    height: 112,
  },
  symbolImage: {
    position: 'absolute',
    width: 470,
    height: 470,
    bottom: -150,
    right: -30,
  },
});
