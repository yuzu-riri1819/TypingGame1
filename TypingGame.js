let userInput = ""; // ユーザーが入力した文字列を格納する
let isActivated = false; // プログラムの状態を管理する
let fadeOut = false; // フェードアウトを開始するフラグ
let clear = false;
let title = false;
let fadeIn = true; // フェードイン中かどうか
let startTime; // 時間を計測するための変数
let alphaValue = 0; // 透明度を管理
let alpha = 255; 
let alpha2 = 255; 
let state = 0; // 初期状態
let game_point = 0;
let yabai = 0;
let volume = 1.0; // 初期音量（1.0が最大）
let img0, img1, img2, img3, img4, img5, img6, img7, img8;
let sound1;

function preload() {
  img0 = loadImage('assets/ドン引き.png');
  img1 = loadImage("assets/4.png");
  img2 = loadImage("assets/3.png");
  img3 = loadImage("assets/2.png");
  img4 = loadImage("assets/1.png");
  img5 = loadImage("assets/5.png");
  img6 = loadImage("assets/6.png");
  img7 = loadImage("assets/タイトル.png");
  img8 = loadImage("assets/クリック.png");
  soundFormats('mp3');
  sound1 = loadSound("assets/ほのぼの.mp3");
}

function setup() {
  createCanvas(816, 624);
  background(255);
  textSize(25);
  textFont('Arial');
}

function draw() {
if(fadeOut){
  alpha2 -= 5; // 徐々に透明に
    if (alpha2 <= 0) {
	alpha = 0;
    }
}
  // 透明度を調整
  if (fadeIn) {
    alpha += 5; // 徐々に不透明に
    if (alpha >= 255) {
      fadeIn = false; // フェードアウトに切り替え
    }
  } else {
    alpha -= 5; // 徐々に透明に
    if (alpha <= 0) {
      fadeIn = true; // フェードインに切り替え
    }
  }

  if (!title) {
    tint(255, alpha2);
    image(img7, 0, 0, 816, 624);
    tint(255, alpha);
    image(img8, 0, 0, 816, 624);
  }

  if (isActivated) {
    isActivated = false; // 正解モードを終了
    state++; // 次の状態に遷移
  } else {
    // 通常時の
    if (title) {
      background(255);
      fill(0);
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
      text("誰に連れられて演劇部に来た？", 50, height / 2 - 20);
    } else if (state === 8) {
      text("出身地は？", 50, height / 2 - 20);
    } else if (state === 9) {
      text("勇・小雪とは小学何年生からの付き合い？", 50, height / 2 - 20);
    } else if (state === 10) {
      text("好きな料理は？", 50, height / 2 - 20);
    }
    text(userInput, 50, height / 2 + 20);
  }

  if (clear) {
    // 状態ごとに表示内容を切り替え
    handleClearState();
  }
}

function handleClearState() {
 if (yabai == 3 || yabai === 4) {
  if (game_point === 11) {
    displayEnding(img0, "...なんなんだアンタ");
  }else if (game_point > 5 && game_point < 11) {
      displayEnding(img1, "何で知ってんだ...？");
    } else {
      displayEnding(img2, "…良く知ってんな……。");
    }
  } else if (yabai == 2) {
    if (game_point > 5 && game_point < 11) {
      displayEnding(img3, "…ありがと。");
    } else {
      displayEnding(img4, "俺のこと、まあまあ知ってんだな。");
    }
  } else if (yabai <= 1) {
    if (game_point > 5) {
      displayEnding(img5, "ありがとな。");
    } else {
      displayEnding(img6, "…そうか");
    }
  }

  if (alphaValue >= 255) {
    noLoop();
  }
}

function displayEnding(img, message) {
  alphaValue = min(alphaValue + 2, 255); // 透明度を徐々に上げる
  tint(255, alphaValue); // 透明度を設定
  image(img, 0, 0, 816, 624);
  textSize(200);
  text(game_point, width / 2, height / 2 + 100);
  textSize(40);
  text(message, width / 2, 150);
}

function mousePressed() {
if(!fadeOut){
  sound1.loop(); // ループ再生
}
  fadeOut = true; // クリックでフェードアウトを開始
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    // バックスペースが押された場合、文字を削除
    if (userInput.length > 0) {
      userInput = userInput.slice(0, -1);
    }
  } else if (keyCode === ENTER) {
    handleUserInput();
    userInput = ""; // 入力をリセット
  } else {
    userInput += key;
  }
}

function handleUserInput() {
  const normalized = normalizeInput(userInput);
  if (normalized === normalizeInput("kigarashi hyouri") && state === 0) {
    isActivated = true;
    game_point++;
  } else if (normalized === normalizeInput("wakaranai")) {
    isActivated = true;
  } else if (normalized === normalizeInput("11/20") && state === 1) {
    isActivated = true;
    game_point++;
  } else if (normalized === normalizeInput("kigarashi touka") && state === 2) {
    isActivated = true;
    game_point++;
  } else if (normalized === normalizeInput("187") && state === 3) {
    isActivated = true;
    game_point++;
  } else if (normalized === normalizeInput("kigarashi toa") && state === 4) {
    isActivated = true;
    game_point++;
    yabai++;
  } else if (normalized === normalizeInput("esume") && state === 5) {
    isActivated = true;
    game_point++;
    yabai++;
  } else if (normalized === normalizeInput("yanagi ryou") && state === 6) {
    isActivated = true;
    game_point++;
  } else if (normalized === normalizeInput("shinonome koyuki") && state === 7) {
    isActivated = true;
    game_point++;
  } else if (normalized === normalizeInput("oosaka") && state === 8) {
    isActivated = true;
    game_point++;
  } else if (normalized === normalizeInput("1") && state === 9) {
    isActivated = true;
    game_point++;
    yabai++;
  } else if (normalized === normalizeInput("mirufi-yunabe") && state === 10) {
    clear = true;
    game_point++;
    yabai++;
    state++;
  }
}

function normalizeInput(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/si/g, "shi")
    .replace(/toka/g, "touka")
    .replace(/hyori/g, "hyouri")
    .replace(/ousaka/g, "oosaka")
    .replace(/yanagi ryo/g, "yanagi ryou")
    .replace(/huli/g, "fi")
    .replace(/187cm/g, "187")
    .replace(/esume fon kuruto/g, "esume");
}
