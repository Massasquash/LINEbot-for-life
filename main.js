var CHANNEL_ACCESS_TOKEN = 'wkuGDzs92ybNqJl1y2KrraonRjOw5cBb1r75OUkCbkQhJCBMrY3wJaR9GXIYPijBbYA5ueOABRQoLhTs5C8iCIyK/8aqH8sg7EvBqUZ19pkKlsWckKAGJCvoYdAoeDgG1P1WP8dzjdFzkRLxV/dGCwdB04t89/1O/w1cDnyilFU=';

// メイン処理。LINE botがユーザーからメッセージを受け取った時
function doPost(e) {
  getMessage(e);
  outputLog(e);
}

function getMessage(e){
  var event = JSON.parse(e.postData.contents).events[0];
  var replyToken = event.replyToken;
  if(typeof replyToken === 'undefined'){
    return;
  };

  var messageText = event.message.text;
  var cache = CacheService.getScriptCache();

  // ユーザーから受け取ったメッセージを部分一致で処理を分岐
  if(messageText.match("日時選択アクション")){

    

  }else if(messageText.match("クイックリプライ")){
    

  }else{
    var message = "【READ ME】\n●「おつかれ」と入れてみてください。日報を入力できます。\n●「履歴」と入れるとカレンダー・シートを送ります。";
    reply(replyToken, message);
  };
}


// ラインにメッセージを返す処理。
function reply(replyToken, message){

  var url = "https://api.line.me/v2/bot/message/reply";
  var message = {
    "replyToken" : replyToken,
    "messages" : [
      {
        "type" : "text",
        "text" : message
      }
    ]
  };

  var options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(message)
  };

  UrlFetchApp.fetch(url, options);
}


// ラインに二つのメッセージを返す処理。
function replyMessages(replyToken, message1, message2){

  var url = "https://api.line.me/v2/bot/message/reply";
  var message = {
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

  var options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(message)
  };

  UrlFetchApp.fetch(url, options);
}



//スプレッドシートにログを表示するためのもの
function outputLog(text){
  var sheetName = "logs";
  ssForLogs.getSheetByName(sheetName).appendRow(
    [new Date(), text]
  );
}