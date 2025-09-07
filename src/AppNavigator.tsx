import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUsers from './telas/AddUsers';
import Users from './telas/Users';

export type RootStackParamList = {
  Users: undefined;
  AddUsers: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="AddUsers">
      <Stack.Screen name="AddUsers" component={AddUsers} options={{ title: 'Adicionar Usuário' }} />
      <Stack.Screen name="Users" component={Users} options={{ title: 'Usuários' }} />
    </Stack.Navigator>
  );
}