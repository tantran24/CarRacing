import { useRef, useEffect } from "react";
import { EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
import { useFrame } from "@react-three/fiber";

export function ColliderDebug({ geometry, material }) {
    const ref = useRef();

    useEffect(() => {
        if (geometry) {
            const edgesGeometry = new EdgesGeometry(geometry);
            const lineSegments = new LineSegments(
                edgesGeometry,
                new LineBasicMaterial({ color: 0xff0000 })
            );
            ref.current.add(lineSegments);
        }
    }, [geometry]);

    return <group ref={ref} />;
}
