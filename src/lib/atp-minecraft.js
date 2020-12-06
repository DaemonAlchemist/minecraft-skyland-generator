import { air } from "./blocks";

importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

export const getSession = () => context.remember();
export const origin = player.getBlockIn();

const angle = player.getLocation().getYaw();
export const look = {
    x: -Math.sin(angle * Math.PI / 180.0),
    z: Math.cos(angle * Math.PI / 180.0),
};

export const clear = (sess) => ({
    from: (x1, y1, z1) => ({
        to: (x2, y2, z2) => {
            for(x=x1; x<=x2; x++) {
                for(y=y1; y<=y2; y++) {
                    for(z=z1; z<=z2; z++) {
                        sess.setBlock(new Vector(x, y, z), air());
                    }
                }
            }
        }
    })
});
