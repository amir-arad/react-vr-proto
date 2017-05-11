import React from 'react';
import Button from './vr/components/button';
import Shawarma from './vr/components/shawarma';
import {
	PointLight,
  Scene,
	Model,
	AppRegistry,
	asset,
	Box,
	Pano,
	Text,
	View,
  Animated
} from 'react-vr';
import {ListSelector} from './components/list-selector';
import {SpaceFrigate6} from './components/space-frigate-6';
import {ControllerState} from './components/controller-state';

const textStyle = {
	backgroundColor: '#777879',
	fontSize: 0.8,
	fontWeight: '400',
	layoutOrigin: [0.5, 0.5],
	paddingLeft: 0.2,
	paddingRight: 0.2,
	textAlign: 'center',
	textAlignVertical: 'center'
};

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
        <View style={{ width: 2,transform: [ {translate: [-3,0,-4]}]}} >
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
          <Shawarma style={{height:40}}>
						<SpaceFrigate6 />
          </Shawarma>
        </View>
				<View style={{flex: 1, flexDirection: 'row',  alignItems: 'center', transform: [{translate: [0, 0, -50]}]}}>
					<ListSelector
						style={{width:13, transform: [{translate: [60,0,0]}]}}

						selectedStyle={{transform: [{ scale : 1.5 }]}}
						normalStyle = {{transform: [{ scale : 1 }]}}>
						<Box
							style={{height:13}}
							dimWidth={10}
							dimDepth={10}
							dimHeight={10}
						/>
						<Box
							style={{height:13}}
							dimWidth={10}
							dimDepth={10}
							dimHeight={10}
						/>
						<Box
							style={{height:13}}
							dimWidth={10}
							dimDepth={10}
							dimHeight={10}
						/>
					</ListSelector>
				</View>
			</View>
		);
	}
};

AppRegistry.registerComponent('proto', () => proto);
