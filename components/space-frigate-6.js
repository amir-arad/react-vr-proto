import React from 'react';
import {asset, Model, View} from 'react-vr';

export class SpaceFrigate6 extends React.Component {

	render() {
		const materialAsset =  {uri:this.props.materialUrl};
		// debugger;
		return <View style={this.props.style}>
			<View style={{height:20, width:40, transform: [{ translate:[0,-20,0] }]}}>
				<Model
					style={{transform: [{ scale : 100 }]}}
					lit={true}
					source={{
						obj: asset('space-frigate-6/hull.obj'),
						mtl: materialAsset
					}}
				/>
				<Model
					style={{transform: [{ scale : 100 }]}}
					lit={true}
					source={{
						obj: asset('space-frigate-6/wings.obj'),
						mtl: materialAsset
					}}
				/>
				<Model
					style={{transform: [{ scale : 100 }]}}
					lit={true}
					source={{
						obj: asset('space-frigate-6/cabin.obj'),
						mtl: materialAsset
					}}
				/>
			</View>
		</View>;
	}
}