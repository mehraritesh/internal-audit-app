import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const checklist = ['Documentation complete', 'Safety measures followed', 'Tools available'];

const StepTwo = ({ formData, setFormData }) => {
  const toggleCheck = (item) => {
    const updated = formData.checks.includes(item)
      ? formData.checks.filter((i) => i !== item)
      : [...formData.checks, item];
    setFormData({ ...formData, checks: updated });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 2: Checklist</Text>
      {checklist.map((item) => (
        <View key={item} style={styles.checkboxRow}>
          <CheckBox
            value={formData.checks.includes(item)}
            onValueChange={() => toggleCheck(item)}
            tintColors={{ true: '#1976d2', false: '#aaa' }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#1976d2' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  checkbox: { marginRight: 12 },
  checkboxLabel: { fontSize: 17, color: '#333' },
});

export default StepTwo;