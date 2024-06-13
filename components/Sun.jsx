import React from "react";

export function Sun() {
    return (
        <>
            {/* Sun Sphere */}
            <mesh position={[-10, 5, 10]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial emissive="yellow" emissiveIntensity={1} />
            </mesh>

            {/* Directional Light */}
            <directionalLight
                position={[-10, 5, 10]}
                intensity={3}
                castShadow
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
                shadow-camera-near={0.1}
                shadow-camera-far={100}
                shadow-bias={-0.0001}
                shadow-normalBias={0.05} // Thêm normal bias để giảm các vấn đề về bóng đổ
            />
        </>
    );
}
