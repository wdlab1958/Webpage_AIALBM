'use client';

import dynamic from 'next/dynamic';

// Dynamic import for Three.js component (client-side only)
const ParticleBackground = dynamic(
    () => import('@/components/three/ParticleBackground').then((mod) => mod.ParticleBackground),
    { ssr: false }
);

export function GlobalBackground() {
    return (
        <>
            {/* Fixed 3D Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <ParticleBackground />
            </div>

            {/* Mesh Gradient Overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none mesh-gradient opacity-80" />

            {/* Grid Pattern Overlay */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(79, 145, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 145, 255, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />
        </>
    );
}
