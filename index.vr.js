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
  Animated,
} from 'react-vr';

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }
  render() {
    return (
      <Animated.Image                         // Base: Image, Text, View
        source={
          asset('starsFront.png')
        }
        style={{
          flex: 1,
          width: 1,
          height: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
      />
    );
  }
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }
}

export default class proto extends React.Component {
  render() {
    return (
      <View>
        <Pano 
          source={[
            asset('starsRight.png'),
            asset('starsLeft.png'),
            asset('starsTop.png'),
            asset('starsBottom.png'),
            asset('starsFront.png'),
            asset('starsBack.png')
          ]}
        />
        <PointLight />
        <Model
            lit={true}
            style={{ transform : [   {translate : [0,0,-100]}, { scale : 1 }]}}
            texture={
              asset('space_frigate_6_color.png')
            }
            source={{
              obj: asset('space_frigate_6.obj')
            }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('Playground', () => Playground);
