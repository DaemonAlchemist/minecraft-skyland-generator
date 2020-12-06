import { origin, sess, getSession } from "./atp-minecraft";
import { dirt, grass, stone } from "./blocks";

// Create a Skyland
//    xCenter: x-coordinate of the center of the skyland, relative to the player
//    yTop: y-coordinate for the top of the skyland at its center
//    zCenter: x-coordinate of the center of the skyland, relative to the player
//    size: size of the skyland
export const createSkyland = (xCenter, yTop, zCenter, size, createGenerator) => {
    const getColumnExtents = createGenerator(size);

    // Determine where the player is
    let [skylandTop, {}] = getColumnExtents(0, 0, origin.x + xCenter, origin.z + zCenter, size);

    //Add the blocks
    const sess = getSession();
    for(x=-size*2; x<size*2; x++) {
        for(z=-size*2; z<size*2; z++) {
            // Determine absolute x and z coordinates for this block
            const X = origin.x + xCenter + x;
            const Z = origin.z + zCenter + z;

            const [max, min] = getColumnExtents(x, z, X, Z, size);
            
            // Iterate from the bottom of the skyland to the top, and generate the blocks
            for(y=min; y<=max; y++) {
                sess.rawSetBlock(origin.add(x + xCenter, y - origin.y + yTop - skylandTop - 1, z + zCenter),
                    y < max - 2 || y < min + 3 ? stone() :
                    y < max ? dirt() :
                    grass()
                );
            }
        }
    }
}
