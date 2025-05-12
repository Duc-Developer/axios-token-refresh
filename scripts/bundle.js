const build = async () => {
    const minifyResponses = await Bun.build({
        entrypoints: ['src/index.ts'],
        outdir: './dist',
        format: 'esm',
        naming: "[dir]/[name].esm.[ext]",
        minify: true,
        external: ['axios'], 
    });
    if (!minifyResponses.success) {
        throw new AggregateError(esmResponses.logs, "Bundle .esm failed");
    }
};

build();