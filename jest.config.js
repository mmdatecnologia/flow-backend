module.exports = {
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
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
    '!<rootDir>/src/**/*.module.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.dto.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.entity.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.enum.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.interface.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.config.{js,jsx,ts,tsx}'
  ]
}
