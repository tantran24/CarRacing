/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Linnaeus (https://sketchfab.com/bordres)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/low-poly-tsukuba-circuit-d7a6d63a9f874355a680017e9e14d15a
Title: Low Poly Tsukuba Circuit
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useConvexPolyhedron, useTrimesh} from "@react-three/cannon";

export function Circuit(props) {
  const { nodes, materials } = useGLTF('../src/assets/3D/low_poly_tsukuba_circuit.glb')
  const list_Barriers = [...Array(28)].map((_, i) => 16 + 2 * i).concat([82, 90, 94, 96, 102, 126]);
  const list_plane = [78, 86, 92, 100, 122]
  const [ref] = useTrimesh(() => ({
    args: [nodes.Object_130.geometry.attributes.position.array, nodes.Object_130.geometry.index.array],
    type: 'Static',
    mass:0
  }));

  const [ref_1] = useTrimesh(() => ({
    args: [nodes.Object_124.geometry.attributes.position.array, nodes.Object_124.geometry.index.array],
    type: 'Static',
    mass:0
  }))

  const [ref_2] = useTrimesh(() => ({
    args: [nodes.Object_84.geometry.attributes.position.array, nodes.Object_84.geometry.index.array],
    type: 'Static',
    mass:0
  }))

  const [ref_3] = useTrimesh(() => ({
    args: [nodes.Object_80.geometry.attributes.position.array, nodes.Object_80.geometry.index.array],
    type: 'Static',
    mass:0
  }))

  return (
    <group {...props} dispose={null}>
      {list_Barriers.map((barrierIndex, i) => {
        const geometry = nodes[`Object_${barrierIndex}`].geometry;

        const vertices = geometry.attributes.position.array;
        const indices = geometry.index.array;
        var material_object = materials.BarriersTSU
        if (barrierIndex === 82 || barrierIndex === 96 || barrierIndex === 102 || barrierIndex === 126) {
          material_object = materials.BarriersCONC;
        } else if (barrierIndex === 90 || barrierIndex === 120) {
          material_object = materials.fence;
        } else if (barrierIndex === 94) {
          material_object = materials.outerbarrier;
        }
        const [ref] = useTrimesh(() => ({
          args: [vertices, indices],
          mass: 500, 
          type: 'Static'
        }));

        return (
          <mesh
            key={i}
            ref={ref}
            castShadow
            receiveShadow
            geometry={geometry}
            material={material_object}
          />
        );
      })}
      
      {list_plane.map((planeIndex, i) => {
        const geometry = nodes[`Object_${planeIndex}`].geometry;

        const vertices = geometry.attributes.position.array;
        const indices = geometry.index.array;
        var material_object = materials.Asph
        if (planeIndex === 100 || planeIndex === 122) {
          material_object = materials.Asphalt;
        } else if (planeIndex === 78) {
          material_object = materials.ASPH2;
        }

        const [ref] = useTrimesh(() => ({
          args: [vertices, indices],
          mass: 0, 
          type: 'Static'
        }));

        return (
          <mesh
            key={i}
            ref={ref}
            castShadow
            receiveShadow
            geometry={geometry}
            material={material_object}
          />
        );
      })}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.TSUKUB1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.TSUKUB1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_8.geometry}
        material={materials.TSUKUB1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_10.geometry}
        material={materials.TSUKUB1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={materials.Warehouse_etc}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_14.geometry}
        material={materials.Warehouse_etc}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_72.geometry}
        material={materials.Material_677}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_74.geometry}
        material={materials.Material__94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_76.geometry}
        material={materials.Material__32}
      />
      <mesh
        ref = {ref_3}
        castShadow
        receiveShadow
        geometry={nodes.Object_80.geometry}
        material={materials.Grass}
      />
      <mesh
        ref = {ref_2}
        castShadow
        receiveShadow
        geometry={nodes.Object_84.geometry}
        material={materials.Kerb}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_88.geometry}
        material={materials.Aqua}
      />
      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_98.geometry}
        material={materials.Mountains}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_104.geometry}
        material={materials.TSUKUB2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_106.geometry}
        material={materials.Forest}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_108.geometry}
        material={materials.Asphalt}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_110.geometry}
        material={materials.Foilage}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_112.geometry}
        material={materials.Grass2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_114.geometry}
        material={materials.Forest}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_116.geometry}
        material={materials.Forest}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_118.geometry}
        material={materials.Foilage}
      />
      <mesh
        ref ={ref_1}
        castShadow
        receiveShadow
        geometry={nodes.Object_124.geometry}
        material={materials.BrownedGrass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_128.geometry}
        material={materials.TSUKUB1}
      />
      <mesh
        ref = {ref}
        castShadow
        receiveShadow
        geometry={nodes.Object_130.geometry}
        material={materials.Asph}
        position={[0.032, 0, 0.603]}
        scale={1.11}
      />
    </group>
  )
}

useGLTF.preload('/low_poly_tsukuba_circuit.glb')