'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
function Hills() {
  const g = useRef<THREE.Group>(null!)
  const geo = useMemo(() => {
    const p = new THREE.PlaneGeometry(8, 8, 26, 26); p.rotateX(-Math.PI / 2)
    const a = p.attributes.position
    for (let i = 0; i < a.count; i++) { const x = a.getX(i), z = a.getZ(i); a.setY(i, Math.sin(x * .8) * .55 + Math.cos(z * .7) * .4 + Math.sin((x + z) * .5) * .3) }
    p.computeVertexNormals(); return p
  }, [])
  const trees = useMemo(() => Array.from({ length: 16 }, (_, i) => [Math.sin(i * 2.4) * 3, Math.cos(i * 1.7) * 3] as const), [])
  useFrame(({ pointer }, dt) => {
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, pointer.x * .7, 3, dt)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, .45 - pointer.y * .2, 3, dt)
  })
  return (
    <group ref={g}>
      <mesh geometry={geo}><meshStandardMaterial color="#4A7C59" flatShading /></mesh>
      {trees.map(([x, z], i) => <mesh key={i} position={[x, .9, z]}><coneGeometry args={[.18, .6, 5]} /><meshStandardMaterial color="#1E3F20" flatShading /></mesh>)}
      <Float speed={2} floatIntensity={1}><mesh position={[2.2, 2.6, -1]}><icosahedronGeometry args={[.5, 0]} /><meshStandardMaterial color="#C89B3C" flatShading /></mesh></Float>
    </group>
  )
}
export default function Scene3D() {
  return <Canvas camera={{ position: [0, 3, 8], fov: 40 }} dpr={[1, 1.5]}><ambientLight intensity={.8} /><directionalLight position={[4, 6, 3]} intensity={1.6} /><Hills /></Canvas>
}
