const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const inputFile = path.join(__dirname, 'public', 'images', 'black.png');
const outputDir = path.join(__dirname, 'public', 'images');

sizes.forEach(size => {
  sharp(inputFile)
    .resize(size, size)
    .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
    .then(info => console.log(`Created ${size}x${size} icon`))
    .catch(err => console.error(`Error creating ${size}x${size} icon:`, err));
});
