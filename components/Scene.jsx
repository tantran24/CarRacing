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
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";

import { Circuit } from "../models/Circuit";
import { VehicleContext, CheckPointContext} from "../context/Vehicles";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import {Sky, useTexture } from "@react-three/drei";

import { Track } from "./Track";
// import { Wall } from "./Wall";
// import { MountainEnvironment } from "./MountainEnvironment";

export function Scene() {
    const [thirdPerson, setThirdPerson] = useState(true);
    const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
    const [vehicleAPIs, setVehicleAPIs] = useState([]);

    const [chassisBodies, setChassisBodies] = useState([]);

    
    const [checkPoint, setCheckPoint] = useState(new THREE.Vector3());
    
    useEffect(() => {
        function keydownHandler(e) {
          if (e.key == "k") {
            setThirdPerson(!thirdPerson); 
            setCameraPosition([3, 5, 14 + Math.random() * 0.01]);
          }
        }
    
        window.addEventListener("keydown", keydownHandler);
        return () => window.removeEventListener("keydown", keydownHandler);
      }, [thirdPerson]);

    const addVehicleAPI = (api) => {
        setVehicleAPIs((prevAPIs) => [...prevAPIs, api]);
    };

    const addchassisBody = (body) => {
        setChassisBodies((prevBodies) => [...prevBodies, body]);
    };

    const skyTexture = useTexture("../src/assets/textures/sky.jpg")


    return (
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
            {thirdPerson ? null: <OrbitControls target={[3, -2, -1]} />}
            <CheckPointContext.Provider value={{checkPoint, setCheckPoint}}>

                <VehicleContext.Provider
                    value={{
                        vehicleAPIs,
                        addVehicleAPI,
                        chassisBodies,
                        addchassisBody,
                    }}
                >
                    {/* <Ground /> */}

                    <Sky material-uniforms-tex="value" args={[skyTexture]} /> 

                    <Circuit />
                    <Car2
                        thirdPerson={thirdPerson}
                        addVehicleAPI={addVehicleAPI}
                        addchassisBody={addchassisBody}
                        chassisBodies={chassisBodies}
                    />
                    <Box type="buff" position={[0, 0.05, -3]} />
                    <Box type="buff" position={[8, 0.05, -2]} />
                    <Box type="nerf" position={[7.16, 0.05, 2]} />
                    <Box type="buff" position={[0, 0.05, 5]} />
                    <Box type="nerf" position={[2.4, 0.05, 4]} />

                    <Box type="checkPoint" position={[1.8, 0.05, -1]} />
                    <Box type="checkPoint" position={[8.35, 0.05, -1]} />
                    <Box type="checkPoint" position={[3.5, 0.05, 7.9]} />


                    <Ramp position={[7, 0, 1.62]} scale={[0.5, 0.5, 0.5]} />
                </VehicleContext.Provider>
            </CheckPointContext.Provider>

        </Suspense>
    );
}
