module.exports = {
  rootDir: 'src',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            jsx: true,
            syntax: 'ecmascript',
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
        isModule: 'unknown',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '../jest.setup.js',
    // Resolve 'ReferenceError: regeneratorRuntime is not defined' error
    'regenerator-runtime/runtime',
    '../jest.setup.js',
  ],
  verbose: true,
  collectCoverage: true,
  testTimeout: 10000,
  // coverageThreshold: {
  //   global: {
  //     branches: 48,
  //     functions: 48,
  //     lines: 48,
  //     statements: 48,
  //   },
  // },
  collectCoverageFrom: [
    // Collect
    '**/*.(jsx|js)',

    // Ignore
    '!coverage/**/*',
  ],
  clearMocks: true,
};