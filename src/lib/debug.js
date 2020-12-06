let _debug = [];
export const debug = msg => _debug.push(msg);
export const printDebug = () => {throw _debug.join("\n") + "\n\n";}
