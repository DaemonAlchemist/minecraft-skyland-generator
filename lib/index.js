var _atpSugar = require('atp-sugar');

var _noisejs = require('noisejs');

var _memoizee = require('memoizee');

var _memoizee2 = _interopRequireDefault(_memoizee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

sess = context.remember();
origin = player.getBlockIn();

var __debug = [];
var _debug = function _debug(msg) {
    return __debug.push(msg);
};
var _printDebug = function _printDebug() {
    throw __debug.join("\n");
};

// This may throw an exception that is caught by the script processor
block = context.getBlock(argv[1]);
var noise = new _noisejs.Noise(1234);
var size = argv[2] || 10;
var scale = 100;
var magnitude = 10;
var falloff = 2.0;

var _height = function _height(x, z, octaves, scale, magnitude) {
    return (noise.perlin2(x / scale, z / scale) + 1) * magnitude + (octaves > 1 ? _height(x, z, octaves - 1, scale / falloff, magnitude / falloff) : 0.0);
};
var height = (0, _memoizee2.default)(function (x, z) {
    return Math.floor(_height(x, z, 8, 100, 10));
});

//Add the blocks
var randOffset = 999;
for (x = 0; x < size; x++) {
    for (z = 0; z < size; z++) {
        var xOffset = x - Math.floor(size / 2);
        var zOffset = z - Math.floor(size / 2);
        var X = origin.x + xOffset;
        var Z = origin.z + zOffset;
        var distFromCenter = Math.sqrt(xOffset * xOffset + zOffset * zOffset);
        var max = height(X, Z) - distFromCenter;
        var min = height(X + randOffset, Z + randOffset) - 10 + distFromCenter;
        // const min = Math.min(
        //     max,
        //     height( X , Z-1) + 1,
        //     height(X-1,  Z ) + 1,
        //     height( X , Z+1) + 1,
        //     height(X+1,  Z ) + 1
        // );
        for (y = min; y <= max; y++) {
            sess.setBlock(origin.add(x, y - origin.y, z), block);
        }
    }
}