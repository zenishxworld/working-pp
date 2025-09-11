import { Cache, TextureLoader, WebGLRenderer } from 'three';
import { DRACOLoader, GLTFLoader } from 'three-stdlib';

// Enable caching for all loaders
Cache.enabled = true;

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * GLTF model loader configured with draco decoder
 */
export const modelLoader = gltfLoader;
export const textureLoader = new TextureLoader();

/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = scene => {
  scene?.traverse(object => {
    if (!object.isMesh) return;

    object.geometry.dispose();

    if (object.material.isMaterial) {
      cleanMaterial(object.material);
    } else {
      for (const material of object.material) {
        cleanMaterial(material);
      }
    }
  });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = material => {
  material.dispose();

  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose();

      // Close GLTF bitmap textures
      value.source?.data?.close?.();
    }
  }
};

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = renderer => {
  renderer.dispose();
  renderer = null;
};

/**
 * Check if the environment can create a WebGL context
 */
export const isWebGLAvailable = () => {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    const optsList = [
      {},
      { alpha: true },
      { alpha: true, antialias: false },
    ];
    for (const opts of optsList) {
      const gl =
        canvas.getContext('webgl', opts) || canvas.getContext('experimental-webgl', opts);
      if (gl) {
        gl.getExtension('WEBGL_lose_context')?.loseContext?.();
        return true;
      }
    }
    return false;
  } catch (e) {
    return false;
  }
};

/**
 * Safely create a WebGLRenderer; returns null if context creation fails.
 */
export const createSafeWebGLRenderer = (options = {}) => {
  try {
    return new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false,
      ...options,
    });
  } catch (e) {
    console.error('WebGL initialization failed', e);
    return null;
  }
};

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = lights => {
  for (const light of lights) {
    light.parent.remove(light);
  }
};

/**
 * Get child by name
 */
export const getChild = (name, object) => {
  let node;

  object.traverse(child => {
    if (child.name === name) {
      node = child;
    }
  });

  return node;
};
