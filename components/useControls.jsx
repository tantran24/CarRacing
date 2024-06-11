import { useEffect, useState } from "react";
import * as THREE from "three";

export const useControls = (vehicleApi, chassisApi, chassisBody) => {
    let [controls, setControls] = useState({
        // w: boolean,
        // a: boolean,
        // s: boolean,
        // d: boolean,
        // r: boolean,
    });
    const [chassisPosition, setChassisPosition] = useState([0, 0, 0]);

    useEffect(() => {
        const keyDownPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: true,
            }));
        };

        const keyUpPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: false,
            }));
        };

        window.addEventListener("keydown", keyDownPressHandler);
        window.addEventListener("keyup", keyUpPressHandler);
        return () => {
            window.removeEventListener("keydown", keyDownPressHandler);
            window.removeEventListener("keyup", keyUpPressHandler);
        };
    }, []);

    useEffect(() => {
        setChassisPosition(chassisBody.current.position);

        if (controls.w) {
            console.log("forward");
            // vehicleApi.applyEngineForce(150, 2);
            // vehicleApi.applyEngineForce(150, 3);
            vehicleApi.applyEngineForce(60, 2);
            vehicleApi.applyEngineForce(60, 3);
        } else if (controls.s) {
            vehicleApi.applyEngineForce(-80, 2);
            vehicleApi.applyEngineForce(-80, 3);
        } else {
            vehicleApi.applyEngineForce(0, 2);
            vehicleApi.applyEngineForce(0, 3);
        }

        if (controls.a) {
            vehicleApi.setSteeringValue(0.03, 2);
            vehicleApi.setSteeringValue(0.03, 3);
            vehicleApi.setSteeringValue(-0.1, 0);
            vehicleApi.setSteeringValue(-0.1, 1);
        } else if (controls.d) {
            vehicleApi.setSteeringValue(-0.03, 2);
            vehicleApi.setSteeringValue(-0.03, 3);
            vehicleApi.setSteeringValue(0.1, 0);
            vehicleApi.setSteeringValue(0.1, 1);
        } else {
            for (let i = 0; i < 4; i++) {
                vehicleApi.setSteeringValue(0, i);
            }
        }
        if (controls.r) {
            let currentPosition = chassisPosition;
        
            currentPosition.y += 1;
        
            chassisApi.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
        
            chassisApi.velocity.set(0, 0, 0);
            chassisApi.angularVelocity.set(0, 0, 0);
            chassisApi.rotation.set(0, 0, 0);
        }
        
        
    }, [controls, vehicleApi, chassisApi, chassisBody]);

    return controls;
};
