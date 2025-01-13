let userInput = ""; // ユーザーが入力した文字列を格納する
let isActivated = false; // プログラムの状態を管理する
let myFont;
let startTime;  // 時間を計測するための変数
let state = 0; // 初期状態

function setup() {
  createCanvas(400, 400);
  background(255);
  textSize(25);
  textFont('Arial');
}

function draw() {
  if (isActivated) {
    isActivated = false; // 状態遷移後にフラグをリセット
    startTime = 0; // タイマーをリセット
    state++; // 状態を遷移
  } else {
    // 通常時の処理
    background(255);
    fill(0);
    if (state === 0) {
      text("名前は？", 50, height / 2 - 20);
    } else if (state === 1) {
      text("誕生日は？(例：1/1)", 50, height / 2 - 20);
    } else if (state === 2) {
      text("妹の名前は？", 50, height / 2 - 20);
    } else if (state === 3) {
      text("身長は？", 50, height / 2 - 20);
    } else if (state === 4) {
      text("姉の名前は？", 50, height / 2 - 20);
    } else if (state === 5) {
      text("義理の兄の名前は？", 50, height / 2 - 20);
    } else if (state === 6) {
      text("嫌いな人の名前は？", 50, height / 2 - 20);
    } else if (state === 7) {
      text("誰に連れられて演劇部に", 50, height / 2 - 20);
      text("来た？", width - 100, height / 2 + 10);
    } else if (state === 8) {
      text("出身地は？", 50, height / 2 - 20);
    } else if (state === 9) {
      text("勇・小雪とは", 50, height / 2 - 20);
      text("小学何年生からの付き合い？", 80, height / 2 + 10);
    } else if (state === 10) {
      text("好きな料理は？", 50, height / 2 - 20);
    }
    text(userInput, 50, height / 2 + 20);
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    // バックスペースが押された場合、文字を削除
    if (userInput.length > 0) {
      userInput = userInput.substring(0, userInput.length - 1);
    }
  } else if (keyCode === ENTER || keyCode === RETURN) {
    // Enterキーが押された場合、コマンドを確認
    if (normalizeInput(userInput) === normalizeInput("kigarashi hyouri") && state === 0) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("wakaranai")) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("11/20") && state === 1) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("kigarashi touka") && state === 2) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("187") && state === 3) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("kigarashi toa") && state === 4) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("esume") && state === 5) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("yanagi ryou") && state === 6) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("shinonome koyuki") && state === 7) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("oosaka") && state === 8) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("1") && state === 9) {
      isActivated = true;
    } else if (normalizeInput(userInput) === normalizeInput("mirufi-yunabe") && state === 10) {
      isActivated = true;
    }
    userInput = ""; // 入力をリセット
  } else if (keyCode !== BACKSPACE && keyCode !== ENTER && keyCode !== RETURN) {
    // 他のキーが押された場合、文字を追加
    userInput += key;
  }
}

function normalizeInput(input) {
  return input
    .toLowerCase() // 小文字に変換
    .trim()
    .replace("si", "shi")
    .replace("toka", "touka")
    .replace("hyori", "hyouri")
    .replace("ousaka", "oosaka")
    .replace("yanagi ryo", "yanagi ryou")
    .replace("huli", "fi")
    .replace("187cm", "187")
    .replace("esume fon kuruto", "esume");
}
