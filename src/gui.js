import * as BABYLON from '@babylonjs/core';
import '@babylonjs/gui';

export const setupGUI = (scene, camera, canvas) => {
    let isDrawMode = false;
    let isProtrusionMode = false;
    let isMoveMode = false;
    let originalCameraKeyboardInput;

    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Create buttons (drawButton, protrusionButton, moveextrudedButton)
    // ... (copy the button creation code from the original file)
    const drawButton = BABYLON.GUI.Button.CreateSimpleButton("drawButton", "Enter Draw Mode");
    drawButton.width = "150px";
    drawButton.height = "40px";
    drawButton.color = "white";
    drawButton.cornerRadius = 20;
    drawButton.background = "green";
    drawButton.top = "10px";
    drawButton.left = "10px";
    advancedTexture.addControl(drawButton);
    const protrusionButton = BABYLON.GUI.Button.CreateSimpleButton("protrusionButton", "Enter Protrusion Mode");
protrusionButton.width = "150px";
protrusionButton.height = "40px";
protrusionButton.color = "black";
protrusionButton.cornerRadius = 20;
protrusionButton.background = "yellow";
protrusionButton.top = "60px"; // Adjusted to avoid overlap with drawButton
protrusionButton.left = "10px"; // Aligned with drawButton's left position
protrusionButton.isVisible = true;
advancedTexture.addControl(protrusionButton);

const moveextrudedButton = BABYLON.GUI.Button.CreateSimpleButton("moveButton", "Enter Move Mode");
moveextrudedButton.width = "150px";
moveextrudedButton.height = "40px";
moveextrudedButton.color = "white";
moveextrudedButton.cornerRadius = 20;
moveextrudedButton.background = "blue";
moveextrudedButton.top = "110px"; // Adjusted to avoid overlap with protrusionButton
moveextrudedButton.left = "10px"; // Aligned with drawButton's left position
moveextrudedButton.isVisible = false;
advancedTexture.addControl(moveextrudedButton);

drawButton.onPointerUpObservable.add(() => {
    isDrawMode = !isDrawMode;
    if (isDrawMode) {
        drawButton.background = "red";
        drawButton.children[0].text = "Exit Draw Mode";
        protrusionButton.isVisible = false;
        camera.detachControl(canvas);
                    moveextrudedButton.isVisible=false;

    } else {
        drawButton.background = "green";
        drawButton.children[0].text = "Enter Draw Mode";
        protrusionButton.isVisible = true;
        camera.attachControl(canvas, true);
         vertices = [];
    vertexMeshes.forEach(mesh => mesh.dispose());
    vertexMeshes = [];
    lines.forEach(line => line.dispose());
    lines = [];
    moveextrudedButton.isVisible=true;
    }
});
let isDragging = false;
let dragStartPosition = null;
let selectedMesh = null;
protrusionButton.onPointerUpObservable.add(() => {
    isProtrusionMode = !isProtrusionMode;
    if (isProtrusionMode) {
        protrusionButton.background = "red";
        protrusionButton.children[0].text = "Exit Protrusion Mode\nUse Up/Down Arrows";
        drawButton.isVisible = false;
        camera.detachControl(canvas);
        protrusionButton.isVisible=true;
        drawButton.isVisible=false;
        moveextrudedButton.isVisible=false;
        // Disable camera keyboard input
        originalCameraKeyboardInput = camera.inputs.attached.keyboard;
        camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
    } else {
        protrusionButton.background = "blue";
        protrusionButton.children[0].text = "Enter Protrusion Mode";
        drawButton.isVisible = true;
        moveextrudedButton.isVisible=true;

        
        // Re-enable camera keyboard input
        camera.inputs.add(originalCameraKeyboardInput);
    }
});
moveextrudedButton.onPointerUpObservable.add(() => {
isMoveMode = !isMoveMode;
moveextrudedButton.background = isMoveMode ? "red" : "blue";
moveextrudedButton.children[0].text = isMoveMode ? "Stop Moving" : "Move Extruded Object";

// Log button click event
console.log(isMoveMode ? "Move mode activated." : "Move mode deactivated.");
});
    // Add button click handlers
    // ... (copy the button click handlers from the original file)

    return { isDrawMode, isProtrusionMode, isMoveMode };
};