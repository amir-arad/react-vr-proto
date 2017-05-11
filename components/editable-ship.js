import React from 'react';
import {asset, Model, View} from 'react-vr';
import {SpaceFrigate6} from './space-frigate-6';
import {hsl} from 'color-convert';
import {GamepadController, LEFT_X, LEFT_Y, RIGHT_X, RIGHT_Y} from "../services/gamepad-controller";
import {throttle} from 'lodash';

const HUE_LIMIT = 360;
const LIGHTNESS_LIMIT = 100;
const SATURATION = 100;
const CYCLE_IN_FRAMES = 100;
const EPSILON = 0.4;

function color([hue, lightness]){
	console.log('lightness', lightness);
	return hsl.rgb(hue, 100, lightness).map(c => (c / 255).toPrecision(3)).join(' ');
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
		requestAnimationFrame(this.updateColors);
		this.updateColor(this.gamepad.getPosition(LEFT_X), this.state.materials.Hull.d, 0, HUE_LIMIT);
		this.updateColor(this.gamepad.getPosition(LEFT_Y), this.state.materials.Hull.d, 1, LIGHTNESS_LIMIT);
		this.updateColor(this.gamepad.getPosition(RIGHT_X), this.state.materials.Hull.s, 0, HUE_LIMIT);
		this.updateColor(this.gamepad.getPosition(RIGHT_Y), this.state.materials.Hull.s, 1, LIGHTNESS_LIMIT);
	};

	updateColor(gpPos, color, colotId, limit) {
		if (gpPos > EPSILON || gpPos < -EPSILON) {
			console.log('gpPos', gpPos);
			color[colotId] = (limit + color[colotId] + gpPos * limit / CYCLE_IN_FRAMES) % limit;
			this.update();
		}
	}

	update = throttle (()=>{
		this.setState(this.state);
	}, 1000);

	componentDidMount() {
		requestAnimationFrame(this.updateColors)
	}
	render() {
		return <View style={this.props.style}>
			<SpaceFrigate6 materialUrl={makeMaterialUrl(this.state.materials)}/>
		</View>;
	}
}