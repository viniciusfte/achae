import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import BottomDrawer from '../../../../Components/Drawer/BottomDrawer';
import Place from '../Place';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../../../theme';

const DrawerPlaces = ({ events = [] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BottomDrawer
      title="Eventos"
      expanded={expanded}
      setExpanded={setExpanded}
      closeIcon={
        <MaterialIcons
          style={styles.expandButtonText}
          name={expanded ? 'unfold-less' : 'unfold-more'}
          size={16}
          color={theme.colors.primary.main}
        />
      }
    >
      <ScrollView
        contentContainerStyle={{ rowGap: 16 }}
        style={styles.drawerContent}
      >
        {events.map((place, index) => (
          <Place key={index} place={place} />
        ))}
      </ScrollView>
    </BottomDrawer>
  );
};

const styles = StyleSheet.create({
  expandButtonText: {
    transform: [{ rotate: '45deg' }],
  },
  drawerContent: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 24,
  },
});

export default DrawerPlaces;
