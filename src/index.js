import {o} from 'atp-sugar';
import {Noise} from 'noisejs';
import memoize from 'memoizee';
import {sess, origin, clear} from "./atp-minecraft";

let __debug = [];
const _debug = msg => __debug.push(msg);
const _printDebug = () => {throw __debug.join("\n");}

// This may throw an exception that is caught by the script processor
const noise = new Noise(1234);
const size = (+argv[1]) || 10;
const scale = 100;

const _height = (x, z, octaves, scale, magnitude, falloff) => 
    (noise.perlin2(x/scale, z/scale) + 1)*magnitude + (octaves > 1
        ? _height(x, z, octaves - 1, scale / falloff, magnitude / falloff, falloff)
        : 0.0
    );

const _heightZeroed = (x, z, octaves, scale, magnitude, falloff) => 
    noise.perlin2(x/scale, z/scale)*magnitude + (octaves > 1
        ? _heightZeroed(x, z, octaves - 1, scale / falloff, magnitude / falloff, falloff)
        : 0.0
    );

const r1 = 22255;
const r2 = 243524;
const r3 = 234234;
const r4 = 325735435;
const offset = 50;
const topHeight    = memoize((x, z) =>       _height(  x   ,   z   , 8,       50,     10, 2.0));
const bottomHeight = memoize((x, z) =>       _height(x + r1, z + r1, 3,        8, size/2, 1.5));
const wave         = memoize((x, z) =>       _height(x + r2, z + r2, 3,      100,   size / 2, 2.0));
const borderWave   = memoize((x, z) => _heightZeroed(x + r3, z + r3, 3, size * 2,   size, 2.0));
const borderHeight = memoize((x, z) =>       _height(x + r4, z + r4, 8,       20,   size, 2.0));

//Clear the area we'll be filling
// clear
//     .from(origin.x, 6, origin.z)
//     .to(origin.x + size, 255, origin.z + size);

//Add the blocks
for(x=-size*2; x<size*2; x++) {
    for(z=-size*2; z<size*2; z++) {
        const xOffset = x + borderWave(x, z);
        const zOffset = z + borderWave(x, z);
        const X = origin.x + x;
        const Z = origin.z + z;
        const distFromCenter = Math.sqrt(xOffset*xOffset + zOffset*zOffset);
        const m = (size - distFromCenter) / size;

        const mTop = Math.sqrt(Math.sqrt(m));
        const mBorder = Math.pow((1-m) * 1.05, 8) - Math.pow((1-m)* 1.05, 12);
        const max = offset + Math.floor(mTop * topHeight(X, Z) + mBorder * borderHeight(X, Z)) - 15;

        const mBottom = Math.pow(m, 1.5);
        const min = offset - Math.ceil(mBottom*(bottomHeight(X, Z)-size / 2));
        
        const waveHeight = wave(X, Z);

        for(y=min + waveHeight; y<=max + waveHeight; y++) {
            const stone = context.getBlock(BlockID.STONE);
            const dirt = context.getBlock(BlockID.DIRT);
            const grass = context.getBlock(BlockID.GRASS);
            sess.rawSetBlock(origin.add(x, y - origin.y, z),
                y < max + waveHeight - 2 || y < min + waveHeight + 3 ? stone :
                y < max + waveHeight ? dirt :
                grass
            );
        }
    }
}
