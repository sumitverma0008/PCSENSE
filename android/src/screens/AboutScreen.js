import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="chip" size={60} color="#fff" />
        <Text style={styles.title}>PCSensei</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About PCSensei</Text>
        <Text style={styles.text}>
          PCSensei is an AI-powered PC and laptop recommendation engine that
          helps you make informed decisions when building a custom PC or
          choosing a laptop.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.feature}>
          <Icon name="brain" size={20} color="#667eea" />
          <Text style={styles.featureText}>AI-Powered Recommendations</Text>
        </View>
        <View style={styles.feature}>
          <Icon name="currency-inr" size={20} color="#667eea" />
          <Text style={styles.featureText}>Budget Optimization</Text>
        </View>
        <View style={styles.feature}>
          <Icon name="check-circle" size={20} color="#667eea" />
          <Text style={styles.featureText}>Compatibility Checking</Text>
        </View>
        <View style={styles.feature}>
          <Icon name="cart" size={20} color="#667eea" />
          <Text style={styles.featureText}>Multi-Store Comparison</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Database</Text>
        <Text style={styles.text}>
          800+ components including laptops, CPUs, GPUs, motherboards, RAM,
          storage, PSUs, and cases from trusted brands.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for PC enthusiasts
        </Text>
        <Text style={styles.copyright}>© 2025 PCSensei</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  version: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  featureText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    padding: 30,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 14,
    color: '#999',
  },
});

export default AboutScreen;
