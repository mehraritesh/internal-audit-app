import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRole } from '../context/RoleContext';

const roles = ['Admin', 'Auditor', 'Viewer'];

const LoginScreen = ({ navigation }) => {
  const { setRole } = useRole();

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Auditor') {
      navigation.replace('AuditForm');
    } else {
      navigation.replace('History');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Internal Audit App</Text>
      <Text style={styles.subtitle}>Select Your Role</Text>
      <View style={styles.buttonGroup}>
        {roles.map((r) => (
          <TouchableOpacity key={r} style={styles.buttonPrimary} onPress={() => handleSelectRole(r)}>
            <Text style={styles.buttonText}>{r}</Text>
          </TouchableOpacity>
        ))}
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1976d2',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 32,
    color: '#333',
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;