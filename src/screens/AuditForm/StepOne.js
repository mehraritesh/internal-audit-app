import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StepOne = ({ formData, setFormData }) => {
  const setRating = (rating) => setFormData({ ...formData, rating });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1: Rate the process</Text>
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity
            key={num}
            style={[styles.ratingButton, formData.rating === num && styles.ratingButtonSelected]}
            onPress={() => setRating(num)}
          >
            <Text style={[styles.ratingText, formData.rating === num && styles.ratingTextSelected]}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#1976d2' },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  ratingButton: {
    backgroundColor: '#e3eafc',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 22,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  ratingButtonSelected: {
    backgroundColor: '#1976d2',
  },
  ratingText: {
    fontSize: 20,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  ratingTextSelected: {
    color: '#fff',
  },
});

export default StepOne;