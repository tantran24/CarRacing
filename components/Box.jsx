import { VehicleContext, useVehicle } from '../context/Vehicles';
import { useRef, useContext, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

export function Box({ type, ...props }) {
    const mesh = useRef();
    const {vehicleAPIs, addVehicleAPI, chassisBodies, addChassisBody} = useContext(VehicleContext);
    const [isRemoved, setIsRemoved] = useState(false);
    const buffTexture = useLoader(TextureLoader, '../src/assets/textures/buff.jpg');
    const nerfTexture = useLoader(TextureLoader, '../src/assets/textures/nerf.jpg');
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

            if(chassisBodies.length >= 1){
                box.getCenter(boxPosition);

                const carBox = new THREE.Box3().setFromObject(chassisBodies[0].current);

                if (box.intersectsBox(carBox)) {
                    scene.remove(mesh.current);
                    setIsRemoved(true);
                    setTimeout(() => {
                        scene.add(mesh.current);
                        setIsRemoved(false);
                    }, 10000);

                    if (type === 'buff') {
                        vehicleAPIs[0].applyEngineForce(1000, 2);
                        vehicleAPIs[0].applyEngineForce(1000, 3);
                    } else if (type === 'nerf') {
                        vehicleAPIs[0].applyEngineForce(-800, 2);
                        vehicleAPIs[0].applyEngineForce(-800, 3);
                    }
                }
            } 
        }
    });
    useFrame(({ clock }) => {
        if (mesh.current) {
            if (type === 'nerf') {
                const time = clock.getElapsedTime();
                mesh.current.position.x = initialPosition.current + Math.sin(time)/5;
                // mesh.current.position.z += Math.cos(time)/325;
            } 
        mesh.current.rotation.y += 0.03;

        }
    });
    
    
    return (
        <mesh ref={mesh} {...props}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial map={type === 'buff' ? buffTexture : nerfTexture} />
        </mesh>
    );
}
