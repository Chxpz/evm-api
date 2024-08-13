module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '^@handlers/(.*)$': '<rootDir>/src/handlers/$1',
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@routes/(.*)$': '<rootDir>/src/routes/$1',
      '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
      '^@types/(.*)$': '<rootDir>/src/types/$1',
      // '^@(.*)$': '<rootDir>/src/$1',  // Comentado temporariamente
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/__tests__/**',
      '!src/**/*.d.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
  };
  