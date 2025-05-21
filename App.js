import { StatusBar, View } from 'react-native';
import { styles } from './AppStyles';
import Home from './src/Pages/Home/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home />
    </View>
  );
}
