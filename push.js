//チャンネル情報・ラインアカウント情報の取得
var CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
var USER_ID_M = PropertiesService.getScriptProperties().getProperty('USER_ID_M');
var USER_ID_L = PropertiesService.getScriptProperties().getProperty('USER_ID_L');

//ユーザー入力項目
var weekday = ["日", "月", "火", "水", "木", "金", "土"];
var garbageCalendar = {
  "日":"",
  "月":"燃やすゴミ",
  "火":"",
  "水":"資源ゴミ",
  "木":"燃やすゴミ",
  "金":"",
  "土":""
};

//リマインダのメイン処理
function garbageReminder() {
  var date = new Date();
  date.setDate(date.getDate() + 1);
  var dayNum = date.getDay();
  var day = weekday[dayNum];
  var garbageType = garbageCalendar[day];
  
  var message = "【ゴミ出し通信】\n";
  
  if(garbageType != ""){ 
    message += " 明日は${day}曜日、「${garbageType}」の日です。\n出すゴミをチェックしよう".replace('${day}',day).replace('${garbageType}',garbageType);
    sendToLine(message);
  }else{

  };
}

//ラインに送信する処理
function sendToLine(message){
  var url = 'https://api.line.me/v2/bot/message/multicast';
  var headers = {
    'Content-Type':'application/json; charset=UTF-8',
    'Authorization':'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
      
  var data={
    "to":[USER_ID_M, USER_ID_L],
    "messages":[{
      "type":"text",
      "text":message
    }]
  };
  
  var options = {
    'method':'post',
    'headers':headers,
    'payload':JSON.stringify(data)
  };
  
  UrlFetchApp.fetch(url, options);
}






//アップデート情報
function updateInfo() {
  var info = "テスト配信";
  sendToLine(info);
}