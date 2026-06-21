import { useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * Rasterize an SVG/PNG URL onto a transparent square CanvasTexture. Drawing the
 * logo once to a 128px canvas keeps the GPU upload tiny and avoids per-frame SVG
 * work. A failed icon simply resolves to null (no broken-image artifacts in WebGL).
 */
export function makeIconTexture(url, size = 128) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const iw = img.naturalWidth || size;
            const ih = img.naturalHeight || size;
            const scale = Math.min(size / iw, size / ih);
            const w = iw * scale;
            const h = ih * scale;
            ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
            const tex = new THREE.CanvasTexture(canvas);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = 4;
            tex.needsUpdate = true;
            resolve(tex);
        };
        img.onerror = reject;
        img.src = url;
    });
}

/**
 * Load an array of { icon } items into CanvasTextures, keyed by array index.
 * Returns a sparse array `textures` where textures[i] is the THREE texture for
 * item i (or undefined until/unless it loads). Disposes everything on unmount.
 */
export function useIconTextures(items) {
    const [textures, setTextures] = useState([]);

    useEffect(() => {
        let alive = true;
        const created = [];
        Promise.all(
            items.map((it) =>
                makeIconTexture(it.icon)
                    .then((tex) => {
                        created.push(tex);
                        return tex;
                    })
                    .catch(() => null)
            )
        ).then((res) => {
            if (alive) setTextures(res);
            else created.forEach((t) => t.dispose());
        });
        return () => {
            alive = false;
            created.forEach((t) => t.dispose());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return textures;
}

export default useIconTextures;
