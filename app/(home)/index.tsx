import useStore from '@/store';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function HomeIndex() {
  const router = useRouter();
  const { currentColor } = useStore();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const textOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  function onPress() {
    router.push('/settings');
  }
  
  useFocusEffect(
    useCallback(() => {
      textOpacity.value = withTiming(0, { duration: 2000 }, finished => {
        if (finished) runOnJS(setIsVisible)(false);
      });

      return () => {
        setIsVisible(true);
        textOpacity.value = 1;
      }
    }, []),
  );
  
  return (
    <Pressable
      className='flex-1 items-center justify-center'
      onPress={onPress}
      style={{ backgroundColor: currentColor || 'white' }}
    >
      {isVisible ? <Animated.View style={animatedStyle}>
        <Text>Tap to open Settings</Text>
      </Animated.View> : null}
    </Pressable>
  )
}
