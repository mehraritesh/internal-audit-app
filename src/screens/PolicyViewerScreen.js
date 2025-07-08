import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const PolicyViewerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={require('./../assets/policy.html')}
        style={styles.webview}
      />
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('RoleHome')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  webview: {
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default PolicyViewerScreen;
