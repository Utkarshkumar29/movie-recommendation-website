'use client'
import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react";
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef()
  const particleCount = 1000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      const color = new THREE.Color()
      color?.setHSL(Math.random() * 0.3 + 0.6, 0.8, 0.6)
      colors[i * 3] = color?.r
      colors[i * 3 + 1] = color?.g
      colors[i * 3 + 2] = color?.b
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {

      pointsRef.current.rotation.y = state?.clock?.elapsedTime * 0.05
      pointsRef.current.rotation.x = state?.clock?.elapsedTime * 0.03

      const positions = pointsRef?.current?.geometry?.attributes?.position?.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(state?.clock?.elapsedTime + positions?.[i3]) * 0.01
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE?.AdditiveBlending}
      />
    </points>
  )

}

const WaveGeometry=()=>{
  const meshRef=useRef()
  const gridSize=50
  const segementSize=1

  useFrame((state)=>{
    const positions=meshRef?.current?.geometry?.attributes?.position?.array;
    const time=state.clock.elapsedTime

    for(let i=0; i<positions?.length; i+=3){
      const x=positions?.[i]
      const y=positions?.[i+1]
      positions[i+2]=Math.sin(x*0.2+time)*Math.cos(y*0.2+time)*2
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.z = time * 0.05
  })

  return(
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -10, -20]}>
      <planeGeometry args={[gridSize, gridSize, 50, 50]} />
      <meshStandardMaterial
        color="#4f46e5"
        wireframe
        transparent
        opacity={0.2}
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        
        <ParticleField />
        <WaveGeometry />
      </Canvas>
    </div>
  )
}

export default ThreeBackground