const bwipjs = require('bwip-js');
const fs = require('fs');

module.exports = {
  generateBarCode: async function (user) {
    try {
      await bwipjs.toBuffer(
        {
          bcid: 'qrcode', // Barcode type
          text: `http://192.168.1.7:5000/achat?idUser=${user._id.toString()}&montantAchat=${Math.floor(Math.random() * 100) + 1}`, // Text to encode
          scale: 3, // 3x scaling factor
          height: 40, // Bar height, in millimeters
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

      return `/assets/imgs/barcode/${user._id}.png`;
    } catch (e) {
      throw Error('Impossible de générer le code bar : ' + e.message);
    }
  },
};
