import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "../components/useWheels";
import { useControls } from "../components/useControls";
import { WheelDebug } from "../components/WheelDebug";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Car2() {
    // let mesh = useGLTF("../src/assets/3D/car.glb");
    let mesh = useLoader(GLTFLoader, "../src/assets/3D/car.glb").scene;

    const position = [1.6, 2, 1.6];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;

    const chassisBodyArgs = [width, height, front * 2];
    const [chassisBody, chassisApi] = useBox(
        () => ({
            allowSleep: false,
            args: chassisBodyArgs,
            mass: 150,
            position,
        }),
        useRef(null)
    );

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

    const [vehicle, vehicleApi] = useRaycastVehicle(
        () => ({
            chassisBody,
            wheelInfos,
            wheels,
        }),
        useRef(null)
    );

    useControls(vehicleApi, chassisApi);

    useEffect(() => {
        if (!mesh) return;
        if (mesh.scale) {
            mesh.scale.set(0.0008, 0.0008, 0.0008);
        } else {
            console.log("ERR 1");
        }

        if (mesh.children && mesh.children[0]) {
            mesh.children[0].position.set(5, 5, 5);
        } else {
            console.log("ERR 2");
        }
    }, [mesh]);

    // group chassicBody & wheel to control => vehicle
    return (
        <group ref={vehicle}>
            <group ref={chassisBody} name="chassisBody">
                <primitive
                    object={mesh}
                    rotation-y={Math.PI}
                    position={[0, -0.09, 0]}
                />
            </group>

            <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        </group>
    );
}

{
    /* <mesh ref={chassisBody}>
                <meshBasicMaterial
                    transparent={true}
                    opacity={0.3}
                    color={"red"}
                />
                <boxGeometry args={chassisBodyArgs} />
            </mesh> */
}
