import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import { useRole } from '../context/RoleContext';
import { isAdmin } from '../utils/roleUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuditHistoryScreen = ({ navigation }) => {
  const { role } = useRole();
  const [audits, setAudits] = useState([]);
  const [filteredAudits, setFilteredAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'oldest'

  // Load audits from AsyncStorage on mount
  useEffect(() => {
    const loadAudits = async () => {
      setLoading(true);
      try {
        const stored = await AsyncStorage.getItem('audits');
        const auditData = stored ? JSON.parse(stored) : [];
        setAudits(auditData);
        setFilteredAudits(auditData);
      } catch (error) {
        Alert.alert('Error', 'Failed to load audit history.');
      } finally {
        setLoading(false);
      }
    };
    loadAudits();
    // Listen to navigation focus to refresh audits
    const unsubscribe = navigation.addListener('focus', loadAudits);
    return unsubscribe;
  }, [navigation]);

  // Filter and sort audits
  useEffect(() => {
    let filtered = audits;
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = audits.filter(audit => 
        audit.comments.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.rating.toString().includes(searchQuery) ||
        audit.checks.some(check => check.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredAudits(filtered);
  }, [audits, searchQuery, sortBy]);

  // Delete audit and persist
  const handleDelete = (id) => {
    Alert.alert('Delete Audit', 'Are you sure you want to delete this audit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const updated = audits.filter((a) => a.id !== id);
            setAudits(updated);
            await AsyncStorage.setItem('audits', JSON.stringify(updated));
            Alert.alert('Deleted', 'Audit deleted successfully.');
          } catch (error) {
            Alert.alert('Error', 'Failed to delete audit.');
          }
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
      <Text style={styles.value}>{item.rating}/5</Text>
      <Text style={styles.label}>Checks:</Text>
      <Text style={styles.value}>{item.checks.join(', ')}</Text>
      <Text style={styles.label}>Comments:</Text>
      <Text style={styles.value}>{item.comments}</Text>
    </View>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>No Audits Found</Text>
      <Text style={styles.emptyText}>
        {searchQuery ? 'Try adjusting your search terms.' : 'Start by creating your first audit.'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audit History</Text>
      
      {/* Search and Sort Controls */}
      <View style={styles.controlsContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search audits..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
        >
          <Text style={styles.sortButtonText}>
            {sortBy === 'newest' ? 'Newest First' : 'Oldest First'}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredAudits}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
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
  controlsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sortButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
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
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default AuditHistoryScreen;