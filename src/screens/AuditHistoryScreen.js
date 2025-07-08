import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRole } from '../context/RoleContext';
import { isAdmin } from '../utils/roleUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuditHistoryScreen = ({ navigation }) => {
  const { role } = useRole();
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load audits from AsyncStorage on mount
  useEffect(() => {
    const loadAudits = async () => {
      setLoading(true);
      const stored = await AsyncStorage.getItem('audits');
      setAudits(stored ? JSON.parse(stored) : []);
      setLoading(false);
    };
    loadAudits();
    // Listen to navigation focus to refresh audits
    const unsubscribe = navigation.addListener('focus', loadAudits);
    return unsubscribe;
  }, [navigation]);

  // Delete audit and persist
  const handleDelete = (id) => {
    Alert.alert('Delete Audit', 'Are you sure you want to delete this audit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const updated = audits.filter((a) => a.id !== id);
          setAudits(updated);
          await AsyncStorage.setItem('audits', JSON.stringify(updated));
          Alert.alert('Deleted', 'Audit deleted successfully.');
        },
        style: 'destructive',
      },
    ]);
  };

  // Render each audit card
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {isAdmin(role) && (
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.label}>Rating:</Text>
      <Text style={styles.value}>{item.rating}</Text>
      <Text style={styles.label}>Checks:</Text>
      <Text style={styles.value}>{item.checks.join(', ')}</Text>
      <Text style={styles.label}>Comments:</Text>
      <Text style={styles.value}>{item.comments}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audit History</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={audits}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No audit records available.</Text>}
        />
      )}
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('RoleHome')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f8fa' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 18, textAlign: 'center', color: '#1976d2' },
  card: {
    padding: 18,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timestamp: { fontSize: 13, color: '#888' },
  deleteText: { color: 'red', fontSize: 20 },
  label: { fontWeight: 'bold', marginTop: 6, color: '#1976d2' },
  value: { marginBottom: 4, fontSize: 16 },
  buttonPrimary: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});

export default AuditHistoryScreen;