import React from 'react';
import {asset, Model, View} from 'react-vr';
import {SpaceFrigate6} from './space-frigate-6';

export class EditableShip extends React.Component {
	constructor() {
		super();
		this.state = {materials : {
			hull: {d:[1,0,1], s:[1,0,0]},
			tail: {d:[1,0,1], s:[1,0,0]}
		}};
	}

	render() {
		return <View style={this.props.style}>
			<SpaceFrigate6 materials={this.state.materials}/>
		</View>;
	}
}