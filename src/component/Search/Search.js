import React from 'react';
import {TextInput, View, Image} from 'react-native';
import styles from './style';
import searchIcon from '../../assets/img/search.webp';

const SearchComponent = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={searchIcon} />
      <TextInput placeholder="Search" style={styles.formField} placeholderTextColor="#9D9D9F" />
    </View>
  );
};

export default SearchComponent;
