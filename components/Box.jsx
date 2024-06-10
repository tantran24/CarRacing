import { useBox } from "@react-three/cannon";

export function Box(props) {
    const [ref] = useBox(() => ({
        type: "Static",
        ...props,
    }));

    return (
        <mesh ref={ref} {...props}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
        </mesh>
    );
}
