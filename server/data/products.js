require('dotenv').config();
const { db, ref, get, remove, push } = require('../config/db');
const GSheetReader = require('g-sheets-api');

const options = {
  apiKey: process.env.G_SHEET_API_KEY,
  sheetId: process.env.G_SHEET_ID,
  sheetName: 'products'
}
GSheetReader(
  options,
  async googleSheetData => {
    const dbRef = ref(db, 'products');
    await remove(dbRef).catch(() => console.log('FAIL to clear'));
    for (let item of googleSheetData){
      // convert data type
      item.countInStock = Number(item.countInStock);
      item.isBestseller = item.isBestseller === 'TRUE' ? true : false;
      item.isFeatured = item.isFeatured === 'TRUE' ? true : false;
      item.pieces = Number(item.pieces);
      item.price = Number(item.price);

      // push in firebase
      await push(dbRef, item).catch(() => console.log('FAIL to push'));
    }
    await get(dbRef).then(snap => console.log(`Total data: ${snap.size}`));
  },
  error => console.log(error, 'cannot get google sheet data')
);