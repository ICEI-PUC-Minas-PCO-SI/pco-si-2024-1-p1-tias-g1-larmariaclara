const fs = require('fs/promises');
const path = require('path')

function getName(){
    return `${Math.floor(Math.random() * 10000000)}.jpg`
}

module.exports.upload = async function(files, name){
    try {
        const tempPath = files[name][0].filepath;
        const fileName = getName();
        const uploadPath = path.join(__dirname, '../', app.PROJECT_PATH, '/public/images', fileName);

        await fs.rename(tempPath, uploadPath);
        return { name: app.concat('/images/', fileName) };
    } catch (err) {
        return { error: 1 };
    }
}

/*
module.exports.upload = async function(files, name){
    if (!files || !files[name] || !files[name].length) {
        return { error: 1, message: 'No file uploaded or invalid file object.' };
    }
    
    const file = files[name][0];
    if (file.size > app.MAX_FILE_SIZE) {
        return { error: 2, message: 'File size exceeds maximum limit.' };
    }
    
    const fileName = getName(file.originalname);
    const filePath = path.join(__dirname, '../', app.PROJECT_PATH, '/public/images', fileName);
    
    try {
        await fs.writeFile(filePath, file.filepath || file.path);
    } catch (error) {
        console.error('Error uploading file:', error);
        return { error: 3, message: 'Error saving uploaded file.' };
    }
    
    return path.join('/images/', fileName);
}

*/