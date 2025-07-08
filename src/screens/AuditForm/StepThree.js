import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const StepThree = ({ formData, setFormData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3: Comments</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Enter comments here..."
        value={formData.comments}
        onChangeText={(text) => setFormData({ ...formData, comments: text })}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#1976d2' },
  input: {
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 8,
    padding: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#222',
  },
});

export default StepThree;