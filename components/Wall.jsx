import React from "react";
import { useBox } from "@react-three/cannon";

export function Wall({ position, size }) {
    const [ref] = useBox(() => ({
        type: "Static",
        position,
        args: size,
    }));

    return (
        <mesh ref={ref}>
            <boxGeometry args={size} />
            <meshStandardMaterial color="grey" />
        </mesh>
    );
}
