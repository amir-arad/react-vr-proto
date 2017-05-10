
import React from 'react';
import {
    PointLight,
    Model,
    AppRegistry,
    asset,
    StyleSheet,
    Pano,
    Text,
    View,
    NativeModules
} from 'react-vr';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const styles = StyleSheet.create({
    waiting: {
        backgroundColor: 'black',
        fontSize: 0.3,
        layoutOrigin: [0.5, 0.5],
        paddingLeft: 0.2,
        paddingRight: 0.2,
        textAlign: 'center',
        textAlignVertical: 'center',
        transform: [{ translate: [0, 0, -3] }],
    },
    controllers: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        transform: [{ translate: [0, 1, -5] }],
    },
});

class PressState extends React.Component {
    constructor() {
        super();
        this.state = { hasFocus: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.pressed !== this.props.pressed) {
            return true;
        }
        return nextState.hasFocus !== this.state.hasFocus;
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: this.state.hasFocus ? '#333333' : 'black',
                }}
                onEnter={() => this.setState({ hasFocus: true })}
                onExit={() => this.setState({ hasFocus: false })} >

                <View style={{ width: 0.5, height: 0.1 }}>
                    <Text style={{ fontSize: 0.08, textAlign: 'center' }}>
                        {this.props.id}
                    </Text>
                </View>
                <View
                    style={{
                        width: 0.1,
                        height: 0.1,
                        backgroundColor: this.props.pressed ? 'blue' : 'black',
                    }}
                />
            </View>
        );
    }
}

class SliderState extends React.Component {
    constructor() {
        super();
        this.state = { hasFocus: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value !== this.props.value) {
            return true;
        }
        return nextState.hasFocus !== this.state.hasFocus;
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: this.state.hasFocus ? '#333333' : 'black',
                }}
                onEnter={() => this.setState({ hasFocus: true })}
                onExit={() => this.setState({ hasFocus: false })}
            >
                <View style={{ width: 0.5, height: 0.1 }}>
                    <Text style={{ fontSize: 0.08, textAlign: 'center' }}>
                        {this.props.id}
                    </Text>
                </View>
                <View style={{ width: 0.4, height: 0.1 }}>
                    <View
                        style={{
                            width: 0.4 * (this.props.value + 1) / 2,
                            height: 0.1,
                            backgroundColor: 'yellow',
                        }}
                    />
                </View>
            </View>
        );
    }
}

export class ControllerState extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            controllers: null,
            buttons: [],
            axes: []
        };

        NativeModules.ControllerInfo.getControllers().then(controllers => {
            this.setState({
                controllers: controllers,
                buttons: [],
                axes: []
            });
        });

        RCTDeviceEventEmitter.addListener('controllerConnected', evt => {
            console.log('controller', evt);
            let added = false;
            const nextControllers = this.state.controllers.map(controller => {
                if (controller.index === evt.index) {
                    added = true;
                    return evt;
                } else {
                    return controller;
                }
            });
            if (!added) {
                nextControllers.push(evt);
            }
            this.setState({ controllers: nextController });
        });

        RCTDeviceEventEmitter.addListener('onReceivedInputEvent', evt => {
            if (evt.type !== 'GamepadInputEvent' || this.state.controllers[0].index !== evt.gamepad) {
                return;
            }
            if (evt.eventType === 'keydown') {
                const buttons = this.state.buttons.concat([]);
                buttons[evt.button] = true;
                this.setState({ buttons });
            } else if (evt.eventType === 'keyup') {
                const buttons = this.state.buttons.concat([]);
                buttons[evt.button] = false;
                this.setState({ buttons });
            } else if (evt.eventType === 'axismove') {
                const axes = this.state.axes.concat([]);
                axes[evt.axis] = evt.value;
                this.setState({ axes });
            }
        });
    }

    render() {
        const style = {
            flex: 1,
            flexDirection: 'column',
            marginLeft: 0.1,
            marginRight: 0.1,
        };

        const buttons = [];
        const axes = [];
        if (this.state.controllers) {
            for (let i = 0; i < this.state.controllers[0].buttons; i++) {
                buttons.push(
                    <PressState key={'btn' + i} id={'Btn ' + i} pressed={this.state.buttons[i] || false} />
                );
            }

            for (let i = 0; i < this.state.controllers[0].axes; i++) {
                axes.push(<SliderState key={'axis' + i} id={'Axis ' + i} value={this.state.axes[i] || 0} />);
            }
        }

        return (
            <View style={styles.controllers}>
                <View style={style}>
                    {buttons}
                    {axes}
                </View>
            </View>
        );
    }
}