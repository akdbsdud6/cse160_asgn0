// asg0.js
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return false;
  }

  // Get the rendering context for 2D
  var ctx = canvas.getContext('2d');

  // Set canvas background to black
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Default vector
  var v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(ctx, v1, "red");
}

// Function to draw a vector
function drawVector(ctx, v, color) {
  const scale = 20;
  const x = v.elements[0] * scale;
  const y = v.elements[1] * scale;

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(200, 200); // Canvas center
  ctx.lineTo(200 + x, 200 - y); // Adjust Y axis for canvas inversion
  ctx.stroke();
}

// Function to handle drawing event when the user clicks the button
function handleDrawEvent() {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  // Clear the canvas and reset the background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Read values from the input fields
  var v1x = parseFloat(document.getElementById('v1x').value);
  var v1y = parseFloat(document.getElementById('v1y').value);

  var v2x = parseFloat(document.getElementById('v2x').value);
  var v2y = parseFloat(document.getElementById('v2y').value);

  // Create the vector with user input and draw it
  var v1 = new Vector3([v1x, v1y, 0]);
  var v2 = new Vector3([v2x, v2y, 0]);

  drawVector(ctx, v1, "red");
  drawVector(ctx, v2, "blue");
}


// Function to handle operations event
function handleDrawOperationEvent() {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  // Clear canvas and reset
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Retrieve user inputs
  var v1x = parseFloat(document.getElementById('v1x').value);
  var v1y = parseFloat(document.getElementById('v1y').value);
  var v2x = parseFloat(document.getElementById('v2x').value);
  var v2y = parseFloat(document.getElementById('v2y').value);
  var scalar = parseFloat(document.getElementById('scalar').value);
  var operation = document.getElementById('operation').value;

  // Create vectors
  var v1 = new Vector3([v1x, v1y, 0]);
  var v2 = new Vector3([v2x, v2y, 0]);

  // Draw the vectors before the operation
  drawVector(ctx, v1, "red");
  drawVector(ctx, v2, "blue");

  // Perform the selected operation
  switch (operation) {
    case "add":
        var v3 = new Vector3([v1x, v1y, 0]);
        v3.add(v2);
        drawVector(ctx, v3, "green");
        break;
    case "sub":
        var v3 = new Vector3([v1x, v1y, 0]);
        v3.sub(v2);
        drawVector(ctx, v3, "green");
        break;
    case "mul":
        var v3 = new Vector3([v1x, v1y, 0]);
        var v4 = new Vector3([v2x, v2y, 0]);
        v3.mul(scalar);
        v4.mul(scalar);
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
        break;
    case "div":
        if (scalar === 0) {
            alert("Cannot divide by zero.");
            return;
        }
        var v3 = new Vector3([v1x, v1y, 0]);
        var v4 = new Vector3([v2x, v2y, 0]);
        v3.div(scalar);
        v4.div(scalar);
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
        break;
    case "magnitude":
        console.log(`Magnitude of v1: ${v1.magnitude().toFixed(2)}`);
        console.log(`Magnitude of v2: ${v2.magnitude().toFixed(2)}`);
        break;
    case "normalize":
        v1.normalize();
        v2.normalize();
        console.log("Normalized vectors drawn.");
        drawVector(ctx, v1, "green");
        drawVector(ctx, v2, "green");
        break;
    case "angle":
      const angle = angleBetween(v1, v2);
      console.log(`Angle between vectors: ${angle.toFixed(2)} degrees`);
      break;
    case "area":
      const area = areaTriangle(v1, v2);
      console.log(`Area of the triangle: ${area.toFixed(2)}`);
      break;
    default:
        alert("Invalid operation.");
}
}

function angleBetween(v1, v2) {
  const dotProduct = Vector3.dot(v1, v2);
  const magnitude1 = v1.magnitude();
  const magnitude2 = v2.magnitude();

  if (magnitude1 === 0 || magnitude2 === 0) {
      console.error("Cannot calculate angle with zero-length vectors.");
      return NaN;
  }

  const cosTheta = dotProduct / (magnitude1 * magnitude2);
  const angleRad = Math.acos(cosTheta);
  const angleDeg = angleRad * (180 / Math.PI); // Convert to degrees
  return angleDeg;
}

// Function to calculate the area of the triangle
function areaTriangle(v1, v2) {
  const crossProduct = Vector3.cross(v1, v2);
  const area = crossProduct.magnitude() / 2;
  return area;
}
