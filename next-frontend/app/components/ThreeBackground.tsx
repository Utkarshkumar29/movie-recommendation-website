'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ================= PARTICLE FIELD ================= */

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const particleCount = 1000;

  const [positions, colors] = useMemo<[Float32Array, Float32Array]>(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.6, 0.8, 0.6);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    const positionAttr = points.geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;

    points.rotation.y = clock.elapsedTime * 0.05;
    points.rotation.x = clock.elapsedTime * 0.03;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(clock.elapsedTime + posArray[i3]) * 0.01;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ================= WAVE GEOMETRY ================= */

const WaveGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const gridSize = 50;

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const positionAttr = mesh.geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;
    const time = clock.elapsedTime;

    for (let i = 0; i < posArray.length; i += 3) {
      const x = posArray[i];
      const y = posArray[i + 1];
      posArray[i + 2] =
        Math.sin(x * 0.2 + time) *
        Math.cos(y * 0.2 + time) *
        2;
    }

    positionAttr.needsUpdate = true;
    mesh.rotation.z = time * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 3, 0, 0]}
      position={[0, -10, -20]}
    >
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
  );
};

/* ================= SCENE WRAPPER ================= */

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
  );
};

export default ThreeBackground;
