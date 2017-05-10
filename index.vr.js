import React from 'react';
import {
	PointLight,
	Model,
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  NativeModules
} from 'react-vr';
import {ControllerState} from './components/controller-state';

export default class proto extends React.Component {
  render() {
    return (
      // <View onInput={event => console.log(event.nativeEvent.inputEvent)}>
      <View>
        <Pano source={[asset('stars/right.png'), asset('stars/left.png'),
            asset('stars/top.png'), asset('stars/bottom.png'),
            asset('stars/front.png'), asset('stars/back.png')]} />
        <PointLight />
        {/*<ControllerState/>*/}
        <Model
          lit={true}
          style={{ transform : [   {translate : [0,0,-10]}, { scale : 1 }]}}
          texture={asset('space_frigate_6_color.png')}
          source={{
            obj: asset('space_frigate_6.obj')
          }}
        />
      </View> 
    );
  }
};

AppRegistry.registerComponent('proto', () => proto);
