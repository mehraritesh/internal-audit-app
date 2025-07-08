import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepOne from './AuditForm/StepOne';
import StepTwo from './AuditForm/StepTwo';
import StepThree from './AuditForm/StepThree';

// Helper to generate a unique ID for each audit
const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const AuditFormScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ rating: null, checks: [], comments: '' });
  const [loading, setLoading] = useState(false);

  // Validate only the current step's field
  const validateCurrentStep = () => {
    if (step === 1 && !formData.rating) {
      Alert.alert('Validation', 'Please select a rating to continue.');
      return false;
    }
    if (step === 2 && (!formData.checks || formData.checks.length === 0)) {
      Alert.alert('Validation', 'Please check at least one item.');
      return false;
    }
    if (step === 3 && !formData.comments.trim()) {
      Alert.alert('Validation', 'Please enter your comments.');
      return false;
    }
    return true;
  };

  // Validate all fields before submit
  const validateAll = () => {
    if (!formData.rating) {
      Alert.alert('Validation', 'Please select a rating.');
      return false;
    }
    if (!formData.checks || formData.checks.length === 0) {
      Alert.alert('Validation', 'Please check at least one item.');
      return false;
    }
    if (!formData.comments.trim()) {
      Alert.alert('Validation', 'Please enter your comments.');
      return false;
    }
    return true;
  };

  // Go to next step with validation for current step only
  const nextStep = () => {
    if (validateCurrentStep()) setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  // Submit audit and persist to AsyncStorage, validate all fields
  const handleSubmit = async () => {
    if (!validateAll()) return;
    setLoading(true);
    try {
      const newAudit = {
        ...formData,
        id: generateId(),
        timestamp: new Date().toLocaleString(),
      };
      const existing = await AsyncStorage.getItem('audits');
      const audits = existing ? JSON.parse(existing) : [];
      audits.unshift(newAudit);
      await AsyncStorage.setItem('audits', JSON.stringify(audits));
      setLoading(false);
      Alert.alert('Success', 'Audit submitted successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Summary', { formData: newAudit }) },
      ]);
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'Failed to save audit. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && <StepOne formData={formData} setFormData={setFormData} />}
      {step === 2 && <StepTwo formData={formData} setFormData={setFormData} />}
      {step === 3 && <StepThree formData={formData} setFormData={setFormData} />}

      <View style={styles.buttonRow}>
        {step > 1 && (
          <TouchableOpacity style={styles.buttonSecondary} onPress={prevStep} disabled={loading}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 3 ? (
          <TouchableOpacity style={styles.buttonPrimary} onPress={nextStep} disabled={loading}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f6f8fa' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  buttonPrimary: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AuditFormScreen;