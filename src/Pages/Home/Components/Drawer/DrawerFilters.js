import React, { useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import BottomDrawer from '../../../../Components/Drawer/BottomDrawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../../../../Components/IconButton/IconButton';
import Divider from '../../../../Components/Divider/Divider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import theme from '../../../../../theme';

const filters = [
  {
    title: 'Tipo de evento:',
    filters: [
      { name: 'Festa 🎉', value: 'festa' },
      { name: 'Show 🎤', value: 'show' },
      { name: 'Teatro 🎭', value: 'teatro' },
      { name: 'Balada 🪩', value: 'balada' },
      { name: 'Esporte ⚽', value: 'esporte' },
    ],
  },
  {
    title: 'Horário:',
    filters: [
      { name: 'Manhã', value: 'manha' },
      { name: 'Tarde', value: 'tarde' },
      { name: 'Noite', value: 'noite' },
    ],
  },
  {
    title: 'Localização:',
    filters: [
      { name: 'Até 500 metros', value: '500' },
      { name: '1-3 km', value: '1-3' },
      { name: '3-5 km', value: '3-5' },
      { name: '5-10 km', value: '5-10' },
      { name: 'Mais de 10km', value: '10' },
    ],
  },
  {
    title: 'Bebidas:',
    filters: [
      { name: 'Open Bar', value: 'openBar' },
      { name: 'Venda de Bebidas', value: 'vendaBebidas' },
    ],
  },
  {
    title: 'Comida:',
    filters: [
      { name: 'Food Trucks', value: 'foodTrucks' },
      { name: 'Restaurante', value: 'restaurante' },
      { name: 'Lanchonete', value: 'lanchonete' },
      { name: 'Vegano', value: 'vegano' },
      { name: 'Vegetariano', value: 'vegetariano' },
    ],
  },
  {
    title: 'Tipo de música:',
    filters: [
      { name: 'Eletrônica 🔊', value: 'eletronica' },
      { name: 'Rock 🎸', value: 'rock' },
      { name: 'Sertanejo 🪗', value: 'sertanejo' },
      { name: 'Funk 😎', value: 'funk' },
      { name: 'Pop 🎙️', value: 'pop' },
    ],
  },
];

const { height: screenHeight } = Dimensions.get('screen');

const DrawerFilters = () => {
  const drawerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  console.log('🚀 - DrawerFilters - selectedFilters:', selectedFilters);

  const handleToggleDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.toggleDrawer();
    }
  };

  const handleSelectFilter = (filterValue) => {
    setSelectedFilters((prev) =>
      prev.includes(filterValue)
        ? prev.filter((item) => item !== filterValue)
        : [...prev, filterValue],
    );
  };

  return (
    <>
      <IconButton
        style={{
          backgroundColor: expanded
            ? theme.colors.primary.main
            : theme.colors.white,
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
        icon="filter-list"
        size={30}
        color={expanded ? theme.colors.white : theme.colors.text}
        onPress={handleToggleDrawer}
      />
      <BottomDrawer
        ref={drawerRef}
        title="Filtros"
        style={{ position: 'absolute', zIndex: 99, elevation: 99 }}
        expandedHeight={screenHeight * 1.9}
        retractHeight={screenHeight * 1.03}
        expanded={expanded}
        setExpanded={setExpanded}
        closeIcon={
          <MaterialIcons name={'close'} size={16} color={theme.colors.black} />
        }
      >
        <ScrollView
          contentContainerStyle={{ rowGap: 16 }}
          style={styles.drawerContent}
        >
          {filters.map((filter, index) => (
            <React.Fragment key={index}>
              <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
                <Text style={styles.titleFilters}>{filter.title}</Text>
                <View style={styles.containerFilters}>
                  {filter.filters.map((item, i) => {
                    const isSelected = selectedFilters.includes(item.value);
                    return (
                      <AnimatedChip
                        key={`filter-${item.value}${i}`}
                        isSelected={isSelected}
                        onPress={() => handleSelectFilter(item.value)}
                        label={item.name}
                      />
                    );
                  })}
                </View>
              </View>
              <Divider />
            </React.Fragment>
          ))}
        </ScrollView>
      </BottomDrawer>
    </>
  );
};

const AnimatedChip = ({ isSelected, onPress, label }) => {
  const scale = useSharedValue(1);
  const borderColor = useSharedValue(
    isSelected ? theme.colors.secondary.main : theme.colors.border,
  );
  const textColor = useSharedValue(
    isSelected ? theme.colors.white : theme.colors.text,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value, { duration: 150 }) }],
    borderColor: withTiming(borderColor.value, { duration: 150 }),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(textColor.value, { duration: 150 }),
  }));

  const handlePress = () => {
    scale.value = 1.1;
    borderColor.value = isSelected
      ? theme.colors.border
      : theme.colors.secondary.main;

    setTimeout(() => {
      scale.value = 1;
    }, 150);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.chipFilter, animatedStyle]}>
        <Animated.Text style={[styles.chipText, textStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 24,
  },
  containerFilters: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  titleFilters: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chipFilter: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
  },
  chipText: {
    fontSize: 12,
  },
});

export default DrawerFilters;
