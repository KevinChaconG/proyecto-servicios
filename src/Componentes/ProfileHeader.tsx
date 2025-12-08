import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ProfileHeaderProps = {
  title: string;
  onEditProfile: () => void;
  onLogout: () => void;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  title,
  onEditProfile,
  onLogout,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <>
      <View style={styles.header}>

        <View style={styles.leftSection}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <TouchableOpacity
          style={styles.profileIconButton}
          onPress={toggleMenu}
        >
          <Ionicons name="person-circle-outline" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.profileMenu}>
          <TouchableOpacity
            style={styles.profileMenuItem}
            onPress={() => {
              setMenuVisible(false);
              onEditProfile();
            }}
          >
            <Text style={styles.profileMenuText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileMenuItem}
            onPress={() => {
              setMenuVisible(false);
              onLogout();
            }}
          >
            <Text style={[styles.profileMenuText, { color: 'red' }]}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileIconButton: {
    padding: 4,
  },
  profileMenu: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  profileMenuItem: {
    paddingVertical: 8,
  },
  profileMenuText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileHeader;
