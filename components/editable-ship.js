import React from 'react';
import {asset, Model, View} from 'react-vr';
import {SpaceFrigate6} from './space-frigate-6';

function makeMaterialUrl(materialState){
	const materialText = `
# Blender MTL File: 'None'
# Material Count: 2

newmtl tail
Ns 96.078431
Ka 0.000000 0.000000 0.000000
Kd 0.900000 0.200000 0.200000
Ks 0.200000 0.900000 0.900000
Ni 1.000000
d 1.000000
illum 2
# map_Bump space_frigate_6_bump.gif
# map_Kd space_frigate_6_color.png
# map_Ns space_frigate_6_specular.png

newmtl hull
Ns 96.078431
Ka 0.000000 0.000000 0.000000
Kd 0.001176 0.690196 0.690196
Ks 0.690196 0.8 0.001176
Ni 1.000000
d 1.000000
illum 2
# map_Bump space_frigate_6_bump.gif
# map_Kd space_frigate_6_color.png
# map_Ns space_frigate_6_specular.png
`;
	return `data:,${encodeURI(materialText)}`;
}

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
			<SpaceFrigate6 materialUrl={makeMaterialUrl(this.state.materials)}/>
		</View>;
	}
}