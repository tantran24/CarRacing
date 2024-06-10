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


export function Car2({thirdPerson, addVehicleAPI, addchassisBody, chassisBodies}) {

    let mesh = useLoader(GLTFLoader, "../src/assets/3D/car.glb").scene;
    mesh.scale.set(0.001, 0.001, 0.001);
    mesh.position.set(0.37, -0.05, 0.05);
    const position = [0, 0, 0];

    let box = new THREE.Box3().setFromObject(mesh);
    let size = box.getSize(new THREE.Vector3());
    let center = box.getCenter(new THREE.Vector3());
    const width = size.x;
    const height = size.y;
    const front = size.z;
    const wheelRadius = 0.25*0.1;

    const chassisBodyArgs = [width, height, front * 2];

    const [chassisBody, chassisApi] = useBox(
        () => ({
            allowSleep: false,
            args: chassisBodyArgs,
            mass: 200,
        }),
        useRef(null)
    );

    const [wheels, wheelInfos] = useWheels(width*2.5, height, front, wheelRadius);

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

    useControls(vehicleApi, chassisApi);

    // useFrame((state) => {
    //     if (!thirdPerson) return;

    //     // Lấy vị trí hiện tại của xe
    //     let position = new THREE.Vector3(0, 0, 0);
    //     position.setFromMatrixPosition(chassisBody.current.matrixWorld);
    //     // console.log(position);

    //     // Lấy hướng quay hiện tại của xe
    //     let quaternion = new THREE.Quaternion(0, 0, 0, 0);
    //     quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    //     // biến đổi hướng cố định theo hướng quay của xe
    //     let wDir = new THREE.Vector3(0, 0, -1); // Hướng về phía trước dọc theo trục z
    //     wDir.applyQuaternion(quaternion);
    //     wDir.normalize();

    //     // Tính toán vị trí của camera sao cho luôn theo sau xe
    //     let cameraOffset = wDir
    //         .clone()
    //         .multiplyScalar(-1)
    //         .add(new THREE.Vector3(0, 0.3, 0)); // Offset: 10 đơn vị phía sau, 3 đơn vị chiều cao
    //     let cameraPosition = position.clone().add(cameraOffset);

    //     // Cập nhật vị trí và hướng của camera
    //     state.camera.position.copy(cameraPosition);
    //     state.camera.lookAt(position);
    // });

    return (
        <group ref={vehicle}>
            <group ref={chassisBody} name="chassisBody" 
>
                <primitive
                    object={mesh}
                    rotation-y={Math.PI}
                />
            </group>

            <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        </group>
    );
}
