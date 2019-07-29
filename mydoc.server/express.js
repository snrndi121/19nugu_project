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
app.get('/health', function (req, res)
{
    res.status(200).send('OK');// res.sendStatus(200);// equivalent to res.status(200).send('OK')
})
//2-2. 메인
app.get('/', function (req, res) {
    res.render('index')
})
app.get('/searchAll', function (req, res) {
    res.render('search')
})
/*
  Requeset Body
{
    "version": "2.0",
    "action": {
        "actionName": "{{string}}",
        "parameters": {
            KEY: {
                "type": "{{string}}",
                "value": VALUE
            }
        }
    },
    "event": {
        "type": "{{string}}"
    },
    "context": {
        "session": {
            "accessToken": "{{string}}"
        },
        "device": {
            "type": "{{string}}",
            "state": {
                KEY: VALUE
            }
        },
        "supportedInterfaces": {
            "AudioPlayer": {
                "playerActivity": "PLAYING",
                "token": "string value",
                "offsetInMilliseconds": 100000
            }
        },
        "privatePlay" : { } // reserved
    }
}
*/
/*
  *   < Action category >
  *
  * 1. MYDOC.ACTION.diagnosis -> 진단 해주기 (병명 + 신체부위, 병명, 신체부위)
  * 2. MYDOC.ACTION.search -> 관련 질환 정보 알려주기 (병명 + 신체부위, 병명, 신체부위)
  * 3. MYDOC.ACTION.history -> 환자 지난 검사 이력 보여주기(병명, 신체부위)
  * 4. MYDOC.ACTION.prevent -> 신체부위별 스트레칭 및 테이핑 방법, 운동별 테이핑 방법
  *
*/
/*
*
******* part4.서버-동작 선언 *******
*
*/
//3.1.의료 진단(Medical diagnosis)
app.post('/MYDOC.ACTION.diagnosis', function (req, res)
{
  console.log("\n>> APi_main from SK diagnosis");
  var action_name = req.body.action.actionName;
  var nugu_version = req.body.version;
  var action = req.body.action;
  var action_params = req.body.action.parameters;

  console.log(action);
  var mresultCode = 'OK';
  var body = {
  version : nugu_version,
  resultCode : mresultCode,
  output : {
    search_disease : '손목 터널 증후군',//action_params.requestNum,
    search_bodyparts : "손목",
    search_whatpain : "부음",
    search_resultCode : mresultCode,
    search_resultDesc : action_params.requestNum + "is Called"
  },
  directives : []
  };
  res.json(body);
})
/*
  * params : search_disease, search_bodyparts, search_whatpain, search_query
*/
//3.2.의료 검색(Medical search)
app.post('/MYDOC.ACTION.search', function (req, res)
{
  console.log("\n>> APi_main from SK search");
  var mVersion = req.body.version;
  var mAction = req.body.action;
  var mParams = req.body.action.parameters;
  console.log(mParams);

  //searching
  //쿼리 : 원인 || 증상 || 이름
  //이름만 물으면 -> 신체부위쪽에서 물은 경우
  //증상 -> 질환으로 물은 경우
  //
  //기본 : SELECT
  var sql_query = 'SELECT';
  //part1. define SQL query
    //신체부위인 경우 = {대표 질환 + 이름 리스트, 이름 리스트, 대표 질환 in 증상 = request_증상;}
    va req_query = mParams.search_query;
    console.log(req_query);
    //(1) 컬럼 조정
    if (!req_query) {
        if (req_query.VALUE == 'NAME') {
            //대화 질환들의 이름 LIST
            sql_query += ' `dname`';
        } else if (req_query.VALUE == 'WHY') {
            sql_query += ' `cause`';

        } else {
            //대표 질환 설명 (이름 + 원인 + 증상)
            sql_query += ' `dname`, `cause`, `effect`';
        }
        if (!mParams.search_whatpain)
          sql_query += ' `effect_type`';
    }
    sql_query += ' FROM `tb_disease_info` WHERE `target`=?;';
    let mResultCode = 'OK';
    let mResultDesc = '';
    //(2) 필터링 = {고통 종류, 부위 종류
    connection.query(sql_query, [mParams.search_bodyparts], function (err, results) {
        if (err) { throw err;}
        else {
            //ifdef search_whatpain
            if (!mParams.search_whatpain) {
                var mPain = mParams.search_whatpain.value;
                for (i = 0; results.length; ++i) {
                    if (results[i].indexOf(mPain)) {
                        mResultDesc +=
                    }
                }
            } else {
              //ifndef search_whatpain
            }
        }
    })
    if (!mParams.search_whatpain )

    //질환명인 경우
  //part2. execute SQL query
  //return structure
  /*
    var sql_query = function() {
        execute_query(sql);
    }
  */
  var body = {
      version : mVersion,
      resultCode : mResultCode,
      output : {
        search_disease : '손목 터널 증후군',//action_params.requestNum,
        search_bodyparts : "손목",
        search_whatpain : "부음",
        search_query :
        search_resultCode : mResultCode,
        search_resultDesc : action_params.requestNum + "is Called"
      },
      directives : []
  };
  res.json(body);
})
//3.3.의료 이력(Personal medical history)
app.post('/MYDOC.ACTION.history', function (req, res)
{
  console.log("\n>> APi_main from SK history");
  var action_name = req.body.action.actionName;
  var nugu_version = req.body.version;
  var action = req.body.action;
  var action_params = req.body.action.parameters;

  console.log(action);
  var mresultCode = 'OK';
  var body = {
  version : nugu_version,
  resultCode : mresultCode,
  output : {
    search_disease : '손목 터널 증후군',//action_params.requestNum,
    search_bodyparts : "손목",
    search_whatpain : "부음",
    search_resultCode : mresultCode,
    search_resultDesc : action_params.requestNum + "is Called"
  },
  directives : []
  };
  res.json(body);
})
//3.4.의료 예방(Stretching and taping)
app.post('/MYDOC.ACTION.prevent', function (req, res)
{
  console.log("\n>> APi_main from SK prevent");
  var action_name = req.body.action.actionName;
  var nugu_version = req.body.version;
  var action = req.body.action;
  var action_params = req.body.action.parameters;

  console.log(action);
  var mresultCode = 'OK';
  var body = {
  version : nugu_version,
  resultCode : mresultCode,
  output : {
    search_disease : '손목 터널 증후군',//action_params.requestNum,
    search_bodyparts : "손목",
    search_whatpain : "부음",
    search_resultCode : mresultCode,
    search_resultDesc : action_params.requestNum + "is Called"
  },
  directives : []
  };
  res.json(body);
})
//3.$.테스트(for test)
app.post('/MYDOC.INTENT.test', function (req, res)
{

  console.log("\n>> APi_main from SK gogo");
  var action_name = req.body.action.actionName;
  var nugu_version = req.body.version;
  var action = req.body.action;
  var action_params = req.body.action.parameters;

  console.log(action);
  var mresultCode = 'OK';
  var body = {
  version : nugu_version,
  resultCode : mresultCode,
  output : {
    requestNum : 'hoho',//action_params.requestNum,
    resultCode : mresultCode,
    resultDesc : action_params.requestNum + "is Called"
  },
  directives : []
  };
  res.json(body);
})

/*
  *
  ******* part4.서버-함수 선언 *******
  *
*/
//4-1. 질병 검색
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
