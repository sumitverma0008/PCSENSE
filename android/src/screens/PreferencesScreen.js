import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiService from '../services/ApiService';

const PreferencesScreen = ({navigation, route}) => {
  const {buildType, usage, budget} = route.params;
  const [cpuPref, setCpuPref] = useState('any');
  const [gpuPref, setGpuPref] = useState('any');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const preferences = {cpu: cpuPref, gpu: gpuPref};
      
      if (buildType === 'laptop') {
        const results = await ApiService.getLaptopRecommendations(
          budget,
          usage,
          preferences,
        );
        navigation.navigate('Results', {
          results,
          buildType,
          usage,
          budget,
        });
      } else {
        const build = await ApiService.getDesktopBuild(
          budget,
          usage,
          preferences,
        );
        navigation.navigate('Results', {
          results: [build],
          buildType,
          usage,
          budget,
        });
      }
    } catch (error) {
      alert('Error generating recommendations. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Set Preferences</Text>
      <Text style={styles.subtitle}>
        Choose your preferred brands (optional)
      </Text>

      {buildType === 'desktop' && (
        <>
          <Text style={styles.sectionTitle}>CPU Brand</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[styles.option, cpuPref === 'any' && styles.selectedOption]}
              onPress={() => setCpuPref('any')}>
              <Text style={[styles.optionText, cpuPref === 'any' && styles.selectedText]}>Any</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, cpuPref === 'intel' && styles.selectedOption]}
              onPress={() => setCpuPref('intel')}>
              <Text style={[styles.optionText, cpuPref === 'intel' && styles.selectedText]}>Intel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, cpuPref === 'amd' && styles.selectedOption]}
              onPress={() => setCpuPref('amd')}>
              <Text style={[styles.optionText, cpuPref === 'amd' && styles.selectedText]}>AMD</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>GPU Brand</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[styles.option, gpuPref === 'any' && styles.selectedOption]}
              onPress={() => setGpuPref('any')}>
              <Text style={[styles.optionText, gpuPref === 'any' && styles.selectedText]}>Any</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, gpuPref === 'nvidia' && styles.selectedOption]}
              onPress={() => setGpuPref('nvidia')}>
              <Text style={[styles.optionText, gpuPref === 'nvidia' && styles.selectedText]}>NVIDIA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, gpuPref === 'amd' && styles.selectedOption]}
              onPress={() => setGpuPref('amd')}>
              <Text style={[styles.optionText, gpuPref === 'amd' && styles.selectedText]}>AMD</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Type:</Text>
          <Text style={styles.summaryValue}>{buildType}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Usage:</Text>
          <Text style={styles.summaryValue}>{usage}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Budget:</Text>
          <Text style={styles.summaryValue}>{ApiService.formatINR(budget)}</Text>
        </View>
        {buildType === 'desktop' && (
          <>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>CPU:</Text>
              <Text style={styles.summaryValue}>{cpuPref}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GPU:</Text>
              <Text style={styles.summaryValue}>{gpuPref}</Text>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.generateButton}
        onPress={handleGenerate}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Icon name="lightning-bolt" size={20} color="#fff" />
            <Text style={styles.generateButtonText}>Generate Recommendation</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  option: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: '#667eea',
    backgroundColor: '#667eea',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  summary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  generateButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default PreferencesScreen;
