import {o} from 'atp-sugar';
import {Noise} from 'noisejs';

importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

sess = context.remember();
origin = player.getBlockIn();

// This may throw an exception that is caught by the script processor
block = context.getBlock(argv[1]);
const noise = new Noise(1234);
const size = 10;
const scale = 0.1;
const magnitude = 10;
const thickness = 10;
for(i=0; i<size; i++) {
    for(j=0; j<size;j++) {
        const y = (noise.perlin2((origin.x+i)*scale, (origin.z+j)*scale) + 1)*magnitude;
        for(k=thickness; k>=0; k--) {
            sess.setBlock(origin.add(i, y + k - origin.y, j), block);
        }
    }
}
