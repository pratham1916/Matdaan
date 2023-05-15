const path = require('path');
const crypto = require('crypto');
const fs = require('fs-extra');
const multer = require('multer');

const diskStorage = (folder) => {
    const baseDir = path.join(__dirname, '../dist');
    fs.mkdirs(path.join(baseDir, `/uploads/${folder}`));
    return multer.diskStorage({
        destination: (_, __, cb) => cb(null, path.join(baseDir, `/uploads/${folder}`)),
        filename: (_, file, cb) => {
            crypto.pseudoRandomBytes(16, (_, raw) => cb(null, `${raw.toString('hex')}${Date.now()}${path.extname(file.originalname)}`))
        }
    });
};

const cleanUp = (files) => {
    const baseDir = path.join(__dirname, 'uploads')
    files.forEach(async (file) => {
        const filePath = path.join(baseDir, file);
        const stat = await fs.stat(filePath);
        if (!file.startsWith(".") && !file.startsWith("..") && filePath.startsWith(baseDir) && stat.isFile()) {
            await fs.remove(filePath)
        };
    });
};

const isUpdated = ( result ) => result.modifiedCount > 0;
const isDeleted = ( result ) => result.deletedCount > 0;

module.exports = { diskStorage, cleanUp, isUpdated, isDeleted };