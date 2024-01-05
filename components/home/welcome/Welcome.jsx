import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { COLORS, icons, images, SIZES } from '../../../constants';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import styles from './welcome.style';

const jobTypes = ["Full Time", "Part Time","Remote","Internship", "Contractor","Freelance", "Volunteer", "Scholarships" ];

const Welcome = ({searchTerm,setSearchTerm, handleClick}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full Time");

  const handleJobTypeSelection = (selectedJobType) => {
    setActiveJobType(selectedJobType);
    router.push(`/search/${selectedJobType}`);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.userName}>Welcome, Michael</Text>
        <Text style={styles.welcomeMessage}>Put your skills to work! </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput}
          placeholder={"What's you area of expertise? "} 
          value={searchTerm}
          onChangeText={(text) => setSearchTerm (text)
          }
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image source={icons.search} style={{
            ...styles.searchIcon,
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }} />
        </TouchableOpacity>

      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes} // Fixed the variable name to 'jobTypes'
          renderItem={({item}) => (
            <TouchableOpacity style={styles.tab(activeJobType, item)} onPress={() => {
              setActiveJobType(item);
              router.push(`/search/${item}`);            }}>
              <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        ></FlatList>
      </View>
      
      
          </>
  );

};

export default Welcome;
