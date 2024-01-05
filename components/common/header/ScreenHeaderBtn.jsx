import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => (
  <TouchableOpacity onPress={handlePress}>
    <Image
      source={iconUrl}
      style={{
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
      }}
    />
  </TouchableOpacity>
);

export default ScreenHeaderBtn;