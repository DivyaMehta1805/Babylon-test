import * as BABYLON from '@babylonjs/core';

// export const addVertex = (scene, position, vertices, vertexMeshes, lines) => {
//     // ... (copy the addVertex function from the original file)
// };

// export const closeShape = (scene, vertices, lines, currentShape) => {
//     // ... (copy the closeShape function from the original file)
// };

// export const extrudeShape = (scene, currentShape, extrusionHeight) => {
//     // ... (copy the extrudeShape function from the original file)
// };

// export const clearVertices = (vertices, vertexMeshes, lines) => {
//     // ... (copy the clearVertices function from the original file)
const addVertex = (position) => {
    vertices.push(position);
    const vertexMesh = BABYLON.MeshBuilder.CreateSphere("vertex", {diameter: 0.1}, scene);
    vertexMesh.position = position;
    vertexMeshes.push(vertexMesh);
    if (vertices.length > 1 && moveextrudedButton!=true) {
        const line = BABYLON.MeshBuilder.CreateLines("line", {points: [vertices[vertices.length - 2], position]}, scene);
        lines.push(line);
    }

};

// Function to connect the last vertex to the first vertex and create a shape
const closeShape = () => {
    if (vertices.length > 2) {
        const closingLine = BABYLON.MeshBuilder.CreateLines("closingLine", {points: [vertices[vertices.length - 1], vertices[0]]}, scene);
        lines.push(closingLine);
        
        // Create a polygon from the vertices
        const polygon = new BABYLON.PolygonMeshBuilder("polygon", vertices.map(v => new BABYLON.Vector2(v.x, v.z)), scene);
        currentShape = polygon.build();
        currentShape.position.y = 0.01; // Slightly above the ground to avoid z-fighting
        
        // Set initial extrusion height
        extrusionHeight = 0.1;
        
        // Create initial extrusion
        extrudeShape();
        
        clearVertices();
        isMoveMode.isVisible=true;
    }
};

// Function to clear vertices and lines
const clearVertices = () => {
    vertices = [];
    vertexMeshes.forEach(mesh => mesh.dispose());
    vertexMeshes = [];
    lines.forEach(line => line.dispose());
    lines = [];
};

const extrudeShape = () => {
if (currentShape) {
    // Dispose of the previous extruded shape if it exists
    if (currentShape.extrudedShape) {
        currentShape.extrudedShape.dispose();
    }

    // Get the shape's points
    const shape = currentShape.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    const points = [];
    for (let i = 0; i < shape.length; i += 3) {
        points.push(new BABYLON.Vector3(shape[i], shape[i + 1], shape[i + 2]));
    }

    // Create the extruded shape
    const extrusion = BABYLON.MeshBuilder.ExtrudePolygon("extrudedShape", {
        shape: points,
        depth: extrusionHeight,
        updatable: true,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    // Adjust the position and scaling to extrude only upwards
    extrusion.position.y = 0;
    extrusion.scaling.y = -2;

    // Store the extruded shape reference
    currentShape.extrudedShape = extrusion;
    moveextrudedButton.isVisible=true;
    // Hide the original shape
    currentShape.isVisible = false;

}
};

