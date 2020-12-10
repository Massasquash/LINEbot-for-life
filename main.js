const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');

const ss = SpreadsheetApp.getActiveSpreadsheet();

// メイン処理。LINE botがユーザーからメッセージを受け取った時
function doPost(e) {
  getMessage(e);
  outputLog(e);
}

function getMessage(e){
  const event = JSON.parse(e.postData.contents).events[0];
  const replyToken = event.replyToken;
  if(typeof replyToken === 'undefined'){
    return;
  };

  const messageText = event.message.text;
  let cache = CacheService.getScriptCache();

  // ユーザーから受け取ったメッセージを部分一致で処理を分岐
  if(messageText.match("日時選択アクション")){

    

  }else if(messageText.match("クイックリプライ")){
  

  }else{
    const num = Math.floor(Math.random()*5);
    let message = '';
    switch(num){
      case 0:
        message = "こんにちワン";
        break;
      case 1:
        message = "こんばんワニ";
        break;
      case 2:
        message = "おはCock-a-doodle-doo";
        break;
      case 3:
        message = "にゃん";
        break;
      case 4:
        message = "ニャン";
        break;
      default:
        const message = "foooooooooooooooo";
    };
    reply(replyToken, message);
  };
}


// ラインにメッセージを返す処理。
function reply(replyToken, message){

  const url = "https://api.line.me/v2/bot/message/reply";
  const data = {
    "replyToken" : replyToken,
    "messages" : [
      {
        "type" : "text",
        "text" : message
      }
    ]
  };

  const options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(data)
  };

  UrlFetchApp.fetch(url, options);
}


// ラインに二つのメッセージを返す処理。
function replyMessages(replyToken, message1, message2){

  const url = "https://api.line.me/v2/bot/message/reply";
  const data = {
    "replyToken" : replyToken,
    "messages" : [{
        "type" : "text",
        "text" : message1
      },{
        "type" : "text",
        "text" : message2
      }
    ]
  };

  const options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(data)
  };

  UrlFetchApp.fetch(url, options);
}



//スプレッドシートにログを表示するためのもの
function outputLog(text){
  const sheetName = "logs";
  ss.getSheetByName(sheetName).appendRow(
    [new Date(), text]
  );
}