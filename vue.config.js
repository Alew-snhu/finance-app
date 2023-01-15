module.exports = {
    devServer: {
        port: 7130, // CHANGE YOUR PORT HERE!
        proxy: {
            '/api': {
                target: 'http://localhost:7129',
                ws: true,
                changeOrigin: true,
            }
        },
    },
}