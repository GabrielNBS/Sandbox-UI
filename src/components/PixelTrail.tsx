'use client';

/* eslint-disable react/no-unknown-property */
import { useMemo, useEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import './PixelTrail.css';

const THREE_NS = THREE;

interface GooeyFilterProps {
	id?: string;
	strength?: number;
}

const GooeyFilter = ({ id = 'goo-filter', strength = 10 }: GooeyFilterProps) => {
	return (
		<svg className="goo-filter-container" aria-hidden="true">
			<title>Gooey Filter</title>
			<defs>
				<filter id={id}>
					<feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
					<feColorMatrix
						in="blur"
						type="matrix"
						values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
						result="goo"
					/>
					<feComposite in="SourceGraphic" in2="goo" operator="atop" />
				</filter>
			</defs>
		</svg>
	);
};

// Declaração do ShaderMaterial customizado
const DotMaterial = shaderMaterial(
	{
		resolution: new THREE_NS.Vector2(),
		mouseTrail: null,
		gridSize: 100,
		pixelColor: new THREE_NS.Color('#ffffff'),
		uImage: null,
		useImage: false,
	},
	`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
	`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;
    uniform sampler2D uImage;
    uniform bool useImage;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      vec3 finalColor = pixelColor;
      if (useImage) {
        finalColor = texture2D(uImage, uv).rgb;
      }

      gl_FragColor = vec4(finalColor, trail);
    }
  `
);

interface SceneProps {
	gridSize: number;
	trailSize: number;
	maxAge: number;
	interpolate: number;
	easingFunction?: (x: number) => number;
	pixelColor: string;
	imageSrc?: string;
}

function Scene({
	gridSize,
	trailSize,
	maxAge,
	interpolate,
	easingFunction,
	pixelColor,
	imageSrc,
}: SceneProps) {
	const size = useThree((s) => s.size);
	const viewport = useThree((s) => s.viewport);

	// Carrega a textura se imageSrc for passado
	const texture = imageSrc ? useTexture(imageSrc) : null;

	// Instanciar o material customizado. O shaderMaterial retorna um construtor de classe.
	const dotMaterial = useMemo(() => {
		const mat = new (DotMaterial as any)();
		mat.uniforms.pixelColor.value = new THREE_NS.Color(pixelColor);
		return mat;
	}, [pixelColor]);

	useEffect(() => {
		if (texture) {
			texture.minFilter = THREE_NS.LinearFilter;
			dotMaterial.uniforms.uImage.value = texture;
			dotMaterial.uniforms.useImage.value = true;
		} else {
			dotMaterial.uniforms.useImage.value = false;
		}
	}, [texture, dotMaterial]);

	const [trail, onMove] = useTrailTexture({
		size: 512,
		radius: trailSize,
		maxAge: maxAge,
		interpolate: interpolate || 0.1,
		ease: easingFunction || ((x) => x),
	});

	if (trail) {
		trail.minFilter = THREE_NS.NearestFilter;
		trail.magFilter = THREE_NS.NearestFilter;
		trail.wrapS = THREE_NS.ClampToEdgeWrapping;
		trail.wrapT = THREE_NS.ClampToEdgeWrapping;
	}

	const scale = Math.max(viewport.width, viewport.height) / 2;

	return (
		<mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
			<planeGeometry args={[2, 2]} />
			<primitive
				object={dotMaterial}
				gridSize={gridSize}
				resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
				mouseTrail={trail}
			/>
		</mesh>
	);
}

interface PixelTrailProps {
	gridSize?: number;
	trailSize?: number;
	maxAge?: number;
	interpolate?: number;
	easingFunction?: (x: number) => number;
	canvasProps?: any;
	glProps?: any;
	gooeyFilter?: GooeyFilterProps;
	color?: string;
	className?: string;
	style?: React.CSSProperties;
	eventSource?: React.RefObject<HTMLElement | null>;
	imageSrc?: string;
}

export default function PixelTrail({
	gridSize = 40,
	trailSize = 0.1,
	maxAge = 250,
	interpolate = 5,
	easingFunction = (x) => x,
	canvasProps = {},
	glProps = {
		antialias: false,
		powerPreference: 'high-performance',
		alpha: true,
	},
	gooeyFilter,
	color = '#ffffff',
	className = '',
	style = {},
	eventSource,
	imageSrc,
}: PixelTrailProps) {
	return (
		<>
			{gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
			<Canvas
				{...canvasProps}
				eventSource={eventSource}
				gl={glProps}
				className={`pixel-canvas ${className}`}
				style={{
					...style,
					...(gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}),
				}}
			>
				<Suspense fallback={null}>
					<Scene
						gridSize={gridSize}
						trailSize={trailSize}
						maxAge={maxAge}
						interpolate={interpolate}
						easingFunction={easingFunction}
						pixelColor={color}
						imageSrc={imageSrc}
					/>
				</Suspense>
			</Canvas>
		</>
	);
}
