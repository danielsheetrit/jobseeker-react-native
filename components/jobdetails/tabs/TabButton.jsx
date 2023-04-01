import { Text, TouchableOpacity } from 'react-native';
import styles from './tabs.style';

const TabButton = ({ name, activeTab, onHandleSearchType }) => {
  return (
    <TouchableOpacity
      onPress={onHandleSearchType}
      style={styles.btn(name, activeTab)}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
};

export default TabButton;
