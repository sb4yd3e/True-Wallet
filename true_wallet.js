const axios = require('axios');
const { phonenumber } = require("./settings.json");


  
const t = [];
module.exports = async (url)=>{
    const headers = {
        'Host': 'gift.truemoney.com',
        'Connection': 'keep-alive',
        'Content-Length': '76',
        'sec-ch-ua': '"Not A(Brand";v="99", "Opera GX";v="107", "Chromium";v="121"',
        'accept': 'application/json',
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0',
    };
    let matchResult = await url.match(/[A-Z0-9a-z]+$/);
    let body = {
        mobile: phonenumber,
        voucher_hash: matchResult[0]
    }
    try {
        await axios.post(`https://gift.truemoney.com/campaign/vouchers/${matchResult[0]}/redeem`,body, {
            headers: headers
        }).then(async res=>{
            if (res.data.status.message == 'success') {
                console.log("success!");
                console.log("voucher_id : " + res.data.data.voucher.voucher_id);
                console.log("amount_baht : " + res.data.data.voucher.amount_baht);
                if (res.data.data.voucher.detail.length>0) {
                    console.log("detail : " + res.data.data.voucher.detail);
                };
                if (res.data.data.tickets.profile_pic) {
                    console.log("profile_pic : " + res.data.data.tickets.profile_pic);
                };
            };
        }).catch(error=>{
            if (error.response.data.data) {
                console.log("ALready accept")
            } else {
                console.log("Error by something")
            }
        })
    } catch(error) {
        console.log("Already accept?")
        return true;
    };
}

