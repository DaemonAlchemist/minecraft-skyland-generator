import { standardSkyland } from './generators/standard';
import { look, origin } from "./lib/atp-minecraft";
import { createSkyland } from './lib/create_skyland';

// Arguments
// 1: size - the radius of the skyland (default: 10)
// 2: offset - the distance in front of you where the skyland will appear (default: 20)

// This may throw an exception that is caught by the script processor
const skylandSize = (+argv[1]) || 10;
const skylandDistance = (+argv[2]) || 20;

createSkyland(look.x * skylandDistance, origin.y, look.z * skylandDistance, skylandSize, standardSkyland);
createSkyland(look.x * skylandDistance, origin.y + 20, look.z * skylandDistance, skylandSize, standardSkyland);
createSkyland(look.x * skylandDistance, origin.y - 20, look.z * skylandDistance, skylandSize, standardSkyland);
