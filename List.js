import React from 'react';
import {
    Animated,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      {name: 'Sumit', Age: 22},
      {name: 'Amit', Age: 24},
      {name: 'Deven', Age: 22},
    ];

    this.index = 0;
  }

  renderItem = ({item, index}) => {
    const marginLeft = index === 0 ? 24 : 4;
    const marginRight = index === this.data.length - 1 ? 24 : 4;

    return (
      <Animated.View
        style={{
          width: windowWidth - 48,
          height: windowHeight * 0.5,
          backgroundColor: 'blue',
          marginLeft,
          marginRight,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
          {item.name}
        </Text>
      </Animated.View>
    );
  };

  isLegitIndex(index, length) {
    if (index < 0 || index >= length) return false;
    return true;
  }

  pagination = (velocity) => {
    let nextIndex;
    if (Platform.OS == 'ios')
      nextIndex = velocity > 0 ? this.index + 1 : this.index - 1;
    else nextIndex = velocity < 0 ? this.index + 1 : this.index - 1;
    if (this.isLegitIndex(nextIndex, this.data.length)) {
      this.index = nextIndex;
    }
    this.flatlist.scrollToIndex({
      index: this.index,
      animated: true,
    });
  };

  _onScrollEndDrag = ({nativeEvent}) => {
    this.pagination(nativeEvent.velocity.x);
  };

  getItemLayout = (data, index) => ({
    length: windowWidth - 48,
    offset: (windowWidth - 40) * index,
    index,
  });

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.lighter,
          justifyContent: 'flex-end',
        }}>
        <FlatList
          //   pagingEnabled
          ref={(ref) => (this.flatlist = ref)}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.data}
          onScrollEndDrag={this._onScrollEndDrag}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={this.renderItem}
          style={{position: 'absolute', bottom: 0, left: 0, marginBottom: 8}}
          getItemLayout={this.getItemLayout}
          itemWidth={windowWidth - 40}
        />
      </View>
    );
  }
}

export default List;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
