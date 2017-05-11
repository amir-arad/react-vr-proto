import React from 'react';
import {
	PointLight,
  Scene,
	Model,
	AppRegistry,
	asset,
	Box,
	Pano,
	Text,
	View
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
	render() {
		const asset1 = asset('space-frigate-6/main.mtl');
		return (
			<View>
				{/*<Pano source={[asset('stars/right.png'), asset('stars/left.png'),*/}
					{/*asset('stars/top.png'), asset('stars/bottom.png'),*/}
					{/*asset('stars/front.png'), asset('stars/back.png')]}/>*/}
				<PointLight />
				<View style={{flex: 1, flexDirection: 'row',  alignItems: 'center', transform: [{translate: [0, 0, -50]}]}}>
					{/*<ControllerState></ControllerState>*/}
					<SpaceFrigate6 style={{transform: [{rotateY:150}]}}/>
					<ListSelector
						style={{width:13}}

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
