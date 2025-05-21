import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SegmentedControl } from '../../../Components/SegmentedControl';
import DrawerFilters from './Drawer/DrawerFilters';

const HeaderHome = ({ visualization, setVisualization }) => {
  return (
    <View style={styles.container}>
      <SegmentedControl
        options={['Visão Mapa', 'Visão Feed']}
        selectedOption={visualization}
        onOptionPress={setVisualization}
      />

      <DrawerFilters />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 0,
    top: 30,
    left: 0,
  },
});

export default HeaderHome;
