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
} from 'react-vr';

export default class proto extends React.Component {
  render() {
    return (
      <View>
        <Pano source={[asset('stars/right.png'), asset('stars/left.png'),
            asset('stars/top.png'), asset('stars/bottom.png'),
            asset('stars/front.png'), asset('stars/back.png')]}/>
          <PointLight />
          <Model
              lit={true}
              style={{ transform : [   {translate : [0,0,-100]}, { scale : 1 }]}}
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
