import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="chip" size={80} color="#fff" />
        <Text style={styles.title}>PCSensei</Text>
        <Text style={styles.subtitle}>AI-Powered PC Building Assistant</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.card, styles.primaryCard]}
          onPress={() => navigation.navigate('BuildType')}>
          <Icon name="desktop-tower" size={50} color="#667eea" />
          <Text style={styles.cardTitle}>Build PC</Text>
          <Text style={styles.cardDesc}>
            Get custom PC recommendations based on your budget and needs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.secondaryCard]}
          onPress={() =>
            navigation.navigate('BuildType', {type: 'laptop'})
          }>
          <Icon name="laptop" size={50} color="#667eea" />
          <Text style={styles.cardTitle}>Find Laptop</Text>
          <Text style={styles.cardDesc}>
            Discover the perfect laptop for your requirements
          </Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => navigation.navigate('PriceDashboard')}>
            <Icon name="chart-line" size={30} color="#667eea" />
            <Text style={styles.smallCardText}>Price Tracker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => navigation.navigate('About')}>
            <Icon name="information" size={30} color="#667eea" />
            <Text style={styles.smallCardText}>About</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Features</Text>
          <View style={styles.feature}>
            <Icon name="brain" size={24} color="#667eea" />
            <Text style={styles.featureText}>AI-Powered Recommendations</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="currency-inr" size={24} color="#667eea" />
            <Text style={styles.featureText}>Budget Optimization</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="check-circle" size={24} color="#667eea" />
            <Text style={styles.featureText}>Compatibility Checking</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="cart" size={24} color="#667eea" />
            <Text style={styles.featureText}>Multi-Store Price Comparison</Text>
          </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#667eea',
  },
  secondaryCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#764ba2',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  smallCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 3,
  },
  smallCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  features: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 15,
  },
});

export default HomeScreen;
