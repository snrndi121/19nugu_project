/*
  *
  *******  part1.환경설정 *******
  *
*/
//1.1.설정-모듈 라이브러리
var express = require("express");//express
var app = express();
var request = require('request');//request
var port = process.env.PORT || 3000;
var cors = require('cors');//cross-browsing
var mysql = require('mysql');//mysql
// ***********************************************************
// mysql-booster 관리
// var MysqlPoolBooster = require('mysql-pool-booster');
// mysql = MysqlPoolBooster(mysql);
// // db-configuration 적용
// mysql.createPool(db_config);
// ***********************************************************
//1.2.설정-연동
var connection = mysql.createConnection(//mysql
{
  host     : '127.0.0.1',//localhost로 하면 에러남
  user     : 'root',
  password : 'Flower5wantnight',
  database : 'mydoc'
});
connection.connect();

app.use(express.static(__dirname + '/public'));//express
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', __dirname + '/views');//ejs
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cors());//cross-browsing
//1.3. 변수 설정
const tb_disease = "tb_disease_list";
const tb_body = "tb_bodypart_list";
/*
  *
  *******  part2.프론트-화면 렌더링 *******
  *
*/
//2-1. health check
//express_ref : http://expressjs.com/en/5x/api.html
app.get('/health', function (req, res) {
    //res.render('health')
    res.sendStatus(200);// equivalent to res.status(200).send('OK')
})
//2-2. 메인
app.get('/', function (req, res) {
    res.render('index')
})
app.get('/searchAll', function (req, res) {
    res.render('search')
})
/*
  *
  ******* part4.서버-동작 선언 *******
  *
*/
app.post('/health', function (req, res) {
    console.log("\n>> API_healthy check from SK 누구 ##### ");
    console.log(req.body);
})
//3-1. 액션_검색(API)
/*
  * 손목 건초염이면 손이 아파?
  * 신체 리스트 = {bid, bname} : tb_bodypart_list
  * 질병 리스트 = {did, bid, dname, dinfo} : tb_disease_list
  * 질병 = {관련 신체 부위}
*/
//크롤링 : http://www.amc.seoul.kr/asan/healthinfo/disease/diseaseSubmain.do#
app.post('/searchAll', function (req, res) {
    console.log("\n>> API_searchAll from SK 누구 ##### ");
    console.log(req.header);
    console.log(req.body);
    console.log(req.body.action);
    var nugu_version = '1.0';
    // if (req.body != null)
    //     var nugu_version = req.body.version;

    var body = {
        version : nugu_version,
        resultCode : "정상",
        output : {
            disease : '건초염',
            bodyparts : '손목',
            resultcode : 'OK',
            desc_pain : '성공하셨어요.'
        }
    };
    //
    res.json(body);
});
/*
  *
  ******* part3.서버-함수 선언 *******
  *
*/
//3-1. 질병 검색
function searchDisease(_dname)
{
    console.log(" > func_searchDisease + " + _dname);
    var sql_s_d = 'SELECT `dinfo` FROM `tb_disease_list` WHERE `' + tb_disease +'`+ WHERE `bname`=?;';
    connection.query(sql_s_d, [_dname], function (err, results) {
        if (error) {
            console.log(" >> cannot find +" + dname);
            throw error;
        }
        else {
            for (i = 0; results.length; ++i) {
                if(results[i].indexOf(dname) != -1) {
                    console.log(dinfo);
                }
            }
        }
    })
}
//4.$. 서버처리-대기
app.listen(3000);
console.log("Listening on port", port);
