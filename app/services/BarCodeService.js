const bwipjs = require('bwip-js');
const fs = require('fs');

module.exports = {
  generateBarCode: async function (user) {
    try {
      await bwipjs.toBuffer(
        {
          bcid: 'bc412', // Barcode type
          text: user._id.toString().toUpperCase(), // Text to encode
          scale: 3, // 3x scaling factor
          height: 10, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: 'center', // Always good to set this
        },
        function (err, png) {
          if (err) {
            throw err;
          } else {
            fs.writeFileSync(`./assets/imgs/barcode/${user._id}.png`, png);
          }
        }
      );
      user.save();

      return `./assets/imgs/barcode/${user._id}.png`;
    } catch (e) {
      throw Error('Impossible de générer le code bar : ' + e.message);
    }
  },
};
