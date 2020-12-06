import {Noise} from 'noisejs'; 

const noise = new Noise(1234);

export const height = (x, z, octaves, scale, magnitude, falloff) =>  
    (noise.perlin2(x/scale, z/scale) + 1)*magnitude + (octaves > 1 
        ? height(x, z, octaves - 1, scale / falloff, magnitude / falloff, falloff) 
        : 0.0 
    ); 
 
export const heightZeroed = (x, z, octaves, scale, magnitude, falloff) =>  
    noise.perlin2(x/scale, z/scale)*magnitude + (octaves > 1 
        ? heightZeroed(x, z, octaves - 1, scale / falloff, magnitude / falloff, falloff) 
        : 0.0 
    );
