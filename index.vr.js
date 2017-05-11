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

export default class proto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateYValue: new Animated.Value(0),
    };
    this.rotateModel = this
      .rotateModel
      .bind(this);
  }
  
  rotateModel() {
    this.state.rotateYValue.setValue(0);     // Start large
    Animated.timing(                          // Base: spring, decay, timing
      this.state.rotateYValue,                 // Animate `bounceValue`
      {
        toValue: 360,                         // Animate to smaller size
        duration: 4000,
      }
    ).start(this.rotateModel);                                // Start the animation

  }
  componentDidMount() {
    this.rotateModel()
  }

  render() {
    return (
      <View>
        <Pano source={[asset('stars/right.png'), asset('stars/left.png'),
            asset('stars/top.png'), asset('stars/bottom.png'),
            asset('stars/front.png'), asset('stars/back.png')]}/>
          <PointLight />
            <View style={{
              transform : [
                {translate : [0,0,-70]},
                { scale : 1 }
              ],
              flexDirection: 'column',
              height: 1,
              padding: 0.2 }}>
              <Animated.View 
                style={{
                  transform : [
                    {rotateY: this.state.rotateYValue},
                    {translate : [0,0,0] },
                    { scale : 1 }
                  ] }}>
                <Model
                lit={true}
                style={{ transform : [{translate : [0,0,0]}, { scale : 1 }]}}
                texture={asset('space_frigate_6_color.png')}
                source={{
                  obj: asset('space_frigate_6.obj')
                }} />
              </Animated.View>
            </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('proto', () => proto);
