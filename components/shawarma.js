import React from "react";
import { View, Animated} from "react-vr";


export default class Shawarma extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rotateYValue: new Animated.Value(0),
		};

	}
	rotateModel(){
		this.state.rotateYValue.setValue(this.state.rotateYValue.toJSON() % 360); // Start large
		this.animation = Animated.timing(
			// Base: spring, decay, timing
			this.state.rotateYValue, // Animate `bounceValue`
			{
				easing: (i)=>i,
				toValue: 360, // Animate to smaller size
				duration: 4000 * (360 - this.state.rotateYValue.toJSON()) / 360,
			}
		);
		this.animation.start(this.onAnimationEnd); // Start the animation
	};

	onAnimationEnd = (event) => {
		if (event && event.finished) {
			this.rotateModel();
		}
	};
	componentDidMount() {
		this.rotateModel();
	}

	render() {
		return (
            <View
                style={{
					transform: [{ translate: [0, 0, this.state.zoom] }, { scale: 1 }],
					flexDirection: "column",
					height: 1,
					padding: 0.2
				}}>
                <Animated.View
                    onEnter={()=>this.animation.stop()}
                    onExit={()=>this.rotateModel()}
                    style={{
						transform: [
							{ rotateY: this.state.rotateYValue },
							{ translate: [0, 0, 0] },
							{ scale: 1 }
						]
					}}>
					{this.props.children}
                </Animated.View>
            </View>
		);
	}
}