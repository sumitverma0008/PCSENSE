import React from 'react';
import {View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiService from '../services/ApiService';

const ComponentDetailsScreen = ({route}) => {
  const {component, type} = route.params;

  const openLink = url => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const retailers = [
    {key: 'amazon', name: 'Amazon', icon: 'shopping'},
    {key: 'flipkart', name: 'Flipkart', icon: 'shopping'},
    {key: 'reliance', name: 'Reliance Digital', icon: 'store'},
    {key: 'croma', name: 'Croma', icon: 'store'},
    {key: 'vijay', name: 'Vijay Sales', icon: 'store'},
    {key: 'mdcomputers', name: 'MD Computers', icon: 'desktop-tower'},
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.type}>{type?.toUpperCase()}</Text>
        <Text style={styles.name}>{component.name}</Text>
        <Text style={styles.price}>{ApiService.formatINR(component.price)}</Text>
      </View>

      {component.spec && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <Text style={styles.spec}>{component.spec}</Text>
        </View>
      )}

      {component.brand && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand</Text>
          <Text style={styles.value}>{component.brand}</Text>
        </View>
      )}

      {component.shopLinks && Object.keys(component.shopLinks).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buy From</Text>
          {retailers.map(retailer => {
            const link = component.shopLinks[retailer.key];
            if (!link) return null;

            return (
              <TouchableOpacity
                key={retailer.key}
                style={styles.retailerButton}
                onPress={() => openLink(link)}>
                <Icon name={retailer.icon} size={24} color="#667eea" />
                <Text style={styles.retailerName}>{retailer.name}</Text>
                <Icon name="open-in-new" size={20} color="#999" />
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {type === 'cpu' && component.cores && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cores:</Text>
            <Text style={styles.detailValue}>{component.cores}</Text>
          </View>
          {component.threads && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Threads:</Text>
              <Text style={styles.detailValue}>{component.threads}</Text>
            </View>
          )}
          {component.socket && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Socket:</Text>
              <Text style={styles.detailValue}>{component.socket}</Text>
            </View>
          )}
        </View>
      )}

      {type === 'gpu' && component.vram && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>VRAM:</Text>
            <Text style={styles.detailValue}>{component.vram}</Text>
          </View>
        </View>
      )}
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
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  type: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  spec: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  retailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  retailerName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginLeft: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
});

export default ComponentDetailsScreen;
