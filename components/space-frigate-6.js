import React from 'react';
import {asset, Model, View} from 'react-vr';

export class SpaceFrigate6 extends React.Component {

	render() {
		const materialAsset = asset('space-frigate-6/main.mtl');
		debugger;
		return <View style={this.props.style}>
			<View style={{height:20, width:40}}>
				<Model
					style={{transform: [{ scale : 100 }]}}
					lit={true}
					source={{
						obj: asset('space-frigate-6/1.obj'),
						mtl: materialAsset
					}}
				/>
				<Model
					style={{transform: [{ scale : 100 }]}}
					lit={true}
					source={{
						obj: asset('space-frigate-6/2.obj'),
						mtl: materialAsset
					}}
				/>
			</View>
		</View>;
	}
}