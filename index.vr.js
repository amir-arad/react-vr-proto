import React from 'react';
import Button from './vr/components/button';
import Shawarma from './vr/components/shawarma';
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
      zoom: -70,
    };
  }

  render() {
    return (
      <View>
        <Pano
          source={[
            asset("stars/right.png"),
            asset("stars/left.png"),
            asset("stars/top.png"),
            asset("stars/bottom.png"),
            asset("stars/front.png"),
            asset("stars/back.png")
          ]}
        />
        <PointLight />
        <View style={{ transform: [ {translate: [-2,0,-4]}]}} >
          <Button
            text="+"
            callback={() => {
              console.log(this.state.zoom);
              this.setState(prevState => ({ zoom: prevState.zoom - 5 }));
              }}
          />

          <Button
            text="-"
            callback={() => {
              console.log(this.state.zoom);
              this.setState(prevState => ({ zoom: prevState.zoom + 5 }));
              }}
          />
        </View>
        <View style={{ transform: [ {translate: [0,0,this.state.zoom]}]}}>
          <Shawarma>
              <Model
                lit={true}
                texture={asset("space_frigate_6_color.png")}
                source={{
                  obj: asset("space_frigate_6.obj")
                }}
              />
          </Shawarma>
        </View>
      </View>
    );
  }
}


AppRegistry.registerComponent('proto', () => proto);
