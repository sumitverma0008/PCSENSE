import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UsageProfileScreen = ({navigation, route}) => {
  const {buildType} = route.params;
  const [selected, setSelected] = useState(null);

  const profiles = [
    {
      id: 'gaming',
      icon: 'gamepad-variant',
      title: 'Gaming',
      desc: 'High FPS, AAA games, competitive gaming',
      color: '#e74c3c',
    },
    {
      id: 'content',
      icon: 'video',
      title: 'Content Creation',
      desc: 'Video editing, 3D rendering, streaming',
      color: '#9b59b6',
    },
    {
      id: 'coding',
      icon: 'code-braces',
      title: 'Programming',
      desc: 'Development, IDEs, multiple VMs',
      color: '#3498db',
    },
    {
      id: 'office',
      icon: 'briefcase',
      title: 'Office Work',
      desc: 'Documents, spreadsheets, browsing',
      color: '#2ecc71',
    },
    {
      id: 'student',
      icon: 'school',
      title: 'Student',
      desc: 'Learning, research, general use',
      color: '#f39c12',
    },
  ];

  const handleNext = () => {
    if (selected) {
      navigation.navigate('Budget', {buildType, usage: selected});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Usage</Text>
      <Text style={styles.subtitle}>
        Choose the primary use case for your {buildType}
      </Text>

      <ScrollView style={styles.profilesList}>
        {profiles.map(profile => (
          <TouchableOpacity
            key={profile.id}
            style={[
              styles.profileCard,
              selected === profile.id && styles.selectedCard,
              {borderLeftColor: profile.color},
            ]}
            onPress={() => setSelected(profile.id)}>
            <Icon name={profile.icon} size={40} color={profile.color} />
            <View style={styles.profileText}>
              <Text style={styles.profileTitle}>{profile.title}</Text>
              <Text style={styles.profileDesc}>{profile.desc}</Text>
            </View>
            {selected === profile.id && (
              <Icon name="check-circle" size={24} color={profile.color} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.nextButton, !selected && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selected}>
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
    marginBottom: 20,
  },
  profilesList: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    borderLeftWidth: 4,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#667eea',
  },
  profileText: {
    flex: 1,
    marginLeft: 15,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  nextButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UsageProfileScreen;
