var myConnection = require('../../../dbConfig.js');
class Admin {
    GetAllNotice() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    var resReturn = await myConnection.query('SELECT *, DATE_FORMAT(date, "%Y-%m-%d") AS edate FROM ts_notice');
                    resolve(resReturn)
                } catch (err) {
                    reject(err)
                }
            }
        )
    }

    InsertNotice(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    var ymd = await functions.DateCreator();
                    var returnCount = await myConnection.query('SELECT LPAD(COUNT(*) + 1,3,"0") AS cnt FROM ts_notice');
                    var code = 'Notice' + returnCount[0][0].cnt;

                    await myConnection.query('INSERT INTO ts_notice (noticeid, title, date, wel, sentence_1, sentence_2, bye) VALUES (?, ?, ?, ?, ?, ?, ?)', [code, data.title, ymd, data.wel, data.sentence_1, data.sentence_2, data.bye])

                    resolve(true)
                } catch (err) {
                    reject(err)
                }
            }
        )
    }

    GetAllCates() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    var resReturn = await myConnection.query('SELECT * FROM ts_cates');
                    resolve(resReturn)
                } catch (err) {
                    reject * (err)
                }
            }
        )
    }

    InsertCates(name) {
        return new Promise (
            async (resolve, reject) => {
                try {
                    var returnCount = await myConnection.query('SELECT COUNT(*) + 1 AS cnt FROM ts_cates');
                    var code = 'C' + returnCount[0].cnt;
			console.log(code);
                    await myConnection.query('INSERT INTO ts_cates (catesid, name) VALUES (?, ?)', [code, name]);
		   resolve(true)
                } catch (err) {
                   reject(err) 
                }
            }
        )
    }
    GetAdsUri () { 
        return new Promise (
            async (resolve, reject) => {
                try {
                    await myConnection.query('SELECT * FROM ts_adsuri');

                    resolve()
                } catch (err) {
                    reject(err)
                }
            }
        )
    }
}
module.exports = new Admin();
