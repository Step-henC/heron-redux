import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './public/index.html'
  },
  output: {
    // keep same build output as create react app
    distPath: {
      root: 'build'
    }
  }, 
  source: {
    define: publicVars,
    include: [/[\\/]node_modules[\\/]/],
  },
  performance: {
    bundleAnalyze: {
      openAnalyzer: true
    }
  }
});