import { View, Animated, Pressable, Text } from 'react-native';
import { CollapsibleStickyHeaderOnlyRN } from 'react-native-header-components';
import { useRef, useState } from 'react';

export default function AppRN() {
  const animationScrollY = useRef(new Animated.Value(0)).current;
  // collapsibleHeaderHeight을 이용하여 FlatList의 paddingTop을 설정합니다!
  const [collapsibleHeaderHeight, setCollapsibleHeaderHeight] = useState(0);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animationScrollY } } }],
    {
      useNativeDriver: true,
    }
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'gray',
      }}
    >
      <CollapsibleStickyHeaderOnlyRN
        animationScrollY={animationScrollY}
        onHeaderHeightChange={setCollapsibleHeaderHeight} // Add this line
        CollapsibleHeader={
          <Pressable
            onPress={() => {
              console.log('collapsible Header');
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                width: '100%',
                backgroundColor: 'white',
              }}
            >
              <Text>Collapsible Header</Text>
            </View>
          </Pressable>
        }
        StickyHeader={
          <Pressable
            onPress={() => {
              console.log('sticky header');
            }}
          >
            <View
              style={{
                backgroundColor: 'yellow',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>Sticky Header</Text>
            </View>
          </Pressable>
        }
        CollapsibleToolBar={
          <Pressable
            onPress={() => {
              console.log('collapsible toolbar');
            }}
          >
            <View
              style={{
                zIndex: 1,
                backgroundColor: 'pink',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>Collapsible Toolbar</Text>
            </View>
          </Pressable>
        }
      />
      <Animated.FlatList
        data={new Array(100).fill(0)}
        style={{ overflow: 'visible' }}
        contentContainerStyle={{
          backgroundColor: 'gray',
          paddingTop: collapsibleHeaderHeight,
        }}
        onScroll={onScroll}
        renderItem={({ index }) => {
          type ColorIndex = 0 | 1 | 2;
          const colorIndex: ColorIndex = (index % 3) as ColorIndex;

          const colorMap = {
            '0': 'black',
            '1': 'green',
            '2': 'blue',
          };

          return (
            <Pressable onPress={() => console.log(index)}>
              <View
                style={{ height: 50, backgroundColor: colorMap[colorIndex] }}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}
