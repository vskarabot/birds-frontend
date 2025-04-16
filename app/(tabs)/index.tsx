import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import BirdList from '@/components/BirdList';

export default function Index() {
  return (    
    <View style={styles.container}>
      <BirdList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})