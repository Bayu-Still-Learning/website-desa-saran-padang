'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const h = (x: number, z: number) => Math.sin(x * 0.6) * 0.3 + Math.cos(z * 0.5) * 0.25 + Math.sin((x + z) * 0.4) * 0.2
const ease = (t: number) => 1 - Math.pow(1 - t, 3)
const ORANGES: [number, number, number][] = [[0.36, 0.66, 0.1], [-0.34, 0.6, 0.18], [0.05, 0.52, 0.38], [-0.12, 0.9, -0.22], [0.26, 0.5, -0.3]]

function Tree({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, h(x, z), z]}>
      <mesh position={[0, 0.22, 0]}><cylinderGeometry args={[0.05, 0.07, 0.45, 5]} /><meshStandardMaterial color="#6B4A2B" flatShading /></mesh>
      <mesh position={[0, 0.62, 0]} scale={[1, 0.85, 1]}><icosahedronGeometry args={[0.38, 0]} /><meshStandardMaterial color="#2F6B3A" flatShading /></mesh>
      {ORANGES.map((o, i) => (
        <mesh key={i} position={o}><icosahedronGeometry args={[0.075, 0]} /><meshStandardMaterial color="#F08A1C" emissive="#C86A00" emissiveIntensity={0.25} flatShading /></mesh>
      ))}
    </group>
  )
}

function Orchard({ low, still }: { low: boolean; still: boolean }) {
  const g = useRef<THREE.Group>(null!)
  const geo = useMemo(() => {
    const p = new THREE.PlaneGeometry(9, 9, 22, 22); p.rotateX(-Math.PI / 2)
    const a = p.attributes.position
    for (let i = 0; i < a.count; i++) a.setY(i, h(a.getX(i), a.getZ(i)))
    p.computeVertexNormals(); return p
  }, [])
  const trees = useMemo(() => {
    const rows = low ? [-1.4, 0.8] : [-2.4, -0.5, 1.4]
    return rows.flatMap((z, r) => [-3, -1, 1, 3].map(x => [x + (r % 2) * 0.5, z] as const))
  }, [low])

  useFrame(({ pointer, camera, clock }, dt) => {
    const t = still ? 1 : ease(Math.min(clock.elapsedTime / 1.6, 1))   // transisi masuk
    const s = still ? 0 : Math.min(window.scrollY / 700, 1)             // progres scroll
    const px = still ? 0 : pointer.x, py = still ? 0 : pointer.y
    const D = THREE.MathUtils.damp
    g.current.position.z = -(1 - t) * 5                                  // terangkat maju di sumbu Z
    g.current.position.y = -s * 0.9                                      // parallax saat scroll
    g.current.scale.setScalar(0.85 + 0.15 * t)
    g.current.rotation.y = D(g.current.rotation.y, -(1 - t) * 1.0 + px * 0.45, 4, dt)
    g.current.rotation.x = D(g.current.rotation.x, 0.45 - py * 0.18 + s * 0.25, 4, dt)
    camera.position.x = D(camera.position.x, px * 0.8, 3, dt)
    camera.position.y = D(camera.position.y, 3.2 + py * 0.4 - s * 0.3, 3, dt)
    camera.lookAt(0, 0.4, 0)
  })

  return (
    <group ref={g} rotation={[0.45, 0, 0]}>
      <mesh geometry={geo}><meshStandardMaterial color="#4A7C59" flatShading /></mesh>
      {trees.map(([x, z]) => <Tree key={`${x}-${z}`} x={x} z={z} />)}
      <Float speed={2} floatIntensity={0.8}><mesh position={[3.2, 3, -2]}><icosahedronGeometry args={[0.5, 0]} /><meshStandardMaterial color="#C89B3C" emissive="#C89B3C" emissiveIntensity={0.5} flatShading /></mesh></Float>
    </group>
  )
}

export default function Scene3D({ low = false, still = false }: { low?: boolean; still?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 3.2, 8.5], fov: 38 }} dpr={low ? 1 : [1, 1.5]}>
      <hemisphereLight args={['#FFF3D6', '#4A7C59', 0.7]} />
      <directionalLight position={[5, 6, 3]} color="#FFD9A0" intensity={2} />
      <Orchard low={low} still={still} />
    </Canvas>
  )
}