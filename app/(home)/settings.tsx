import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function HomeIndex() {
  const router = useRouter();
  function onPress() {
    router.back();
  }
  return (
    <Pressable
      className='flex-1 items-center justify-center bg-white'
      onPress={onPress}
    >
      <Text>Settings</Text>
    </Pressable>
  )
}