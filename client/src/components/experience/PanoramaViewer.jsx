/*import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function PanoramaViewer({ image }) {
  const texture = new THREE.TextureLoader().load(image);

  return (
    <Canvas style={{ height: "300px" }}>
      <OrbitControls enableZoom={false} />
      <Sphere args={[500, 60, 40]} scale={-1}>
        <meshBasicMaterial map={texture} />
      </Sphere>
    </Canvas>
  );
}

export default PanoramaViewer;
*/
/*import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function PanoramaViewer({ image }) {
  const texture = new THREE.TextureLoader().load(image);

  return (
    <Canvas style={{ height: "300px", borderRadius: "16px" }}>
      <OrbitControls enableZoom={false} />
      <Sphere args={[500, 60, 40]} scale={-1}>
        <meshBasicMaterial map={texture} />
      </Sphere>
    </Canvas>
  );
}

export default PanoramaViewer;
*/
/*import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function PanoramaViewer({ image, title, location }) {
  const texture = new THREE.TextureLoader().load(image);

  return (
    <div className="panorama-wrapper" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
    
      <div className="panorama-overlay" style={{
        position: 'absolute', bottom: '20px', left: '20px', zIndex: 10, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{location}</p>
      </div>

      <Canvas style={{ height: "450px", width: "100%" }}>
        <OrbitControls enableZoom={false} rotateSpeed={-0.5} />
        <Sphere args={[500, 60, 40]} scale={-1}>
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </Sphere>
      </Canvas>
    </div>
  );
}

export default PanoramaViewer;*/

/*
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function PanoramaViewer({ image, title, location }) {
  // Use useLoader or TextureLoader
  const texture = new THREE.TextureLoader().load(image);
  
  // Optional: Ensure the texture is oriented correctly
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1; // This horizontally flips the image if it appears mirrored

  return (
    <div className="pv-wrap" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
      <div className="pv-overlay" style={{
        position: 'absolute', bottom: '20px', left: '20px', zIndex: 10, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{location}</p>
      </div>

      <Canvas style={{ height: "450px", width: "100%" }}>
        
        <OrbitControls enableZoom={false} rotateSpeed={-0.5} />
        
        <Sphere args={[500, 60, 40]}>
          <meshBasicMaterial 
            map={texture} 
            side={THREE.BackSide} // This is the correct way to see the inside
          />
        </Sphere>
      </Canvas>
    </div>
  );
}

export default PanoramaViewer;
*/

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function PanoramaViewer({ image, title, location }) {
  /*const texture = useLoader(THREE.TextureLoader, image);*/
  const texture = new THREE.TextureLoader().load(
    image,
    undefined, // onLoad callback
    undefined, // onProgress callback
    (err) => console.error("Failed to load texture:", err) // onError callback
  );

  return (
    <div className="pv-wrap" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
      
      <div className="pv-overlay" style={{
        position: 'absolute', bottom: '20px', left: '20px',
        zIndex: 10, color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{location}</p>
      </div>

      <Canvas style={{ height: "450px", width: "100%" }} camera={{ position: [0, 0, 0.1] }}>
        
        <OrbitControls enableZoom={false} rotateSpeed={-0.5} />

        <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </Sphere>

      </Canvas>
    </div>
  );
}

export default PanoramaViewer;