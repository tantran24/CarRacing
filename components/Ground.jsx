import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane } from "@react-three/cannon";

export function Ground(props) {
    const [ref] = usePlane(() => ({
        type: "Static", // Static type makes it immovable
        position: [0, 0, 0],
        rotation: [-Math.PI / 2, 0, 0], // Rotated to lie flat
        ...props,
    }));

    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial transparent={true} opacity={0.2} />
        </mesh>
    );
}
