$(document).ready(function() {
  //登録ボタンクリック
  $('#add').click(function() {
    var time = new Date().getTime();
    var data = new Object();
    data.todo = $('#todo').val();
    var str = data.todo;
    //入力チェック、ローカルストレージ
    if(checkTodo(str)){
    localStorage.setItem(time, str);
    loadStorage();
    //テキストボックスを空にする
    $('#todo').val("");
  }
  });
 
  //データクリアボタンクリック
  $('#clear').click(function() {
    ret = confirm ( "全て削除しますか？");
    if (ret == true){
    localStorage.clear();
    loadStorage();
  }
  });
 

  //ローカルストレージデータ読み込み
  function loadStorage() {
    $("#list tbody").empty();
    var rec = "";
    for (var i=0; i<localStorage.length; i++) {
      var key = localStorage.key(i); //keyを取得
      var value = localStorage.getItem(key);
      var date = new Date();
      date.setTime(key);
      var dateStr = date.toDateString() + " " + date.toLocaleTimeString();
      rec += "<tr id='" + key + "'><td><button class='delete' href='#'>削除</button></td>";
      rec += "<td>" + value + "</td>";
      rec += "<td><time datetime='" + dateStr + "'>" + dateStr + "</time></td>";
      rec += "</tr>";
    }
    $("#list tbody").append(rec);
    $('.delete').bind('click', delete_clickHandler);
  }
 
  //削除処理
  function delete_clickHandler(event) {
    var target = $(event.target).parents('tr').attr('id');
    ret = confirm ( "削除しますか？");
    if (ret == true){localStorage.removeItem(target);
    loadStorage();
  }
  }
  //登録済みデータ読み込み
  loadStorage();
});

//入力チェック
function checkTodo(todo) {
  // 文字数が0または20以上は不可
  //alert(todo.length);
  if ( 0 === todo.length || 20 < todo.length) {
    alert("文字数は1〜20字にしてください");
    return false;
  }

  //すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if ( todo === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  //すべてのチェックを通過できれば可
  return true;
}