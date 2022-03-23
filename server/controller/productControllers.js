const { orderByChild, equalTo, query } = require('firebase/database');
const { db, ref, get } = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const dbRef = ref(db, 'products');
    const data = await get(dbRef);
    if (!data.val()){
      res.json({
        success: false,
        message: '找不到該商品'
      })
    } else {
      let dataArr = [];
      data.forEach((childSnapshot) => {
        let data = childSnapshot.val()
        data.id = childSnapshot.key
        dataArr.push(data)
      });
      res.json({
        success: true,
        products: dataArr
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error'
    });
  }
}

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const qty = Number(req.query.qty);
    const dbRef = ref(db, `products/${productId}`);
    const data = await get(dbRef);
    if (!data.val()){
      res.json({
        success: false,
        message: '找不到該商品'
      })
    } else if (qty){
      // use for cart page: if query.qty > 0 then include qty in returned json obj
      let obj = data.val()
      obj.id = productId
      res.json({
        success: true,
        product: obj,
        id: productId,
        qty
      });
    } else {
      let obj = data.val()
      obj.id = productId
      res.json({
        success: true,
        product: obj,
        id: productId
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error'
    });
  }
}

const getCategory = async (req, res) => {
  try {
    const category = req.params.cat;
    const dbRef = ref(db, 'products');
    const data = await get(query(dbRef, orderByChild('category-en'), equalTo(category)));
    if (!data.val()){
      res.json({
        success: false,
        message: '找不到該類別'
      })
    } else {
      let dataArr = [];
      data.forEach((childSnapshot) => {
        let data = childSnapshot.val()
        data.id = childSnapshot.key
        dataArr.push(data)
      });
      res.json({
        success: true,
        products: dataArr
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error'
    });
  }
}

module.exports = { getAllProducts, getProduct, getCategory }