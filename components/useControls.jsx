import { useFrame } from "@react-three/fiber";
import { useEffect, useState, useContext } from "react";
import * as THREE from "three";
import { VehicleContext, CheckPointContext} from "../context/Vehicles";

export const useControls = (vehicleApi, chassisApi) => {
    let [controls, setControls] = useState({
        // w: boolean,
        // a: boolean,
        // s: boolean,
        // d: boolean,
        // r: boolean,
    });

    const {checkPoint, setCheckPoint} = useContext(CheckPointContext);
    // useFrame(()=>{
    //     console.log(checkPoint);
    // })

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
        if (controls.w) {
            console.log("forward");
            // vehicleApi.applyEngineForce(150, 2);
            // vehicleApi.applyEngineForce(150, 3);
            vehicleApi.applyEngineForce(40, 2);
            vehicleApi.applyEngineForce(40, 3);
        } else if (controls.s) {
            vehicleApi.applyEngineForce(-60, 2);
            vehicleApi.applyEngineForce(-60, 3);
        } else {
            vehicleApi.applyEngineForce(0, 2);
            vehicleApi.applyEngineForce(0, 3);
        }

        if (controls.a) {
            vehicleApi.setSteeringValue(0.05, 2);
            vehicleApi.setSteeringValue(0.05, 3);
            vehicleApi.setSteeringValue(-0.1, 0);
            vehicleApi.setSteeringValue(-0.1, 1);
        } else if (controls.d) {
            vehicleApi.setSteeringValue(-0.05, 2);
            vehicleApi.setSteeringValue(-0.05, 3);
            vehicleApi.setSteeringValue(0.1, 0);
            vehicleApi.setSteeringValue(0.1, 1);
        } else {
            for (let i = 0; i < 4; i++) {
                vehicleApi.setSteeringValue(0, i);
            }
        }
        if (controls.r) {
       
            let currentPosition = checkPoint;
            currentPosition.y += 0.015; 
            chassisApi.position.set(currentPosition.x, currentPosition.y, currentPosition.z);

            chassisApi.velocity.set(0, 0, 0);
            chassisApi.angularVelocity.set(0, 0, 0);
            chassisApi.rotation.set(0, -Math.PI, 0);
        }
        
        
    }, [controls, vehicleApi, chassisApi]);

    return controls;
};
