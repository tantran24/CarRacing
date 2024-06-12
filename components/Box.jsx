import { VehicleContext, useVehicle, CheckPointContext, RoundNumContext } from "../context/Vehicles";
import { useRef, useContext, useEffect, useState } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";

export function Box({ type, ...props }) {
    const mesh = useRef();
    const { vehicleAPIs, addVehicleAPI, chassisBodies, addChassisBody } =
        useContext(VehicleContext);

    const {setCheckPoint}  = useContext(CheckPointContext);
    const {roundNum, setRoundNum}  = useContext(RoundNumContext);


    const [isRemoved, setIsRemoved] = useState(false);

    const buffTexture = useLoader(
        TextureLoader,
        "../src/assets/textures/buff.jpg"
    );
    const nerfTexture = useLoader(
        TextureLoader,
        "../src/assets/textures/nerf.jpg"
    );

    const checkPointTexture = useLoader(
        TextureLoader,
        "../src/assets/textures/checkPoint.jpg"
    );

    const destinationTexture = useLoader(
        TextureLoader,
        "../src/assets/textures/cup.jpg"
    );

    const initialPosition = useRef(null);

    useEffect(() => {
        if (mesh.current && initialPosition.current === null) {
            initialPosition.current = mesh.current.position.x;
        }
    }, [mesh.current]);

    useFrame(({ scene, camera }) => {
        if (mesh.current && !isRemoved) {
            const box = new THREE.Box3().setFromObject(mesh.current);
            let boxPosition = new THREE.Vector3();

            if (chassisBodies.length >= 1) {
                box.getCenter(boxPosition);

                const carBox = new THREE.Box3().setFromObject(
                    chassisBodies[0].current
                );

                if (box.intersectsBox(carBox)) {
                    
                    scene.remove(mesh.current);
                    setIsRemoved(true);
                    setTimeout(() => {
                        scene.add(mesh.current);
                        setIsRemoved(false);
                    }, 10000);

                    if (type === "buff") {
                        vehicleAPIs[0].applyEngineForce(400, 2);
                        vehicleAPIs[0].applyEngineForce(400, 3);
                    } else if (type === "nerf") {
                        vehicleAPIs[0].applyEngineForce(-4800, 2);
                        vehicleAPIs[0].applyEngineForce(-4800, 3);
                    }
                    else if(type === "checkPoint") {
                        setCheckPoint(boxPosition);
                    }
                    else if(type === "destination") {
                        setRoundNum(roundNum+1);
                    }
                                           
                }
            }
        }
    });
    useEffect(()=>{
        console.log(roundNum);
    }, [roundNum]);
    useFrame(({ clock }) => {
        if (mesh.current) {
            if (type === "nerf") {
                const time = clock.getElapsedTime();
                mesh.current.position.x =
                    initialPosition.current + Math.sin(time) / 5;
                // mesh.current.position.z += Math.cos(time)/325;
            }
            if (type === "buff" || type === "nerf")
                mesh.current.rotation.y += 0.03;
            else if(type === "checkPoint")
                mesh.current.rotation.y += 0.2;

        }
    });

    return (
        <mesh ref={mesh} {...props} castShadow receiveShadow>
            {type === "checkPoint" ? (
                <planeGeometry args={[0.5, 0.5]} />
            ) : type === "destination" ? (
                <planeGeometry args={[0.3, 0.3]} />
            ) : (
                <boxGeometry args={[0.1, 0.1, 0.1]} />
            )}
            <meshStandardMaterial
                map={
                    type === "buff"
                        ? buffTexture
                        : type === "nerf"
                        ? nerfTexture
                        : type === "checkPoint"
                        ? checkPointTexture
                        : type === "destination"
                        ? destinationTexture 
                        : null       
                }
                transparent={type === "checkPoint" || type === "destination"}
                opacity={type === "checkPoint" ? 0.5 : type === "destination" ? 0.2 : 1}
            />
        </mesh>
    );
};