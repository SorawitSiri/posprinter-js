console.log("STEP #1")
const escpos = require('escpos');
const iconv  = require('iconv').Iconv;
const path = require('path');
console.log("STEP #2")

// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
console.log("STEP #3")

const device  = new escpos.USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

// const options = { encoding: "CP874" }
// encoding is optional

const printer = new escpos.Printer(device);

// const logo_img = path.join(__dirname, 'logo.png');
// console.log("logo_img", logo_img);

device.open(function(error) {
  printer
  .encode('tis-620')
  .font('a')
  .align("ct")
  .size(1, 1)
  .text('Datability Co., Ltd')
  .font('a')
  .size(1, 1)
  .text('บริษัท ดาต้าบิลิตี้ จำกัด'.toString('hex'))

  .barcode('123456789123', 'EAN13')

  .qrimage('http://datability.info', function(err){
    this.style('bu')
    this.size(1, 1)
    this.font('b')
    this.text('http://datability.info')

    this.feed("lf")
    this.cut();
    this.close();
  });
  // .feed("lf")
  // .cut()
  // .close(); 

});

// 'use strict';
// // const escpos = require('../');
// const escpos = require('escpos');
// escpos.USB = require('escpos-usb');
// // const device  = new escpos.USB(0x0485, 0x7541);
// const device  = new escpos.USB();
// // const device  = new escpos.Network('localhost');
// // const device  = new escpos.Serial('/dev/usb/lp0');
// const printer = new escpos.Printer(device);


// device.open(function(err){
//   printer
//   .model('qsprinter')
//   .font('a')
//   .align('ct')
//   .style('bu')
//   .size(1, 1)
//   .encode('tis620')
//   .text('The quick brown fox jumps over the lazy dog')
//   .text('สวัสดีภาษาไทย')
//   .cut()
//   .close();
//   // .text('敏捷的棕色狐狸跳过懒狗')
//   // .barcode('1234567', 'EAN8')
//   // .qrimage('https://github.com/song940/node-escpos', function(err){
//   //   this.cut();
//   //   this.close();
//   // });

// });