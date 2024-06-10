import { useCompoundBody } from "@react-three/cannon";
import { useRef } from "react";

// Define useWheels Hook
export const useWheels = (width, height, front, radius) => {
    // tham chieu vao 4 doi tuong 3D banh xe
    const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const wheelInfo = {
        radius,
        directionLocal: [0, -1, 0],
        axleLocal: [1, 0, 0],
        suspensionStiffness: 30,
        suspensionRestLength: 0.1,
        frictionSlip: 5,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        maxSuspensionTravel: 0.1,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true,
    };

    const wheelInfos = [
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [-width * 0.35, height * 0.4, front*0.5],
            isFrontWheel: true,
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [width * 0.35, height * 0.4, front*0.5],
            isFrontWheel: true,
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [-width * 0.35, height * 0.4, -front*0.5],
            isFrontWheel: false,
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [width * 0.35, height * 0.4, -front*0.5],
            isFrontWheel: false,
        },
    ];

    // this function define physic attribute of a wheel
    const propsFunc = () => ({
        collisionFilterGroup: 0,
        mass: 1,
        shapes: [
            {
                args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
                rotation: [0, 0, -Math.PI / 2],
                type: "Cylinder",
            },
        ],
        type: "Kinematic",
    });

    useCompoundBody(propsFunc, wheels[0]);
    useCompoundBody(propsFunc, wheels[1]);
    useCompoundBody(propsFunc, wheels[2]);
    useCompoundBody(propsFunc, wheels[3]);

    // return a list wheels and list wheelInfos
    return [wheels, wheelInfos];
};
