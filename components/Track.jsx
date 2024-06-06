import React from "react";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export function Track() {
    const { scene } = useGLTF("../src/assets/3D/racetrack_test.glb");
    return <primitive object={scene} />;
}

// export function Track(props) {
//     const { scene } = useGLTF("../src/assets/3D/racetrack_test.glb");

//     const [dimensions, setDimensions] = useState(null);

//     useEffect(() => {
//         if (scene) {
//             // Tạo một Box3 để bao quanh mô hình
//             const box = new THREE.Box3().setFromObject(scene);

//             // Lấy kích thước của Box3
//             const size = box.getSize(new THREE.Vector3());
//             console.log(size);

//             setDimensions(size);
//         }
//     }, [scene]);

//     return <primitive object={scene} {...props} />;
// }
