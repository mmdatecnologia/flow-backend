module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx', 'json'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95
    }
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/main.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.module.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*..{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.contract.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.e2e-spec.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.mock.{js,jsx,ts,tsx}'
  ]
}
