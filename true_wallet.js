const axios = require('axios');
const { phonenumber } = require("./settings.json");


const headers = {
    'Host': 'gift.truemoney.com',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0'
}


module.exports = (url)=>{
    let matchResult = url.match(/[A-Z0-9a-z]+$/);
    let body = {
        mobile: phonenumber,
        voucher_hash: matchResult[0]
    }
    axios.post(`https://gift.truemoney.com/campaign/vouchers/${body.voucher_hash}/redeem`,body, {
        "headers": headers
        
    }).then(res=>{
        if (res.data.status.message == 'success') {
            console.log("success!");
            console.log("voucher_id : " + res.data.voucher.voucher_id);
            console.log("amount_baht : " + res.data.voucher.amount_baht);
            console.log("detail : " + res.data.voucher.detail);
            console.log("profile_pic : " + res.data.tickets.profile_pic);

        } else {
            console.log("unsuccess!");
        }
    })
}


