import {NativeModules} from 'react-vr';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');


export const LEFT_X = 0;
export const LEFT_Y = 1;
export const RIGHT_X = 2;
export const RIGHT_Y = 3;

export class GamepadController {
    controllers;
    buttons = [];
    axes = {
        0: 0,
        1: 0,
        2: 0,
        3: 0
    };
    listeners = {
        0: [],
        1: [],
        2: [],
        3: []
    };

    // listenToAxes(axisId, cb) {
    //     const cbExists = this.listeners[axisId].some((callback) => callback === cb);
    //     if (!cbExists) {
    //         this.listeners[axisId].push(cb);
    //     }
    // }

    // removeAxesListener(axisId, cb) {
    //     const indexToRemove = this.listeners[axisId].findIndex((callback) => callback === cb);
    //     this.listeners[axisId].splice(indexToRemove, 1);
    // }

    registerControllerEvents() {
        RCTDeviceEventEmitter.addListener('controllerConnected', evt => {
            console.log('controller', evt);
            let added = false;
            const nextControllers = this.controllers.map(controller => {
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
            this.controllers = nextController;
        });

        RCTDeviceEventEmitter.addListener('onReceivedInputEvent', evt => {
            if (!this.controllers) {
                NativeModules.ControllerInfo.getControllers().then(controllers => {
                    this.controllers = controllers;
                    this.routeEvent(evt);
                });
            } else {
                this.routeEvent(evt);
            }
        });
    }

    routeEvent(evt) {
        if (evt.type !== 'GamepadInputEvent' || this.controllers[0].index !== evt.gamepad) {
            return;
        }

        if (evt.eventType === 'axismove') {
            this.handleAxisEvent(evt);

        } else if (evt.eventType === 'keydown' || evt.eventType === 'keyup') {
            this.handlePressEvent(evt, true);
        } else if (evt.eventType === 'keyup') {
            this.handlePressEvent(evt, false);
        }
    }

    handleAxisEvent(evt) {
        this.axes[evt.axis] = evt.value;
      //  if (evt.axis === 1) console.log(this.axes[evt.axis], evt);
    }

    handlePressEvent(evt, isPressed) {
        this.buttons[evt.button] = true;
    }

	getPosition(axis){
		return this.axes[axis];
    }
}

