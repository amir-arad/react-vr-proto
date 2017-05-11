import React from 'react';
import {asset, Model, View} from 'react-vr';
import {SpaceFrigate6} from './space-frigate-6';
import {hsv} from 'color-convert';
import {GamepadController, LEFT_X} from "../services/gamepad-controller";

const HUE_LIMIT = 360;
const LIGHTNESS_LIMIT = 100;
const SATURATION = 100;
const CYCLE_IN_FRAMES = 5000;

function color([hue, lightness]){
	return hsv.rgb(hue, 100, lightness).join(' ');
}

function makeMaterial(name, m){
	return `
newmtl ${name}
Ns 96.078431
Ka 0.000000 0.000000 0.000000
Kd ${color(m[name].d)}
Ks ${color(m[name].s)}
Ni 1.000000
d 1.000000
illum 2
map_Bump space_frigate_6_bump.gif
map_Kd space_frigate_6_color.png
map_Ns space_frigate_6_specular.png
`;
}

function makeMaterialUrl(m){
	return `data:,${encodeURI(
		makeMaterial('Cabin', m) +
		makeMaterial('Wings', m) +
		makeMaterial('Hull', m))}`;
}

export class EditableShip extends React.Component {
	constructor() {
		super();
		this.gamepad = new GamepadController();
		this.gamepad.registerControllerEvents();
		this.state = {
			materials : {
				Hull: {d:[0,50], s:[60,100]},
				Cabin: {d:[230,50], s:[230,100]},
				Wings: {d:[230,50], s:[230,100]}
			},
			selectedPart : 'Hull'
		};
	}
	updateColors = () => {
		const gpPos = this.gamepad.getPosition(LEFT_X);
		let color = this.state.materials[this.state.selectedPart].d;
		let limit = HUE_LIMIT;
		if (gpPos !== 0){
			color[0] = (color[0] + gpPos * limit / CYCLE_IN_FRAMES) % limit;
			this.setState(this.state)
		}
		// check props, if some axis is not 0, update state accordingly
		requestAnimationFrame(this.updateColors)

	};
	componentDidMount() {
		requestAnimationFrame(this.updateColors)
	}
	render() {
		return <View style={this.props.style}>
			<SpaceFrigate6 materialUrl={makeMaterialUrl(this.state.materials)}/>
		</View>;
	}
}