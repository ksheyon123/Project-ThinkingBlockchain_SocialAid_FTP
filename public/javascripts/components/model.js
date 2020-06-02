var myConnection = require('../../../dbConfig.js');
class Admin {
    GetAllNotice() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    var resReturn = await myConnection.query('SELECT *, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM notice');
                    resolve(resReturn[0])
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
                    var returnCount = await myConnection.query('SELECT LPAD(COUNT(*) + 1,3,"0") AS cnt FROM notice');
                    var code = 'Notice' + returnCount[0][0].cnt;

                    await myConnection.query('INSERT INTO notice (noticeid, title, date, wel, sentence_1, sentence_2, bye) VALUES (?, ?, ?, ?, ?, ?, ?)', [code, data.title, ymd, data.wel, data.sentence_1, data.sentence_2, data.bye])

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
                    var resReturn = await myConnection.query('SELECT catesid, name FROM cates');
                    resolve(resReturn[0])
                } catch (err) {
                    reject * (err)
                }
            }
        )
    }
}
module.exports = new Admin();