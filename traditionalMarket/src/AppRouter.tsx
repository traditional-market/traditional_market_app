import React from 'react';
import {View, Text} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapScene from './scene/MapScene';
import MarketDetailScene from './scene/MarketDetailScene';

type Props = {};

const Stack = createStackNavigator();

const Test1 = () => {
  const nav = useNavigation();
  return (
    <View>
      <Text>TEST 222222221</Text>
      <TouchableOpacity onPress={() => nav.navigate('test2')}>
        <Text>GO TO TEST2</Text>
      </TouchableOpacity>
    </View>
  );
};

const Test2 = () => {
  const nav = useNavigation();

  return (
    <View>
      <Text>TEST 2</Text>
      <TouchableOpacity onPress={() => nav.navigate('test1')}>
        <Text>GO TO TEST1</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="MAP" component={MapScene} />
        <Stack.Screen
          name="DETAIL"
          component={MarketDetailScene}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
        <Stack.Screen name="test1" component={Test1} />
        <Stack.Screen name="test2" component={Test2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppRouter;
