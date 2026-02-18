'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Particle system component
function Particles({ count = 1500 }: { count?: number }) {
    const meshRef = useRef<THREE.Points>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Generate particle positions and colors
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            // Color (blue to purple gradient)
            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                // Quantum Blue
                colors[i * 3] = 0.31;     // R: 79/255
                colors[i * 3 + 1] = 0.57; // G: 145/255
                colors[i * 3 + 2] = 1.0;  // B: 255/255
            } else if (colorChoice < 0.7) {
                // Cosmic Purple
                colors[i * 3] = 0.55;     // R: 139/255
                colors[i * 3 + 1] = 0.36; // G: 92/255
                colors[i * 3 + 2] = 0.96; // B: 246/255
            } else {
                // Neon Emerald
                colors[i * 3] = 0.06;     // R: 16/255
                colors[i * 3 + 1] = 0.82; // G: 209/255
                colors[i * 3 + 2] = 0.65; // B: 166/255
            }
        }

        return [positions, colors];
    }, [count]);

    // Mouse movement handler
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) - 0.5;
            mouseRef.current.y = (event.clientY / window.innerHeight) - 0.5;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animation loop
    useFrame(() => {
        if (!meshRef.current) return;

        // Base rotation
        meshRef.current.rotation.y += 0.001;
        meshRef.current.rotation.x += 0.0005;

        // Mouse-based rotation (smooth follow)
        meshRef.current.rotation.y += mouseRef.current.x * 0.02;
        meshRef.current.rotation.x += -mouseRef.current.y * 0.02;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                vertexColors
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                sizeAttenuation
            />
        </points>
    );
}

// Floating geometric shapes
function FloatingGeometry() {
    const group1Ref = useRef<THREE.Mesh>(null);
    const group2Ref = useRef<THREE.Mesh>(null);
    const group3Ref = useRef<THREE.Mesh>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) - 0.5;
            mouseRef.current.y = (event.clientY / window.innerHeight) - 0.5;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (group1Ref.current) {
            group1Ref.current.rotation.x = time * 0.2 + mouseRef.current.y * 0.5;
            group1Ref.current.rotation.y = time * 0.3 + mouseRef.current.x * 0.5;
            group1Ref.current.position.y = Math.sin(time * 0.5) * 0.3;
        }

        if (group2Ref.current) {
            group2Ref.current.rotation.x = time * 0.15 - mouseRef.current.y * 0.3;
            group2Ref.current.rotation.z = time * 0.25 - mouseRef.current.x * 0.3;
            group2Ref.current.position.y = Math.sin(time * 0.4 + 1) * 0.2;
        }

        if (group3Ref.current) {
            group3Ref.current.rotation.y = time * 0.2 + mouseRef.current.x * 0.4;
            group3Ref.current.rotation.z = time * 0.1 + mouseRef.current.y * 0.4;
            group3Ref.current.position.y = Math.sin(time * 0.6 + 2) * 0.25;
        }
    });

    return (
        <>
            {/* Octahedron - Top Right */}
            <mesh ref={group1Ref} position={[3, 1.5, -2]}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshBasicMaterial
                    color="#4f91ff"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Icosahedron - Bottom Left */}
            <mesh ref={group2Ref} position={[-3.5, -1, -3]}>
                <icosahedronGeometry args={[0.6, 0]} />
                <meshBasicMaterial
                    color="#8b5cf6"
                    wireframe
                    transparent
                    opacity={0.25}
                />
            </mesh>

            {/* Torus - Center Right */}
            <mesh ref={group3Ref} position={[4, -0.5, -4]}>
                <torusGeometry args={[0.4, 0.15, 8, 16]} />
                <meshBasicMaterial
                    color="#10d1a6"
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </>
    );
}

// Connection lines between particles (simplified mesh network effect)
function ConnectionLines() {
    const linesRef = useRef<THREE.LineSegments>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const geometry = useMemo(() => {
        const positions: number[] = [];
        const lineCount = 30;

        for (let i = 0; i < lineCount; i++) {
            // Start point
            positions.push(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 5 - 2
            );
            // End point
            positions.push(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 5 - 2
            );
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
        );
        return geometry;
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) - 0.5;
            mouseRef.current.y = (event.clientY / window.innerHeight) - 0.5;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!linesRef.current) return;

        linesRef.current.rotation.y = state.clock.elapsedTime * 0.05 + mouseRef.current.x * 0.2;
        linesRef.current.rotation.x = mouseRef.current.y * 0.1;
    });

    return (
        <lineSegments ref={linesRef} geometry={geometry}>
            <lineBasicMaterial
                color="#4f91ff"
                transparent
                opacity={0.1}
            />
        </lineSegments>
    );
}

// Main component
export function ParticleBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 3], fov: 75 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
            >
                <Particles count={1500} />
                <FloatingGeometry />
                <ConnectionLines />
            </Canvas>
        </div>
    );
}
