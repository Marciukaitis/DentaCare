import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

/** Forma orgánica flotante + anillo — evoca movimiento y cuidado (sin depender de modelos pesados). */
function OrganicCluster() {
  const group = useRef(null)
  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.35
    group.current.rotation.x = Math.sin(performance.now() / 2000) * 0.12
  })

  return (
    <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.65}>
      <group ref={group}>
        <mesh position={[0, 0.1, 0]}>
          <icosahedronGeometry args={[1.05, 1]} />
          <MeshDistortMaterial
            color="#38bdf8"
            metalness={0.45}
            roughness={0.28}
            emissive="#0369a1"
            emissiveIntensity={0.18}
            distort={0.35}
            speed={1.8}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.2, 0.4, 0]} position={[0, -0.15, 0]}>
          <torusGeometry args={[1.35, 0.06, 16, 80]} />
          <meshStandardMaterial
            color="#bae6fd"
            metalness={0.6}
            roughness={0.15}
            emissive="#0ea5e9"
            emissiveIntensity={0.12}
          />
        </mesh>
        <mesh position={[-0.55, 0.45, 0.35]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial
            color="#f0f9ff"
            metalness={0.2}
            roughness={0.35}
            emissive="#ffffff"
            emissiveIntensity={0.25}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 4]} intensity={1.35} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} color="#e0f2fe" />
      <pointLight position={[0, 2, 3]} intensity={0.6} color="#7dd3fc" />
      <OrganicCluster />
    </>
  )
}

function CanvasFallback() {
  return (
    <div
      className="flex h-full min-h-[260px] w-full items-center justify-center rounded-3xl bg-gradient-to-br from-sky-100/90 via-white to-cyan-50/80 shadow-inner ring-1 ring-sky-100"
      aria-hidden
    >
      <div className="h-24 w-24 animate-pulse rounded-full bg-sky-200/60 blur-sm" />
    </div>
  )
}

export function Hero3D() {
  return (
    <div className="relative h-[min(420px,52vh)] w-full min-h-[260px] overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50/50 via-white to-cyan-50/40 shadow-xl shadow-sky-200/40 ring-1 ring-sky-100/80">
      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          className="!h-full !w-full"
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0.2, 4.2], fov: 42 }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Scene />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-white/30 to-transparent" />
    </div>
  )
}
