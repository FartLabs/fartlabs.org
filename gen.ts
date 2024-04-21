import { createNoise2D } from "simplex-noise";

const noise = createNoise2D();

// deno run gen.ts
//
if (import.meta.main) {
  const path1 = [
    { x: 16, y: 16 },
    { x: 84, y: 16 },
    { x: 84, y: 84 },
    { x: 16, y: 84 },
  ];
  const path2 = [
    { x: 84, y: 84 },
    { x: 16, y: 84 },
    { x: 16, y: 16 },
    { x: 84, y: 16 },
  ];
  const verticesAmount = Deno.args[0] ? parseInt(Deno.args[0]) : 20;
  const tubeSVG = renderTube(
    renderBubbles(path1, verticesAmount, 15),
    renderBubbles(path2, verticesAmount, 15),
  );

  Deno.writeTextFileSync("tube.svg", tubeSVG);
}

function renderTube(...children: string[]) {
  return [
    `<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>`,
    `<rect filter="blur(1px)" stroke="#C3EF3Caa" stroke-width="28" x="16" y="16" width="68" height="68" rx="16" ry="16" />`,
    `<rect stroke="#fffffff0" stroke-width="2" x="3" y="3" width="94" height="94" rx="24" ry="24" />`,
    `<rect stroke="#fffffff0" stroke-width="2" x="29" y="29" width="42" height="42" rx="6" ry="6" />`,
    ...children,
    `<rect filter="blur(2px)" stroke="#ffffffaa" stroke-width="7.5" x="17.5" y="17.5" width="66" height="66" rx="12" ry="12" />`,
    `</svg>\n`,
  ].join("\n");
}

function renderBubbles(
  path: Vertex[],
  amount: number,
  totalBubbles: number,
): string {
  const duration = 10;
  return Array.from(
    { length: totalBubbles },
    (_, i) =>
      renderBubble(
        path,
        amount,
        Math.random(),
        duration,
        -i * (duration / totalBubbles),
      ),
  ).join("");
}

function renderBubble(
  path: Vertex[],
  amount: number,
  seed: number,
  duration: number,
  delay = 0,
): string {
  const vertices = generateVertices(path, amount, seed);
  return [
    '<circle r="2" fill="#000" fill-opacity="60%">',
    `<animateMotion dur="${duration}s" repeatCount="indefinite" begin="${delay}s" `,
    `path="${renderVertices(vertices)}"`,
    "/>",
    "</circle>",
  ].join("");
}

function renderVertices(vertices: Vertex[]): string {
  let path = "M ";
  for (const vertex of vertices) {
    path += `${vertex.x},${vertex.y} `;
  }

  return path.trim() + " Z";
}

interface Vertex {
  x: number;
  y: number;
}

/**
 * iteratePath iterates over a path of vertices divided into `amount` segments.
 */
function* iteratePath(
  path: Vertex[],
  amount: number,
): Iterable<Vertex> {
  const pathLength = path.length;
  for (let i = 0; i < amount; i++) {
    const t = i / (amount - 1);
    const index = t * (pathLength - 1);
    const indexFloor = Math.floor(index);
    const indexCeil = Math.ceil(index);
    const vertexA = path[indexFloor];
    const vertexB = path[indexCeil];
    const vertex = lerpVertex(vertexA, vertexB, index - indexFloor);
    yield vertex;
  }
}

/**
 * lerpVertex returns a vertex that is `t` percent between `a` and `b`.
 */
function lerpVertex(a: Vertex, b: Vertex, t: number): Vertex {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
  };
}

/**
 * lerp returns a value that is `t` percent between `a` and `b`.
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * getOffset returns a random offset based on the noise at the given position.
 */
function getOffset(
  maxOffset: number,
  theta: number,
  offsetX = 0,
  offsetY = offsetX,
  offsetR = 16,
) {
  const x = Math.cos(theta) * offsetR + offsetX;
  const y = Math.sin(theta) * offsetR + offsetY;
  return (noise(x, y) - 0.5) * maxOffset;
}

/**
 * generateVertices generates a set of vertices based on a path and a seed
 * used for Simplex noise using the polar noise technique.
 *
 * @see
 * [Coding Challenge #136.1: Polar Perlin Noise Loops](https://youtu.be/ZI1dmHv3MeM)
 */
function generateVertices(
  path: Vertex[],
  amount: number,
  seed: number,
  variance = 6.67,
  fractionDigits = 2,
) {
  if (
    path[0].x !== path[path.length - 1].x ||
    path[0].y !== path[path.length - 1].y
  ) {
    path.push({ x: path[0].x, y: path[0].y });
  }

  const seedX = seed * 1e3;
  const seedY = seedX * -1;
  return Array.from(iteratePath(path, amount))
    .map((v, i, { length }) => {
      const theta = (i / length) * Math.PI * 2;
      const offsetX = getOffset(variance, theta, seedX);
      const offsetY = getOffset(variance, theta, seedY);
      return {
        x: Number((v.x + offsetX).toFixed(fractionDigits)),
        y: Number((v.y + offsetY).toFixed(fractionDigits)),
      };
    });
}
