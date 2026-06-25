const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../../public');
const files = [
  'house-img.png',
  'condo-img.png',
  'office-img.jpg'
];

async function processImages() {
  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace(/\.(png|jpg)$/, '-nobg.png'));
    
    if (fs.existsSync(inputPath)) {
      console.log(`Processing ${file}...`);
      try {
        const blob = await removeBackground(inputPath);
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync(outputPath, buffer);
        console.log(`Saved transparent image to ${outputPath}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

processImages();
