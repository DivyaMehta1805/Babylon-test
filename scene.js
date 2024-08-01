import * as BABYLON from '@babylonjs/core';
import { setupGUI } from './gui.js';
import { setupEventHandlers } from './eventHandlers.js';

export const createScene = (engine, canvas) => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Create ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    ground.material = groundMaterial;

    // Setup GUI and event handlers
    const { isDrawMode, isProtrusionMode, isMoveMode } = setupGUI(scene, camera, canvas);
    setupEventHandlers(scene, ground, isDrawMode, isProtrusionMode, isMoveMode);

    return scene;
};