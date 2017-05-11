import React from 'react';
import Button from './components/button';
import Shawarma from './components/shawarma';
import {
	PointLight,
	AppRegistry,
	asset,
	Box,
	Pano,
	View
} from 'react-vr';
import {ListSelector} from './components/list-selector';
import {EditableShip} from './components/editable-ship';


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
            //  console.log(this.state.zoom);
              this.setState(prevState => ({ zoom: prevState.zoom - 5 }));
              }}
          />

          <Button
            text="-"
            callback={() => {
            //  console.log(this.state.zoom);
              this.setState(prevState => ({ zoom: prevState.zoom + 5 }));
              }}
          />
        </View>
        <View style={{ transform: [ {translate: [0,0,this.state.zoom]}]}}>
          <Shawarma style={{height:40}}>
						<EditableShip />
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
