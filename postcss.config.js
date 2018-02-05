module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'last 2 versions',
                'iOS >= 6',
                'Safari >= 5',
                'android >= 4',
                'ie >= 9'
            ]
        })
    ]
};
