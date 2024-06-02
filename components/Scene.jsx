import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Car } from "../models/Car";
import { Car2 } from "../models/Car2";
import { Ground } from "../components/Ground";
import { Box } from "./Box";
import { usePlane } from "@react-three/cannon";
import { ParisBis } from "../models/Paris-bis";

export function Scene() {
    const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

    return (
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
            <OrbitControls target={[0, 0, 0]} />
            <Ground />
            <ParisBis />
            {/* <Box position={[2, 0, 2]} /> */}
            {/* <Car
                speed={0.01}
                angularVelocity={[0, 0.5, 0]}
                modelPath="../src/assets/3D/vino/scene.gltf"
            /> */}
            <Car2 />
        </Suspense>
    );
}
