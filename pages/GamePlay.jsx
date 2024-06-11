import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParisBis } from "../models/Paris-bis";
import { Car } from "../models/Car";
import Loader from "../components/Loader";
import { PerspectiveCamera, OrbitControls, Html} from "@react-three/drei";
import { useHelper } from "@react-three/drei/native";
import { Physics, usePlane } from "@react-three/cannon";
import { Sun } from "../components/Sun";
import { RoundNumContext} from "../context/Vehicles";

import * as THREE from "three";
import {
    EffectComposer,
    N8AO,
    Bloom,
    TiltShift2,
    HueSaturation,
    SMAA,
    ChromaticAberration,
    Vignette,
    LUT,
} from "@react-three/postprocessing";
import { Scene } from "../components/Scene";

const GamePlay = () => {
    const [timer, setTimer] = useState(0);
    const [roundNum, setRoundNum] = useState(-1);

    useEffect(() => {
        let intervalId;
        if (roundNum < 1) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 0.1);
            }, 100);
        }
            
        return () => {
            clearInterval(intervalId); 
        };
    }, [roundNum]);

    return (
        <section className="w-full h-screen relative">
            <div style={{ 
                position: 'absolute', 
                top: 10, 
                left: "43%", 
                zIndex: 1,
                color: 'white', 
                fontWeight: 'bold', 

                fontSize: 30 
            }}>
                Time: {timer.toFixed(1)} seconds
            </div>
            {roundNum === 1 && (
                <div style={{ 
                    position: 'absolute', 
                    top: '25%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    zIndex: 1,
                    color: 'tomato', 
                    fontSize: '3em', 
                    fontWeight: 'bold', 
                    textAlign: 'center',
                    backgroundColor: 'white',
                    border: '2px solid gray',
                    padding: '20px',
                    opacity: "80%"
                }}>
                    CONGRATULATIONS!
                    <br />
                    Time: {timer.toFixed(1)} seconds
                </div>
            )}
            <RoundNumContext.Provider value={{roundNum, setRoundNum}}>

                <Canvas className="bg-transparent w-full h-screen" shadows>
                    <ambientLight intensity={0.5} />
                    <Sun />
                    <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
                        <Scene />
                    </Physics>
                </Canvas>
              
            </RoundNumContext.Provider>

        </section>
    );
};


export default GamePlay;
