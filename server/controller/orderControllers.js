const { update } = require('firebase/database');
const { db, ref, push } = require('../config/db');

const sendOrder = async (req, res) => {
  try {
    const orderData = req.body
    const dbRef = ref(db, 'orders');
    await push(dbRef, orderData)
      .then(snap => {
        console.log(snap);
        res.json({
          success: true,
          message: '成功建立訂單',
          key: snap.key,
        })
      })
      .catch(err => console.log('FAIL to push', err));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error'
    });
  }
}
const updatePaymentStatus = async (req, res) => {
  try {
    const orderId = req.params.id
    const dbRef = ref(db, `orders/${orderId}`);
    update(dbRef, { 'is_paid': true })
      .then(snap => {
        console.log(snap);
        res.json({
          success: true,
          message: '成功付款'
        })
      })
      .catch(err => console.log('FAIL to push', err));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error'
    });
  }
}

module.exports = { sendOrder, updatePaymentStatus }