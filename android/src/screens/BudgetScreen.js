import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';

const BudgetScreen = ({navigation, route}) => {
  const {buildType, usage} = route.params;
  const [budget, setBudget] = useState(50000);

  const formatINR = value => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleNext = () => {
    navigation.navigate('Preferences', {buildType, usage, budget});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Budget</Text>
      <Text style={styles.subtitle}>
        Use the slider to set your maximum budget
      </Text>

      <View style={styles.budgetDisplay}>
        <Text style={styles.budgetAmount}>{formatINR(budget)}</Text>
        <Text style={styles.budgetLabel}>Maximum Budget</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={15000}
        maximumValue={500000}
        step={5000}
        value={budget}
        onValueChange={setBudget}
        minimumTrackTintColor="#667eea"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#667eea"
      />

      <View style={styles.rangeLabels}>
        <Text style={styles.rangeLabel}>₹15,000</Text>
        <Text style={styles.rangeLabel}>₹5,00,000</Text>
      </View>

      <View style={styles.budgetInfo}>
        <Text style={styles.infoTitle}>Budget Range</Text>
        {budget <= 30000 && (
          <Text style={styles.infoText}>
            • Entry-level build with basic components
          </Text>
        )}
        {budget > 30000 && budget <= 75000 && (
          <Text style={styles.infoText}>
            • Mid-range build with good performance
          </Text>
        )}
        {budget > 75000 && budget <= 150000 && (
          <Text style={styles.infoText}>
            • High-performance build for demanding tasks
          </Text>
        )}
        {budget > 150000 && (
          <Text style={styles.infoText}>
            • Premium/enthusiast-grade components
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  budgetDisplay: {
    backgroundColor: '#667eea',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  budgetAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  budgetLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  rangeLabel: {
    fontSize: 14,
    color: '#666',
  },
  budgetInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BudgetScreen;
