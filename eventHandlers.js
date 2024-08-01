import * as BABYLON from '@babylonjs/core';
import { addVertex, closeShape, extrudeShape, clearVertices } from './meshOperations.js';

export const setupEventHandlers = (scene, ground, isDrawMode, isProtrusionMode, isMoveMode) => {
    let vertices = [];
    let vertexMeshes = [];
    let lines = [];
    let currentShape = null;
    let extrusionHeight = 0.1;
    const extrusionStep = 0.1;
    const getGroundPosition = () => {
        const pickinfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => mesh === ground);
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }
        return null;
    };
    // const getGroundPosition = () => {
    //     // ... (copy the getGroundPosition function from the original file)
    // };

    // scene.onPointerDown = (evt) => {
    //     // ... (copy the onPointerDown handler from the original file)
    // };
    scene.onPointerDown = (evt) => {
        if (isDrawMode) {
            const groundPos = getGroundPosition();
            if (groundPos) {
                if (evt.button === 0) {  // Left click
                    addVertex(groundPos);
                } else if (evt.button === 2) {  // Right click
                    closeShape();
                }
            }
        }
    };

    // scene.onKeyboardObservable.add((kbInfo) => {
    //     // ... (copy the keyboard event handler from the original file)
    // });
    scene.onKeyboardObservable.add((kbInfo) => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
            onKeyDown(kbInfo.event);
        }
    });
    canvas.addEventListener("pointerdown", (evt) => {
        if (isMoveMode && evt.button === 0) { // Left click and move mode enabled
            const pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if (pickResult.hit) {
                selectedMesh = pickResult.pickedMesh;
                if (selectedMesh && selectedMesh !== ground) {
                    isDragging = true;
                    dragStartPosition = scene.pick(scene.pointerX, scene.pointerY).pickedPoint;
                }
            }
        }
    });
        canvas.addEventListener("pointermove", (evt) => {
            if (isDragging && selectedMesh) {
                const currentPosition = scene.pick(scene.pointerX, scene.pointerY).pickedPoint;
                if (currentPosition) {
                    // Move the mesh along the X-axis only
                    const deltaX = currentPosition.x - dragStartPosition.x;
                    selectedMesh.position.x += deltaX;
                    dragStartPosition.x = currentPosition.x;
                }
            }
        });
    
        canvas.addEventListener("pointerup", () => {
            isDragging = false;
            selectedMesh = null;
        });
    
    // Add other event listeners (pointerdown, pointermove, pointerup) for move mode
    // ... (copy these event listeners from the original file)
};