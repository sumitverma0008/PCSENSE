import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiService from '../services/ApiService';

const ResultsScreen = ({navigation, route}) => {
  const {results, buildType, usage, budget} = route.params;

  if (buildType === 'laptop') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Recommended Laptops</Text>
        <Text style={styles.subtitle}>Top {results.length} picks for your needs</Text>

        {results.map((laptop, index) => (
          <TouchableOpacity
            key={laptop.id}
            style={styles.laptopCard}
            onPress={() =>
              navigation.navigate('ComponentDetails', {
                component: laptop,
                type: 'laptop',
              })
            }>
            <View style={styles.laptopHeader}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>#{index + 1}</Text>
              </View>
              <Text style={styles.laptopName}>{laptop.name}</Text>
            </View>
            <Text style={styles.laptopPrice}>{ApiService.formatINR(laptop.price)}</Text>
            <Text style={styles.laptopSpec}>{laptop.spec}</Text>
            <View style={styles.laptopDetails}>
              <View style={styles.detail}>
                <Icon name="laptop" size={16} color="#667eea" />
                <Text style={styles.detailText}>{laptop.type}</Text>
              </View>
              <View style={styles.detail}>
                <Icon name="star" size={16} color="#f39c12" />
                <Text style={styles.detailText}>Score: {laptop.score}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // Desktop build
  const build = results[0];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Custom PC Build</Text>
      <Text style={styles.subtitle}>
        Total: {ApiService.formatINR(build.totalPrice)}
      </Text>

      <View style={styles.componentsList}>
        {Object.entries(build).map(([key, component]) => {
          if (
            !component ||
            typeof component !== 'object' ||
            !component.name
          ) {
            return null;
          }

          const icons = {
            cpu: 'chip',
            gpu: 'expansion-card',
            motherboard: 'memory',
            ram: 'memory',
            storage: 'harddisk',
            psu: 'power-plug',
            case: 'desktop-tower',
          };

          return (
            <TouchableOpacity
              key={key}
              style={styles.componentCard}
              onPress={() =>
                navigation.navigate('ComponentDetails', {
                  component,
                  type: key,
                })
              }>
              <Icon name={icons[key]} size={30} color="#667eea" />
              <View style={styles.componentInfo}>
                <Text style={styles.componentType}>
                  {key.toUpperCase()}
                </Text>
                <Text style={styles.componentName}>{component.name}</Text>
                <Text style={styles.componentPrice}>
                  {ApiService.formatINR(component.price)}
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.newBuildButton}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="reload" size={20} color="#fff" />
        <Text style={styles.newBuildText}>Build Another PC</Text>
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
    marginBottom: 20,
  },
  laptopCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
  },
  laptopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  laptopName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  laptopPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 8,
  },
  laptopSpec: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  laptopDetails: {
    flexDirection: 'row',
    gap: 15,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    textTransform: 'capitalize',
  },
  componentsList: {
    marginBottom: 20,
  },
  componentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  componentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  componentType: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: 'bold',
  },
  componentName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginTop: 2,
  },
  componentPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  newBuildButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  newBuildText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ResultsScreen;
