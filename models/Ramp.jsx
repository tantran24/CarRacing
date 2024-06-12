import { useTrimesh } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";

export function Ramp(props) {
    const result = useLoader(GLTFLoader, "../src/assets/3D/ramp.glb");
    const texture = useLoader(
        TextureLoader,
        "../src/assets/textures/ramp_texture.jpg"
    );

    const geometry = result.scene.children[0].geometry;

    const vertices = geometry.attributes.position.array;
    const indices = geometry.index.array;

    const [ref, api] = useTrimesh(
        () => ({
            // rotation: [-Math.PI / 2, 0, 0],
            args: [vertices, indices],
            mass: 0,
            type: "Static",
        }),
        useRef(null)
    );

    const newPosition = props.position;
    const newScale = props.scale || [1, 1, 1];

    useEffect(() => {
        api.position.set(...newPosition);
        // api.scale.set(...newScale);
        api.rotation.set(0, -Math.PI / 2, 0);
    }, [newPosition, newScale]);

    return (
        <group ref={ref}>
            <mesh geometry={geometry} castShadow receiveShadow>
                <meshBasicMaterial map={texture} />
            </mesh>
        </group>
    );
}
