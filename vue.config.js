module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3010',
      },
      '^/q': {
        target: 'http://localhost:3010',
      },
      '^/upload': {
        target: 'http://localhost:3010',
      },
    }
  }
}
