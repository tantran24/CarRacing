import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export function MountainEnvironment() {
    // Tải texture cho môi trường đồi núi
    const texture = useLoader(
        TextureLoader,
        "../src/assets/textures/mountaint_texture.jpg"
    );

    // Tạo và trả về một hình hộp với texture
    return (
        <mesh>
            <boxGeometry args={[1000, 1000, 1000]} />
            <meshBasicMaterial map={texture} side={2} />
        </mesh>
    );
}
