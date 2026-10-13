/**
 * Build steps beside `tsc`: bundles the Blockly block (src-blockly/) into `admin/blockly.js`.
 *
 * Runs with Node's built-in type stripping (`node tasks.ts`), so only erasable TypeScript is allowed here.
 *
 *     node tasks.ts                     # all steps
 *     node tasks.ts --blockly-0-check   # type check src-blockly/
 *     node tasks.ts --blockly-1-bundle  # bundle src-blockly/blockly.ts -> admin/blockly.js
 */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { build } from 'esbuild';

const ROOT = import.meta.dirname;

function checkBlockly(): void {
    const tsc = createRequire(import.meta.url).resolve('typescript/bin/tsc');
    execFileSync(process.execPath, [tsc, '-p', join(ROOT, 'src-blockly', 'tsconfig.json')], { stdio: 'inherit' });
}

/**
 * The editor loads `admin/blockly.js` with a plain `<script>` tag, so the output has to be a
 * self-contained classic script - hence `iife` and no external imports.
 */
async function bundleBlockly(): Promise<void> {
    await build({
        entryPoints: [join(ROOT, 'src-blockly', 'blockly.ts')],
        outfile: join(ROOT, 'admin', 'blockly.js'),
        bundle: true,
        format: 'iife',
        // The editor also runs in older browsers than the toolchain's default target
        target: 'es2020',
        // Keep the translated words readable instead of \u-escaping them
        charset: 'utf8',
        banner: {
            js: '// GENERATED FILE - do not edit.\n// Source: src-blockly/blockly.ts - rebuild with `npm run build:blockly`.',
        },
        logLevel: 'info',
    });
}

if (process.argv.includes('--blockly-0-check')) {
    checkBlockly();
} else if (process.argv.includes('--blockly-1-bundle')) {
    await bundleBlockly();
} else {
    checkBlockly();
    await bundleBlockly();
}
