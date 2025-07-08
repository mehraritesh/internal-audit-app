import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRole } from '../context/RoleContext';
import { isAdmin, isViewer, isAuditor } from '../utils/roleUtils';

const RoleHomeScreen = ({ navigation }) => {
  const { role, setRole } = useRole();

  const handleLogout = () => {
    setRole(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {role}</Text>
      <View style={styles.buttonGroup}>
        {isAuditor(role) && (
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('AuditForm')}>
            <Text style={styles.buttonText}>Start Audit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('PolicyViewer')}>
          <Text style={styles.buttonText}>View Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f6f8fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#1976d2',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#1976d2',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: 240,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#e53935',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: 240,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RoleHomeScreen;
