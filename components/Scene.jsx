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
import { Circuit } from "../models/Circuit";

import { Track } from "./Track";
import { Ramp } from "./Ramp";
// import { Wall } from "./Wall";
// import { MountainEnvironment } from "./MountainEnvironment";

export function Scene() {
    const [thirdPerson, setThirdPerson] = useState(true);
    const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

    //Advanced Sử dụng NavMesh (Lưới điều hướng)
    return (
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
            {thirdPerson && <OrbitControls target={[0, 0, 0]} />}

            {/* <MountainEnvironment /> */}
            <Ground />
            {/* <ParisBis /> */}
            <Circuit />
            {/* <Track position={[0, 0, 0]} scale={[1, 1, 1]} /> */}
            <Box position={[2, 0.5, -2]} />
            {/* <Box position={[2.5, 0.5, 1]} /> */}
            {/* <Box position={[7, 0.5, 40]} /> */}
            {/* <Wall position={[8, 0.5, 40]} size={[1, 1, 1]} /> */}
            {/* <Car
                speed={0.01}
                angularVelocity={[0, 0.5, 0]}
                modelPath="../src/assets/3D/vino/scene.gltf"
            /> */}
            <Ramp />
            <Car2 thirdPerson={thirdPerson} />
        </Suspense>
    );
}
