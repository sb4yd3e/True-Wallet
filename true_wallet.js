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
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0',
        'sec-ch-ua-platform': '"Windows"',
        'Origin': 'https://gift.truemoney.com',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://gift.truemoney.com/campaign/card',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': '__cf_bm=uPO3RkMOtpDWN_S7ENFpVEdrvNNs_nYs3i1l.UBxiSk-1709455669-1.0.1.1-mIvGSP02cD5nXRdpsHlIsrPaelYKW0WfBEesO56f9DCWRCMnIJVQiEXvson00vkQ773CS2uvM49FUp9Exhhv4w; __cfruid=97c635b2e6b709bfdb6e79dbf5b97a244db43ad7-1709455669; _cfuvid=WcUphKVFjq9nUzsjMRUB.6MWk0VS7poytkEdhP9TJrA-1709455669862-0.0.1.1-604800000'
    };
    let matchResult = await url.match(/[A-Z0-9a-z]+$/);
    let body = {
        mobile: phonenumber,
        voucher_hash: matchResult[0]
    }
    let urls='https://gift.truemoney.com/campaign/vouchers/'+matchResult[0]+'/redeem';
    try {
        await axios.post(urls,body, {
            headers: headers
        }).then(async res=>{
            if (res.data.status.message == 'success') {
                console.log("success!");
                console.log("voucher_id : " + res.data.data.voucher.voucher_id);
                console.log("amount_baht : " + res.data.data.voucher.amount_baht);
                console.log("detail : " + res.data.data.voucher.detail);
                console.log("profile_pic : " + res.data.data.tickets.profile_pic);

            } else {
                console.log("unsuccess!");
                console.log("voucher_id : " + res.data.data.voucher.voucher_id);
                console.log("amount_baht : " + res.data.data.voucher.amount_baht);
                console.log("detail : " + res.data.data.voucher.detail);
                console.log("profile_pic : " + res.data.data.tickets[0].profile_pic);
            }
        }).catch(error=>{
            if (error.response.data.data) {
                console.log("ALready accept")
            } else [
                console.log("Error by something")
            ]
        })
    } catch(error) {
        console.log("Already accept?")
        return true;
    };
}

