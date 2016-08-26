var env = require('node-env-file')
var Banking = require('banking')
var parseString = require('xml2js').parseString

env('.env')

var Ofx = function() {
  var bank = Banking({
      fid: process.env.FID
    , fidOrg: process.env.FIDORG
    , url: process.env.URL
    , bankId: process.env.BANKID /* If bank account use your bank routing number otherwise set to null */
    , user: process.env.USER
    , password: process.env.PASSWORD
    , accId: process.env.ACCID
    , accType: process.env.ACCTYPE /* CHECKING || SAVINGS || MONEYMRKT || CREDITCARD */
    , ofxVer: process.env.OFXVER
    , app: process.env.APP
    , appVer: process.env.APPVER
  })

  bank.getStatement({start:20160818, end:20160818}, function(err, res) {
    if(err) console.log(err)
    console.log(JSON.stringify(res))

    // parseString(res.xml, {trim: true}, function (err, result) {
    //   if(err) console.log(err)
    //   console.log(JSON.stringify(result.OFX))
    //   // balance = result.OFX.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].LEDGERBAL[0].BALAMT[0]
    //   // console.log(balance, result.OFX.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].STMTTRN)
    // })
  })
}

exports.Ofx = Ofx
