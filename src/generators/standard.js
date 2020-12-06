import memoize from 'memoizee';
import { height, heightZeroed } from '../lib/height_funcs';

export const standardSkyland = (size) => {
    // Define "random" offsets for the noise functions for this skyland
    const r1 = Math.random() * 1000000000;
    const r2 = Math.random() * 1000000000;
    const r3 = Math.random() * 1000000000;
    const r4 = Math.random() * 1000000000;

    // Define noise functions for this skyland
    const topHeight    = memoize((x, z) =>       height(  x   ,   z   , 8,       50,     10, 2.0));
    const bottomHeight = memoize((x, z) =>       height(x + r1, z + r1, 3,        8, size/2, 1.5));
    const wave         = memoize((x, z) =>       height(x + r2, z + r2, 3,      100, size/2, 2.0));
    const borderWave   = memoize((x, z) => heightZeroed(x + r3, z + r3, 3, size * 2,   size, 2.0));
    const borderHeight = memoize((x, z) =>       height(x + r4, z + r4, 8,       20,   size, 2.0));

    // Define the columnExtents function for this skyland
    //    x: x-coordinate, relative to the center of the skyland
    //    z: z-coordinate, relative to the center of the skyland
    //    X: x-coordinate, absolute
    //    Z: z-coordinate, absolute
    return (x, z, X, Z, size) => {
        // Distort the skyland shape via the borderWave noise function
        const xOffset = x + borderWave(X, Z);
        const zOffset = z + borderWave(X, Z);

        // Determine how far the distorted point is from the center of the skyland as a % of the size
        const distFromCenter = Math.sqrt(xOffset*xOffset + zOffset*zOffset);
        const m = (size - distFromCenter) / size;

        // Add the top shape and the border rise together to get the final shape of the top of the skyland
        const mTop = Math.sqrt(Math.sqrt(m));
        const mBorder = Math.pow((1-m) * 1.05, 8) - Math.pow((1-m)* 1.05, 12);
        const max = Math.floor(mTop * topHeight(X, Z) + mBorder * borderHeight(X, Z)) - 15;

        // Calculate the bottom profile of the skyland
        const mBottom = Math.pow(m, 1.5);
        const min = -Math.ceil(mBottom*(bottomHeight(X, Z)-size / 2));

        // Distort the overall shape of the skyland with a wavy noise function
        const waveHeight = wave(X, Z);

        return [max + waveHeight, min + waveHeight];
    }
}
