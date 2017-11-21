# CraftScript ES6/Babel/Webpack Boilerplate #
Utilize the power of the modern Javascript ecosystem to script MineCraft.  

## Features include: ##
- Import and use any module in the [npm](http://npmjs.com) repository.
- Write your scripts using modern ES6 Javascript syntax.
- Compile and install scripts into MineCraft automatically.
- Use utility functions to simplify common tasks.

## Installation ##
```bash
> mkdir craftscript-boilerplate
> cd craftscript-boilerplate
> git clone https://github.com/DaemonAlchemist/atp-craftscript-boilerplate.git .
> npm install
```

## Dependencies ##
- [NPM](https://www.npmjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [Forge](https://files.minecraftforge.net/)
- [WorldEdit](https://minecraft.curseforge.com/projects/worldedit)
- [Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino)

## Usage ##
In `webpack.config.js`, change the value of `scriptName` to whatever you want to use to invoke your script.  For example, if you name your script `testScript`, you would invoke it in the MineCraft chat window with
```
/cs testScript <args>
```
Then run `npm start` to begin watching your code.  Whenever you save any `*.js` file, the daemon will invoke Webpack, which will compile the scripts and install them directly into MineCraft, where they can be used immediately.

## Caveats ##
- The Rhino plugin implements a fairly old version of Javascript, so some new-ish standard functions (such as `Array.prototype.fill()`) are not available.  Import and/or write polyfills for any missing functionality that you need.
- `console` is not available, so debugging needs to be done with `player.print(String msg)`.
