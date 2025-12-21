import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PriceDashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="chart-line" size={60} color="#667eea" />
        <Text style={styles.title}>Price Tracking</Text>
        <Text style={styles.subtitle}>Real-time component price monitoring</Text>
      </View>

      <View style={styles.infoCard}>
        <Icon name="information" size={24} color="#667eea" />
        <Text style={styles.infoText}>
          Price tracking dashboard coming soon! We'll show you historical price
          trends, best deals, and price drop alerts.
        </Text>
      </View>

      <View style={styles.featuresList}>
        <Text style={styles.featuresTitle}>Upcoming Features</Text>
        
        <View style={styles.feature}>
          <Icon name="chart-areaspline" size={24} color="#667eea" />
          <Text style={styles.featureText}>Price History Graphs</Text>
        </View>

        <View style={styles.feature}>
          <Icon name="bell-ring" size={24} color="#667eea" />
          <Text style={styles.featureText}>Price Drop Alerts</Text>
        </View>

        <View style={styles.feature}>
          <Icon name="tag-multiple" size={24} color="#667eea" />
          <Text style={styles.featureText}>Best Deals Finder</Text>
        </View>

        <View style={styles.feature}>
          <Icon name="clock-outline" size={24} color="#667eea" />
          <Text style={styles.featureText}>Daily Automated Updates</Text>
        </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 15,
    lineHeight: 22,
  },
  featuresList: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 15,
  },
});

export default PriceDashboardScreen;
