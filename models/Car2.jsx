import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "../components/useWheels";
import { useControls } from "../components/useControls";
import { WheelDebug } from "../components/WheelDebug";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export function Car2(thirdPerson) {
    // let mesh = useGLTF("../src/assets/3D/car.glb");
    let mesh = useLoader(GLTFLoader, "../src/assets/3D/car.glb").scene;

    // const position = [-2, 2, 1, 6];
    const position = [0, 0, 0];
    // const width = 0.15;
    // const height = 0.07;
    // const front = 0.15;
    const width = 0.9;
    const height = 0.35;
    const front = 1.2;
    const wheelRadius = 0.25;

    const chassisBodyArgs = [width, height, front * 2];
    const [chassisBody, chassisApi] = useBox(
        () => ({
            allowSleep: false,
            args: chassisBodyArgs,
            mass: 300,
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

    useFrame((state) => {
        if (!thirdPerson) return;

        // Lấy vị trí hiện tại của xe
        let position = new THREE.Vector3();
        position.setFromMatrixPosition(chassisBody.current.matrixWorld);

        // Lấy hướng quay hiện tại của xe
        let quaternion = new THREE.Quaternion();
        quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

        // biến đổi hướng cố định theo hướng quay của xe
        let wDir = new THREE.Vector3(0, 0, -10); // Hướng về phía trước dọc theo trục z
        wDir.applyQuaternion(quaternion);
        wDir.normalize();

        // Tính toán vị trí của camera sao cho luôn theo sau xe
        let cameraOffset = wDir
            .clone()
            .multiplyScalar(-10)
            .add(new THREE.Vector3(0, 2.8, 0)); // Offset: 10 đơn vị phía sau, 3 đơn vị chiều cao
        let cameraPosition = position.clone().add(cameraOffset);

        // Cập nhật vị trí và hướng của camera
        state.camera.position.copy(cameraPosition);
        state.camera.lookAt(position);
    });

    // useFrame((state) => {
    //     if (!thirdPerson) return;

    //     let position = new THREE.Vector3(0, 0, 0);
    //     position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    //     let quaternion = new THREE.Quaternion(0, 0, 0, 0);
    //     quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    //     let wDir = new THREE.Vector3(0, 0, 1);
    //     wDir.applyQuaternion(quaternion);
    //     wDir.normalize();

    //     let cameraPosition = position
    //         .clone()
    //         .add(
    //             wDir.clone().multiplyScalar(1).add(new THREE.Vector3(0, 3, 12))
    //         );

    //     wDir.add(new THREE.Vector3(0, 0.2, 0));
    //     state.camera.position.copy(cameraPosition);
    //     state.camera.lookAt(position);
    // });

    useEffect(() => {
        if (!mesh) return;
        // Adjusting the scale of the loaded model
        mesh.scale.set(0.01, 0.01, 0.01);

        // Setting the position of the mesh to align with the physics body
        mesh.position.set(3.65, -0.2, 0.7);
    }, [mesh]);

    // group chassicBody & wheel to control => vehicle
    return (
        <group ref={vehicle}>
            <group ref={chassisBody} name="chassisBody">
                <primitive
                    object={mesh}
                    rotation-y={Math.PI}
                    position={[0, 0, 0]}
                />
            </group>
            {/* <mesh ref={chassisBody}>
                <meshBasicMaterial
                    transparent={true}
                    opacity={0.3}
                    color={"red"}
                />
                <boxGeometry args={chassisBodyArgs} />
            </mesh> */}

            <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        </group>
    );
}
