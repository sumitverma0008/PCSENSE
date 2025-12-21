import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BuildTypeScreen = ({navigation, route}) => {
  const presetType = route.params?.type;

  React.useEffect(() => {
    if (presetType) {
      handleSelect(presetType);
    }
  }, [presetType]);

  const handleSelect = type => {
    navigation.navigate('UsageProfile', {buildType: type});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Type</Text>
      <Text style={styles.subtitle}>
        Select whether you want a Desktop PC or Laptop
      </Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleSelect('desktop')}>
        <Icon name="desktop-tower" size={60} color="#667eea" />
        <Text style={styles.optionTitle}>Desktop PC</Text>
        <Text style={styles.optionDesc}>
          Custom build with individual components
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleSelect('laptop')}>
        <Icon name="laptop" size={60} color="#764ba2" />
        <Text style={styles.optionTitle}>Laptop</Text>
        <Text style={styles.optionDesc}>
          Complete laptop recommendations
        </Text>
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
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  optionDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default BuildTypeScreen;
