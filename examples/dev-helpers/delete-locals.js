const del = require('del');

(async () => {
    const deletedPaths = await del([
        './node_modules/moment/locale/*.js',
        '!./node_modules/moment/locale/en-gb.js',
        '!./node_modules/moment/locale/ja.js',
    ]);

    console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
})();
