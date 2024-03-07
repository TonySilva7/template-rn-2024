import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hello New Project</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
