import { ThemedView } from '@/components/ThemedView';
import { BgColors } from '@/constants/Colors';
import useStore from '@/store';
import { clsx } from 'clsx';
import { useRouter } from 'expo-router';
import { CheckIcon } from 'lucide-react-native';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeIndex() {
  const router = useRouter();
  const { currentColor, setCurrentColor } = useStore();
  const { width } = useWindowDimensions();
  const itemWidth = (width - 48 - 32) / 3;

  function onPress(color: string) {
    setCurrentColor(color);
    router.back();
  }

  return (
    <SafeAreaView
      className='flex-1'
    >
      <ThemedView className='flex-1 p-6'>
        <Text className='text-xl font-semibold mb-4'>Settings</Text>
        <View className='flex-row flex-wrap gap-4'>
          {BgColors.map((bgColor) => (
            <Pressable
              key={bgColor}
              onPress={() => onPress(bgColor)}
              className={clsx(
                'h-20 rounded items-center justify-center', 
                {border: bgColor === 'white'}
              )}
              style={{ backgroundColor: bgColor, width: itemWidth }}
            >
              {bgColor === currentColor ? (
                <CheckIcon color={bgColor === 'white' ? 'black' : 'white'} size={24} />
              ) : (
                <Text className={clsx('capitalize', bgColor === 'white' ? '': 'text-white')}>{bgColor}</Text>
              )}
            </Pressable>
          ))}
        </View>
      </ThemedView>
    </SafeAreaView>
  )
}
