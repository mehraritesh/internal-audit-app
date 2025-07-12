import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StepOne = ({ formData, setFormData }) => {
  const setRating = (rating) => setFormData({ ...formData, rating });

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isSelected = formData.rating >= i;
      stars.push(
        <TouchableOpacity
          key={i}
          style={styles.starContainer}
          onPress={() => setRating(i)}
        >
          <Text style={[styles.star, isSelected && styles.starSelected]}>
            {isSelected ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1: Rate the process</Text>
      <Text style={styles.subtitle}>Tap on a star to rate from 1 to 5</Text>
      
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      
      {formData.rating && (
        <View style={styles.ratingDisplay}>
          <Text style={styles.ratingText}>
            You rated: {formData.rating} {formData.rating === 1 ? 'star' : 'stars'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#1976d2' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  starContainer: {
    padding: 8,
    marginHorizontal: 4,
  },
  star: {
    fontSize: 40,
    color: '#ddd',
  },
  starSelected: {
    color: '#ffd700',
  },
  ratingDisplay: {
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
  },
});

export default StepOne;