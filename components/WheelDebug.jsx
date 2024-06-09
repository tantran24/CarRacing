const debug = true;

export const WheelDebug = ({ radius, wheelRef }) => {
    return (
        debug && (
            <group ref={wheelRef}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[radius, radius, 0.075, 16]} />
                    <meshBasicMaterial
                        transparent={true}
                        opacity={0.5}
                        color={"red"}
                    />
                </mesh>
            </group>
        )
    );
};
