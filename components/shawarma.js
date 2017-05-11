import React from "react";
import { View, Animated } from "react-vr";


export default class Shawarma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateYValue: new Animated.Value(0),
    };
    this.rotateModel = this.rotateModel.bind(this);
  }
  rotateModel() {
    this.state.rotateYValue.setValue(0); // Start large
    Animated.timing(
      // Base: spring, decay, timing
      this.state.rotateYValue, // Animate `bounceValue`
      {
        toValue: 360, // Animate to smaller size
        duration: 4000,
      }
    ).start(this.rotateModel); // Start the animation
  }

  componentDidMount() {
    this.rotateModel();
  }
  
  render() {
    return (
    <View
      style={{
        transform: [{ translate: [0, 0, this.state.zoom] }, { scale: 1 }],
        flexDirection: "column",
        height: 1,
        padding: 0.2
      }}>
      <Animated.View
        style={{
          transform: [
            { rotateY: this.state.rotateYValue },
            { translate: [0, 0, 0] },
            { scale: 1 }
          ]
        }}>
        {this.props.children}
      </Animated.View>
    </View>
    );
  }
}