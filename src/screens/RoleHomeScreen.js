import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRole } from '../context/RoleContext';
import { isAdmin, isViewer, isAuditor } from '../utils/roleUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoleHomeScreen = ({ navigation }) => {
  const { role, setRole } = useRole();
  const [stats, setStats] = useState({ total: 0, recent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const stored = await AsyncStorage.getItem('audits');
      const audits = stored ? JSON.parse(stored) : [];
      const recentAudits = audits.filter(audit => {
        const auditDate = new Date(audit.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return auditDate > weekAgo;
      });
      
      setStats({
        total: audits.length,
        recent: recentAudits.length
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setRole(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{stats.total}</Text>
        <Text style={styles.statLabel}>Total Audits</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{stats.recent}</Text>
        <Text style={styles.statLabel}>This Week</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Welcome, {role}</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginVertical: 40 }} />
      ) : (
        renderStats()
      )}

      <View style={styles.buttonGroup}>
        {isAuditor(role) && (
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('AuditForm')}>
            <Text style={styles.buttonText}>Start New Audit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>View Audit History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('PolicyViewer')}>
          <Text style={styles.buttonText}>View Policy Manual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Quick Info</Text>
        <Text style={styles.infoText}>
          {isAuditor(role) 
            ? "You can create new audits, view history, and access policy documents."
            : isAdmin(role)
            ? "You can view all audits, delete records, and access policy documents."
            : "You can view audit history and access policy documents."
          }
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f6f8fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1976d2',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonPrimary: {
    backgroundColor: '#1976d2',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 8,
    width: 280,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#e53935',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 8,
    width: 280,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default RoleHomeScreen;
