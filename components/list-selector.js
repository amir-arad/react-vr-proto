import React from 'react';
import {View} from 'react-vr';

export class ListSelector extends React.Component {
	constructor() {
		super();
		this.state = {selected : -1};
	}

	render() {
		return <View style={this.props.style}
					 onMove={() => {if (this.state.selected === i) this.setState({selected: -1});}}>
				{this.props.children.map((c, i)=> {
						return <View key={i}
									 style={this.state.selected === i ? this.props.selectedStyle : this.props.normalStyle}
									 onEnter={() => this.setState({selected: i})}
						>{c}</View>;
					}
				)}
		</View>;
	}
}