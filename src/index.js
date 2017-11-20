import {o} from 'atp-sugar';
import {Noise} from 'noisejs';
import memoize from 'memoizee';

importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

sess = context.remember();
origin = player.getBlockIn();

let __debug = [];
const _debug = msg => __debug.push(msg);
const _printDebug = () => {throw __debug.join("\n");}

// This may throw an exception that is caught by the script processor
block = context.getBlock(argv[1]);
const noise = new Noise(1234);
const size = argv[2] || 10;

const _height = (x, z, octaves, scale, magnitude, falloff) => 
    (noise.perlin2(x/scale, z/scale) + 1)*magnitude + (octaves > 1
        ? _height(x, z, octaves - 1, scale / falloff, magnitude / falloff, falloff)
        : 0.0
    );

const r1 = 22255;
const r2 = 243524;
const r3 = 234234;
const offset = 30;
const topHeight    = memoize((x, z) => Math.floor(_height(  x   ,   z   , 8, 100,  5, 2.0)));
const bottomHeight = memoize((x, z) => Math.floor(_height(x + r1, z + r1, 8,  5 , 10, 1.5)));
const wave         = memoize((x, z) => Math.floor(_height(x + r2, z + r2, 3, 100, 10, 2.0)));
const borderWave   = memoize((x, z) => Math.floor(_height(x + r3, z + r3, 3, 100, 10, 2.0)));

//Add the blocks
for(x=-size; x<size; x++) {
    for(z=-size; z<size; z++) {
        const X = origin.x + x + borderWave(x, z);
        const Z = origin.z + z + borderWave(x, z);
        const distFromCenter = Math.sqrt(x*x + z*z);
        const m = (size - distFromCenter) / size;
        const max = (
            wave(X, Z) + offset + m*topHeight(X, Z) +
            wave(X, Z-1) + offset + m*topHeight(X, Z-1) +
            wave(X, Z+1) + offset + m*topHeight(X, Z+1) +
            wave(X-1, Z) + offset + m*topHeight(X-1, Z) +
            wave(X+1, Z) + offset + m*topHeight(X+1, Z)
        ) / 5;
        const min = wave(X, Z) + offset - m*bottomHeight(X, Z);
        for(y=min; y<=max; y++) {
            sess.setBlock(origin.add(x, y - origin.y, z), block);
        }
    }
}
