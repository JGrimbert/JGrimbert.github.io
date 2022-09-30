module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  collectCoverage: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['./jest.setup.js'],
}
