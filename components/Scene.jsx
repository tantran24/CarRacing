import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import { Car } from "../models/Car";
import { Car2 } from "../models/Car2";
import { Ground } from "../components/Ground";
import { Box } from "./Box";
import { usePlane } from "@react-three/cannon";
import { ParisBis } from "../models/Paris-bis";
import { Ramp } from "../models/Ramp";

import { Circuit } from "../models/Circuit";
import { VehicleContext } from "../context/Vehicles";
import { useBox } from "@react-three/cannon";

import { Track } from "./Track";
// import { Wall } from "./Wall";
// import { MountainEnvironment } from "./MountainEnvironment";

export function Scene() {
    const [thirdPerson, setThirdPerson] = useState(true);
    const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
    const [vehicleAPIs, setVehicleAPIs] = useState([]);

    const [chassisBodies, setChassisBodies] = useState([]);

    const addVehicleAPI = (api) => {
        setVehicleAPIs((prevAPIs) => [...prevAPIs, api]);
    };

    const addchassisBody = (body) => {
        setChassisBodies((prevBodies) => [...prevBodies, body]);
    };

    return (
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
                {thirdPerson && <OrbitControls target={[0, 0, 0]} />}

                <VehicleContext.Provider value={{ vehicleAPIs, addVehicleAPI, chassisBodies, addchassisBody}}>
                    {/* <MountainEnvironment /> */}
                    <Ground />
                    {/* <ParisBis /> */}
                    <Circuit/>
                    {/* <Track position={[0, 0, 0]} scale={[1, 1, 1]} /> */}
                    {/* <Box position={[2.5, 0.08, 1]} /> */}
                    {/* <Wall position={[8, 0.5, 40]} size={[1, 1, 1]} /> */}
                    {/* <Car
                        speed={0.01}
                        angularVelocity={[0, 0.5, 0]}
                        modelPath="../src/assets/3D/vino/scene.gltf"
                    /> */}
                    <Car2 
                    thirdPerson={thirdPerson}
                    addVehicleAPI={addVehicleAPI} 
                    addchassisBody={addchassisBody}
                    chassisBodies={chassisBodies}              

                    />
                    <Box type="buff" position={[0, 0.05, -3]}/>
                    <Box type="buff" position={[8, 0.05, -2]}/>
                    <Box type="nerf" position={[7.16, 0.05, 2]}/>
                    <Box type="buff" position={[0, 0.05, 5]}/>
                    <Box type="nerf" position={[2.4, 0.05, 4]}/>
                    <Ramp position={[7, 0, 1.62]} scale={[0.5, 0.5, 0.5]}
                    />



                </VehicleContext.Provider>

            </Suspense>
    );
}