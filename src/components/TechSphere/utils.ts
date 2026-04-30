import * as THREE from "three";

export function generateSpherePoints(
  count: number,
  radius: number,
  phi: number = 0.72
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = (count === 1 ? 0 : (i / (count - 1)) * 2 - 1) * phi;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius
      )
    );
  }
  return points;
}

export function getIconQuaternion(position: THREE.Vector3): THREE.Quaternion {
  const normal = position.clone().normalize();
  const up = new THREE.Vector3(0, 1, 0);

  let tangent = new THREE.Vector3().crossVectors(up, normal);
  if (tangent.lengthSq() < 1e-6) {
    tangent = new THREE.Vector3(1, 0, 0).cross(normal);
  }
  tangent.normalize();

  const bitangent = new THREE.Vector3()
    .crossVectors(normal, tangent)
    .normalize();

  const basis = new THREE.Matrix4().makeBasis(tangent, bitangent, normal);
  return new THREE.Quaternion().setFromRotationMatrix(basis);
}

const TEXTURE_SIZE = 256;
const PADDING = 32;

export async function createIconTexture(
  slug: string,
  color: string
): Promise<THREE.CanvasTexture> {
  const url = `https://cdn.simpleicons.org/${slug}/${color}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch icon: ${slug}`);

  const svgText = await response.text();
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext("2d")!;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
      ctx.drawImage(img, PADDING, PADDING, TEXTURE_SIZE - PADDING * 2, TEXTURE_SIZE - PADDING * 2);
      URL.revokeObjectURL(objectUrl);
      resolve(new THREE.CanvasTexture(canvas));
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}

const LABEL_WIDTH = 256;
const LABEL_HEIGHT = 64;

export function createLabelTexture(name: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = LABEL_WIDTH;
  canvas.height = LABEL_HEIGHT;
  const ctx = canvas.getContext("2d")!;

  let fontFamily: string;
  try {
    fontFamily =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-display")
        .trim() || "system-ui, sans-serif";
  } catch {
    fontFamily = "system-ui, sans-serif";
  }

  let fontSize = 34;
  ctx.font = `650 ${fontSize}px ${fontFamily}`;
  while (ctx.measureText(name).width > LABEL_WIDTH - 16 && fontSize > 12) {
    fontSize--;
    ctx.font = `500 ${fontSize}px ${fontFamily}`;
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = `#${color}`;
  ctx.fillText(name, LABEL_WIDTH / 2, LABEL_HEIGHT / 2);

  return new THREE.CanvasTexture(canvas);
}
