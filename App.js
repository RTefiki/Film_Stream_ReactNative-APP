import {SafeAreaView } from 'react-native';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import PersonScreen from './screens/PersonScreen';
import SearchScreen from './screens/SearchScreen';



const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <SafeAreaView style={{width: '100%', height:'100%',marginTop: 42}} >
      <NavigationContainer >
          <Stack.Navigator>
             <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />   
             <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
             <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
             <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />  
          </Stack.Navigator>
     </NavigationContainer>
     </SafeAreaView>
    
  );
}

