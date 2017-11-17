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
const scale = 100;
const magnitude = 10;
const falloff = 2.0;

const _height = (x, z, octaves, scale, magnitude) => 
    (noise.perlin2(x/scale, z/scale) + 1)*magnitude + (octaves > 1
        ? _height(x, z, octaves - 1, scale / falloff, magnitude / falloff)
        : 0.0
    );
const height = memoize((x, z) => Math.floor(_height(x, z, 8, 100, 10)));

//Add the blocks
for(x=0; x<size; x++) {
    for(z=0; z<size; z++) {
        const X = origin.x + x;
        const Z = origin.z + z;
        const max = height(X, Z);
        const min = Math.min(
            max,
            height( X , Z-1) + 1,
            height(X-1,  Z ) + 1,
            height( X , Z+1) + 1,
            height(X+1,  Z ) + 1
        );
        for(y=min; y<=max; y++) {
            sess.setBlock(origin.add(x, y - origin.y, z), block);
        }
    }
}
