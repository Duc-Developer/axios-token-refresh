const build = async () => {
    // ESM build
    const esmResponses = await Bun.build({
        entrypoints: ['src/index.ts'],
        outdir: './dist',
        format: 'esm',
        naming: "[dir]/[name].esm.[ext]",
        minify: true,
        external: ['axios'],
    });
    if (!esmResponses.success) {
        throw new AggregateError(esmResponses.logs, "Bundle .esm failed");
    }

    // CJS build
    const cjsResponses = await Bun.build({
        entrypoints: ['src/index.ts'],
        outdir: './dist',
        format: 'cjs',
        naming: "[dir]/[name].cjs.[ext]",
        minify: true,
        external: ['axios'],
    });
    if (!cjsResponses.success) {
        throw new AggregateError(cjsResponses.logs, "Bundle .cjs failed");
    }
};

build();