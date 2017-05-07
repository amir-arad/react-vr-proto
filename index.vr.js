import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class proto extends React.Component {
  render() {
    return (
      <View>
        <Pano source={[asset('starsRight.png'), asset('starsLeft.png'),
            asset('starsTop.png'), asset('starsBottom.png'),
            asset('starsFront.png'), asset('starsBack.png')]}/>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('proto', () => proto);
