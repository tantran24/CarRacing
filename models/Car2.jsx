import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "../components/useWheels";
import { useControls } from "../components/useControls";
import { WheelDebug } from "../components/WheelDebug";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { BoxGeometry, MeshStandardMaterial, Mesh } from "three";

export function Car2({
    thirdPerson,
    addVehicleAPI,
    addchassisBody,
    chassisBodies,
}) {
    let mesh = useLoader(GLTFLoader, "../src/assets/3D/car.glb").scene;
    mesh.scale.set(0.0003, 0.0003, 0.0003);
    mesh.position.set(0.11, 0, 0.02);

    // shadow
    mesh.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const position = [0, 0, 0];

    let box = new THREE.Box3().setFromObject(mesh);
    let size = box.getSize(new THREE.Vector3());
    let center = box.getCenter(new THREE.Vector3());
    const width = size.x;
    const height = size.y;
    const front = size.z;
    const wheelRadius = 0.25 * 0.02;

    const chassisBodyArgs = [width, height/6, front*1.5 ];

    const [chassisBody, chassisApi] = useBox(
        () => ({
            allowSleep: false,
            args: chassisBodyArgs,
            mass: 100,
        }),
        useRef(null)
    );

    const [wheels, wheelInfos] = useWheels(
        width *2 ,
        height,
        front,
        wheelRadius
    );

    const [vehicle, vehicleApi] = useRaycastVehicle(
        () => ({
            chassisBody,
            wheelInfos,
            wheels,
        }),
        useRef(null)
    );

    useEffect(() => {
        addVehicleAPI(vehicleApi);
    }, [vehicleApi]);

    useEffect(() => {
        addchassisBody(chassisBody);
    }, [chassisBody]);

    //   useFrame(()=>{
    //         if(chassisBodies.length>=1)
    //             { let position = new THREE.Vector3();
    //                 position.setFromMatrixPosition(chassisBodies[0].current.matrixWorld);
    //                 console.log("EEE",position);

    //             }
    //     })

    useControls(vehicleApi, chassisApi, chassisBody);

    useFrame((state) => {
        if(!thirdPerson) return;
    
        let position = new THREE.Vector3(0,0,0);
        position.setFromMatrixPosition(chassisBody.current.matrixWorld);
    
        let quaternion = new THREE.Quaternion(0, 0, 0, 0);
        quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);
    
        let wDir = new THREE.Vector3(0,0,1);
        wDir.applyQuaternion(quaternion);
        wDir.normalize();
    
        let cameraPosition = position.clone().add(wDir.clone()
        .multiplyScalar(0.2).add(new THREE.Vector3(0, 0.03, 0)));
        
        wDir.add(new THREE.Vector3(0, 0.1, 0));
        state.camera.position.copy(cameraPosition);
        state.camera.lookAt(position);
      });

    return (
        <group ref={vehicle}>
            <group ref={chassisBody} name="chassisBody">
                <primitive object={mesh} rotation-y={Math.PI} />
            </group>

<mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh>
      
            <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        </group>
    );
}