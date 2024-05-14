'use client';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export default function Canvas({ mode }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1);
  camera.position.set(0, 0, 5);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('.main-canvas'),
      antialias: true,
    });

    renderer.setSize(350, 350);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    let loader = new GLTFLoader();
    loader.load('/shiba/scene.gltf', function (gltf) {
      scene.add(gltf.scene);

      function animate() {
        requestAnimationFrame(animate);
        gltf.scene.rotation.y -= 0.01;
        renderer.render(scene, camera);
      }

      animate();
    });
  }, []);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('.main-canvas'),
      antialias: true,
    });

    if (mode === 'light') {
      scene.background = new THREE.Color('white');
    } else {
      scene.background = new THREE.Color('black');
    }
    renderer.render(scene, camera);
  }, [mode]);

  return (
    <div className="main-canvas-box">
      <canvas className="main-canvas" width={350} height={350}></canvas>
    </div>
  );
}
