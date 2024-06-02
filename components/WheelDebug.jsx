const debug = false;

export const WheelDebug = ({ radius, wheelRef }) => {
    return (
        debug && (
            <group ref={wheelRef}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[radius, radius, 0.015, 16]} />
                    <meshBasicMaterial
                        transparent={true}
                        opacity={0.3}
                        color={"red"}
                    />
                </mesh>
            </group>
        )
    );
};