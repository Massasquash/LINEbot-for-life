//チャンネル情報・ラインアカウント情報の取得
const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
const USER_ID_M = PropertiesService.getScriptProperties().getProperty('USER_ID_M');
const USER_ID_L = PropertiesService.getScriptProperties().getProperty('USER_ID_L');

//ユーザー入力項目
const weekday = ["日", "月", "火", "水", "木", "金", "土"];
const garbageCalendar = {
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
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const day = weekday[date.getDay()];
  const garbageType = garbageCalendar[day];
  
  const Suiyoubi = getDaysOfWeek(date, 3); //水曜日
  const MoenaiGomiArr = [Suiyoubi[1], Suiyoubi[2]] // 第2・第4水曜日
  
  let message = "【ゴミ出し通信】\n";
  
  if(garbageType != ""){
    message += ` 明日は${day}曜日、「${garbageType}」の日です。\n出すゴミをチェックしよう`;
    sendToLine(message);
  }
  for(const MoenaiGomi of MoenaiGomiArr){
    if(date === MoenaiGomi){
      message = '「燃えないゴミ」も出そう！';
      sendToLine(message);
    }
  }
}

//ラインに送信する処理
function sendToLine(message){
  const url = 'https://api.line.me/v2/bot/message/multicast';
  const headers = {
    'Content-Type':'application/json; charset=UTF-8',
    'Authorization':'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
      
  const data={
    "to":[USER_ID_M, USER_ID_L],
    "messages":[{
      "type":"text",
      "text":message
    }]
  };
  
  const options = {
    'method':'post',
    'headers':headers,
    'payload':JSON.stringify(data)
  };
  
  UrlFetchApp.fetch(url, options);
}



/**
*その年月のd曜日を取得する
*
*@param {date} 調べたい年月の日付（Date型）
*@param {day} 曜日を表す数値(0:日曜日〜6:土曜日)
*@return {days} ある年月のある曜日の日付の入った配列
*/
function getDaysOfWeek(date, day) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = [];
  
  console.log(year, month, day);

  for (let i = 1; i <= 31; i++){
    const tmpDate = new Date(year, month, i);
    
    if (month !== tmpDate.getMonth()) break; //月代わりで処理終了
    if (tmpDate.getDay() !== day) continue; //引数に指定した曜日以外の時は何もしない

    days.push(tmpDate);
  }
  
  return days;
}


//
//
//
////アップデート情報
//function updateInfo() {
//  var info = "テスト配信";
//  sendToLine(info);
//}