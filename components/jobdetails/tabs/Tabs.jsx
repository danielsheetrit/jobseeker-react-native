import { View, FlatList } from 'react-native';

import TabButton from './TabButton';
import styles from './tabs.style';
import { SIZES } from '../../../constants';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(tab) => tab}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
      />
    </View>
  );
};

export default Tabs;
