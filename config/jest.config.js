exports.jest = {
    verbose: true,
    rootDir: '../',
    setupFiles: ['./config/jest.setup.js'],
    transform: {
        '^.+\\.js?$': 'babel-jest',
}
}