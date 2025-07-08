import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuditFormScreen from '../screens/AuditFormScreen';
import LoginScreen from '../screens/LoginScreen';
import AuditSummaryScreen from '../screens/AuditSummaryScreen';
import AuditHistoryScreen from '../screens/AuditHistoryScreen';
import PolicyViewerScreen from '../screens/PolicyViewerScreen';
import RoleHomeScreen from '../screens/RoleHomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RoleHome" component={RoleHomeScreen} options={{ title: 'Dashboard' }} />
    <Stack.Screen name="AuditForm" component={AuditFormScreen} options={{ title: 'Audit Form' }} />
    <Stack.Screen name="Summary" component={AuditSummaryScreen} options={{ title: 'Audit Summary' }} />
    <Stack.Screen name="History" component={AuditHistoryScreen} options={{ title: 'Audit History' }} />
    <Stack.Screen name="PolicyViewer" component={PolicyViewerScreen} options={{ title: 'Policy Manual' }} />
  </Stack.Navigator>
);

export default AppNavigator;