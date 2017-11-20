importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

const sess = context.remember();
const origin = player.getBlockIn();

const clear = {
    from: (x1, y1, z1) => ({
        to: (x2, y2, z2) => {
            for(x=x1; x<=x2; x++) {
                for(y=y1; y<=y2; y++) {
                    for(z=z1; z<=z2; z++) {
                        sess.setBlock(new Vector(x, y, z), context.getBlock(BlockID.AIR));
                    }
                }
            }
        }
    })
};

export {clear, origin, sess};
