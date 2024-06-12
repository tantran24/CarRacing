import React, { useRef, useEffect, useLayoutEffect } from "react";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";


export function Car({ speed, modelPath }) {
    const car = useGLTF(modelPath);
    const bbox = new THREE.Box3().setFromObject(car.scene);
    const size = bbox.getSize(new THREE.Vector3());
    const chassisBodyArgs = [size.x, size.y, size.z];
    const position = [0.5, 3, 0.5];
    const rotation = [0, -Math.PI / 2, 0];

    const [chassisRef, api] = useBox(() => ({
        allowSleep: false,
        mass: 150,
        position: position,
        rotation: rotation,
        args: chassisBodyArgs,
    }));

    return (
        <mesh ref={chassisRef}>
            {/* <PerspectiveCamera ref={camera} fov={75} position={[0, 1, 1]} makeDefault></PerspectiveCamera> */}
            <primitive object={car.scene} scale={0.05} />
        </mesh>
    );
}
