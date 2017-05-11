import React from 'react';
import {asset, Model, View} from 'react-vr';
import {SpaceFrigate6} from './space-frigate-6';
import {hsv} from 'color-convert';


function color([hue, lightness]){
	return hsv.rgb(hue, 100, lightness).join(' ');
}

function makeMaterialUrl(m){
	const materialText = `
newmtl tail
Ns 96.078431
Ka 0.000000 0.000000 0.000000
Kd ${color(m.tail.d)}
Ks ${color(m.tail.s)}
Ni 1.000000
d 1.000000
illum 2
map_Bump space_frigate_6_bump.gif
map_Kd space_frigate_6_color.png
map_Ns space_frigate_6_specular.png

newmtl hull
Ns 96.078431
Ka 0.000000 0.000000 0.000000
Kd ${color(m.hull.d)}
Ks ${color(m.hull.s)}
Ni 1.000000
d 1.000000
illum 2
map_Bump space_frigate_6_bump.gif
map_Kd space_frigate_6_color.png
map_Ns space_frigate_6_specular.png
`;
	return `data:,${encodeURI(materialText)}`;
}

export class EditableShip extends React.Component {
	constructor() {
		super();
		this.state = {materials : {
			hull: {d:[0,50], s:[60,100]},
			tail: {d:[230,50], s:[230,100]}
		}};
	}
	render() {
		return <View style={this.props.style}>
			<SpaceFrigate6 materialUrl={makeMaterialUrl(this.state.materials)}/>
		</View>;
	}
}