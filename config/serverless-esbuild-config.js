module.exports = () => {
  return {
    packager: 'npm',
    bundle: true,
    minify: true,
    sourcemap: false,
    platform: 'node',
    target: 'node20',
    keepNames: true,
    watch: {
        "pattern": [, 'src/**/*.ts'],
        "ignore" : ['.serverless/**/*', '.build', 'dist', 'nodemodules', 'aws-sdk' ]
    },

  };
};