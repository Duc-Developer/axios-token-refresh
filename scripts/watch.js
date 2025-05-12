import chokidar from 'chokidar';
import { spawn } from 'child_process';

const watcher = chokidar.watch('./src', {
    ignored: /(^|[\/\\])\../, // Ignore dotfiles
    persistent: true,
});

const runTypeScript = () => {
    return new Promise((resolve, reject) => {
        console.log('Compiling TypeScript...');
        const tscProcess = spawn('bun', ['x', 'tsc'], { stdio: 'inherit' });

        tscProcess.on('close', (code) => {
            if (code === 0) {
                console.log('TypeScript compilation completed successfully.');
                resolve();
            } else {
                console.error(`TypeScript compilation failed with exit code ${code}.`);
                reject(new Error('TypeScript compilation failed.'));
            }
        });
    });
};

// Run the build script
const runBuild = async () => {
    try {
        await runTypeScript();
        console.log('Changes detected. Rebuilding...');
        const buildProcess = spawn('bun', ['run', 'scripts/bundle.js'], { stdio: 'inherit' });

        buildProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Build completed successfully.');
            } else {
                console.error(`Build failed with exit code ${code}.`);
            }
        });
    } catch (error) {
        console.error(error.message);
    }
};

runBuild();

watcher.on('change', (path) => {
    console.log(`File changed: ${path}`);
    runBuild();
});

console.log('Watching for file changes...');