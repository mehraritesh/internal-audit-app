import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const AuditSummaryScreen = ({ route, navigation }) => {
  const { formData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Audit Summary</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Rating:</Text>
        <Text style={styles.value}>{formData.rating}</Text>

        <Text style={styles.label}>Checklist:</Text>
        {formData.checks.map((item, index) => (
          <Text key={index} style={styles.value}>- {item}</Text>
        ))}

        <Text style={styles.label}>Comments:</Text>
        <Text style={styles.value}>{formData.comments}</Text>
      </View>

      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.replace('History')}>
        <Text style={styles.buttonText}>Go to History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f6f8fa' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#1976d2', textAlign: 'center' },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  label: { fontWeight: 'bold', marginTop: 10, color: '#1976d2' },
  value: { marginBottom: 5, fontSize: 16 },
  buttonPrimary: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default AuditSummaryScreen;