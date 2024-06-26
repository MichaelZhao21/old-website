var drawPhases = [];
var hangmanPhase;
var ansArray = [];
var correctAnswer;
var displayArr = [];
var guessedLetters = [];
var randWords = [];
const USER_ANS = 0;
const RAND_ANS = 1;

function setup() {
  generateListOfHangmanWords();
  generateHangmanDrawingPhases();
  $(".hangmanDrawing").html(arrToHTML(drawPhases[0]));
  hangmanPhase = 0;
  $(".guess").css("display", "none");
  $(":input[name='inputAnswer']").on("input", function (event) {
    if (event.originalEvent.data.match(/^[a-z]$/) == null) {
      var currVal = $(":input[name='inputAnswer']").val();
      $(":input[name='inputAnswer']").val(currVal.substring(0, currVal.length - 1));
    }
  });
  $(":input[name='submitAnswer']").click(function (event) {
    startGame(USER_ANS);
  });
  $(":input[name='randomAnswer']").click(function (event) {
    startGame(RAND_ANS);
  });
}

function startGame(choice) {
  if (choice == USER_ANS) {
    correctAnswer = $(":input[name='inputAnswer']").val().toUpperCase();
  }
  else {
    correctAnswer = pickRandomAnswerFromFile().toUpperCase();
  }

  for (var x = 0; x < correctAnswer.length; x++) {
    ansArray.push(correctAnswer.substring(x, x + 1));
    displayArr.push("_");
  }
  $(document).keydown(function (event) {
    if (event.originalEvent.key.match(/^[a-z]$/)) {
      makeGuess(event.originalEvent.key.toUpperCase());
    }
  });
  $(".guess").css("display", "block");
  $(".menu").css("display", "none");
  $(".guessLetters").html(lettersToSpaces());
}

function pickRandomAnswerFromFile() {
  //TODO: Add getting from that file
  // var file = new XMLHttpRequest();
  // var thisLocation = window.location.pathname;
  // var dirLocation = thisLocation.substring(0, thisLocation.length - "hangman.html".length);
  // var location = dirLocation + "randomWords.txt";
  // console.log(location);
  return randWords[randInt(0, randWords.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function makeGuess(key) {
  var correct = false;
  for (var i = 0; i < ansArray.length; i++) {
    if (ansArray[i] == key) {
      displayArr[i] = key;
      correct = true;
    }
  }
  if (!correct) {
    incrementAndDrawHangman();
  }
  guessedLettersDisplay(key);
  $(".guessLetters").html(lettersToSpaces());
  testForWin();
}

function guessedLettersDisplay(newLetter) {
  var defaultInfo = $(".info").html();
  guessedLetters.push(newLetter);
  $(".info").html(defaultInfo + newLetter + " ");
}

function testForWin() {
  var allCorrect = true;
  for (var x = 0; x < ansArray.length; x++) {
    if (ansArray[x] != displayArr[x]) {
      allCorrect = false;
    }
  }
  if (allCorrect) {
    $(document).off("keydown");
    $(".info").html("YOU WIN!!!");
  }
  if (hangmanPhase == 6) {
    $(document).off("keydown");
    $(".info").html("You lose! The correct answer was: \n" + correctAnswer);
  }
}

function lettersToSpaces() {
  var output = ""
  for (var x = 0; x < ansArray.length; x++) {
    output += displayArr[x] + " ";
  }
  return output;
}

function incrementAndDrawHangman() {
  hangmanPhase++;
  $(".hangmanDrawing").html(arrToHTML(drawPhases[hangmanPhase]));
}

function arrToHTML(inputArr) {
  var output = "";
  inputArr.forEach(function(value, index, array) {
    output += value + "<br>"
  });
  return output;
}

function generateHangmanDrawingPhases() {
  drawPhases = [
    ["|==|",
    "|",
    "|",
    "|",
    "="],
    ["|==|",
    "|  O",
    "|",
    "|",
    "="],
    ["|==|",
    "|  O",
    "|  |",
    "|",
    "="],
    ["|==|",
    "|  O",
    "| /|",
    "|",
    "="],
    ["|==|",
    "|  O",
    "| /|\\",
    "|",
    "="],
    ["|==|",
    "|  O ",
    "| /|\\",
    "| /",
    "="],
    ["|==|",
    "|  O",
    "| /|\\",
    "| / \\",
    "="],
  ];
}

function generateListOfHangmanWords() {
  randWords = ["exile",
  "poetry",
  "opposite",
  "swell",
  "sex",
  "mirror",
  "transaction",
  "execution",
  "salt",
  "pat",
  "cook",
  "innovation",
  "ministry",
  "stress",
  "bracket",
  "property",
  "convenience",
  "vegetation",
  "kick",
  "marriage",
  "respect",
  "slow",
  "ordinary",
  "mild",
  "satellite",
  "mist",
  "ferry",
  "cell",
  "terrace",
  "crossing",
  "industry",
  "rise",
  "safe",
  "post",
  "elect",
  "increase",
  "realism",
  "exclude",
  "infinite",
  "jail",
  "scholar",
  "linear",
  "account",
  "factory",
  "football",
  "reflection",
  "error",
  "treaty",
  "joint",
  "experience",
  "memorial",
  "publication",
  "base",
  "dome",
  "integrated",
  "mailcarrier",
  "landowner",
  "panel",
  "flush",
  "agree",
  "tap",
  "listen",
  "reach",
  "stun",
  "merchant",
  "result",
  "obligation",
  "orientation",
  "jury",
  "acid",
  "organize",
  "faithful",
  "relative",
  "slippery",
  "development",
  "mechanism",
  "pyramid",
  "rifle",
  "premature",
  "highway",
  "white",
  "urge",
  "flawed",
  "sensation",
  "withdraw",
  "visible",
  "encourage",
  "fabricate",
  "horn",
  "humanity",
  "tired",
  "veteran",
  "laundry",
  "flu",
  "pan",
  "annual",
  "system",
  "mask",
  "deal",
  "manner",
  "match",
  "certain",
  "radiation",
  "dive",
  "vat",
  "orchestra",
  "temporary",
  "path",
  "finish",
  "welcome",
  "remedy",
  "address",
  "snake",
  "college",
  "overwhelm",
  "inspector",
  "sensitive",
  "unanimous",
  "strict",
  "swear",
  "confront",
  "reservoir",
  "anxiety",
  "lease",
  "context",
  "absorb",
  "disco",
  "choose",
  "locate",
  "arrange",
  "graphic",
  "tolerate",
  "initial",
  "budge",
  "progressive",
  "aisle",
  "theater",
  "file",
  "dilute",
  "release",
  "walk",
  "morning",
  "sour",
  "painter",
  "double",
  "desk",
  "catch",
  "referee",
  "seat",
  "favorable",
  "difficulty",
  "twilight",
  "inappropriate",
  "recover",
  "install",
  "opinion",
  "faux",
  "rainbow",
  "giant",
  "deer",
  "economy",
  "syndrome",
  "content",
  "afford",
  "courtesy",
  "morale",
  "productive",
  "monstrous",
  "murder",
  "pocket",
  "bang",
  "expertise",
  "security",
  "laborer",
  "element",
  "poor",
  "systematic",
  "develop",
  "snub",
  "fruit",
  "monster",
  "plaster",
  "heat",
  "compartment",
  "headline",
  "tooth",
  "sick",
  "leader",
  "bind",
  "bank",
  "divorce",
  "zero",
  "bless",
  "clue",
  "practice",
  "conscience",
  "summer",
  "dream",
  "trench",
  "food",
  "unlike",
  "carbon",
  "sphere",
  "shake",
  "size",
  "supply",
  "represent",
  "executrix",
  "ash",
  "topple",
  "carry",
  "staff",
  "fuel",
  "adoption",
  "franchise",
  "mosquito",
  "rain",
  "inch",
  "deadly",
  "spite",
  "rate",
  "driver",
  "chemistry",
  "brilliance",
  "tragedy",
  "sleep",
  "nest",
  "pride",
  "hard",
  "sight",
  "quest",
  "waste",
  "solution",
  "spell",
  "ignore",
  "convention",
  "profound",
  "colorful",
  "survivor",
  "peak",
  "standard",
  "river",
  "small",
  "unfair",
  "audience",
  "like",
  "fade",
  "lemon",
  "risk",
  "proportion",
  "gate",
  "bill",
  "decoration",
  "seize",
  "history",
  "brother",
  "city",
  "donor",
  "understand",
  "shiver",
  "constraint",
  "precedent",
  "reptile",
  "add",
  "hotdog",
  "note",
  "bad",
  "absent",
  "shout",
  "dirty",
  "affect",
  "tradition",
  "large",
  "pair",
  "forum",
  "aloof",
  "elaborate",
  "bet",
  "cutting",
  "inhabitant",
  "cart",
  "spare",
  "allow",
  "relation",
  "shareholder",
  "achieve",
  "charismatic",
  "demonstration",
  "approval",
  "admire",
  "legislature",
  "indexfinger",
  "jet",
  "trance",
  "elephant",
  "mosaic",
  "pray",
  "mutter",
  "soak",
  "girl",
  "buttocks",
  "constituency",
  "accept",
  "lonely",
  "familiar",
  "prayer",
  "analyst",
  "latest",
  "television",
  "flow",
  "oil",
  "step",
  "doll",
  "suburb",
  "place",
  "relate",
  "stake",
  "avenue",
  "abuse",
  "day",
  "lost",
  "therapist",
  "glasses",
  "cable",
  "prey",
  "interest",
  "consumer",
  "dedicate",
  "wagon",
  "kid",
  "climate",
  "courage",
  "marathon",
  "promotion",
  "thirsty",
  "gradual",
  "suit",
  "anger",
  "gaspedal",
  "manual",
  "exemption",
  "linen",
  "bathroom",
  "crouch",
  "stimulation",
  "character",
  "notice",
  "seller",
  "single",
  "coincide",
  "power",
  "cause",
  "engineer",
  "theme",
  "quality",
  "mark",
  "rational",
  "foot",
  "term",
  "freeze",
  "set",
  "announcement",
  "discreet",
  "news",
  "skate",
  "color-blind",
  "program",
  "lunch",
  "convert",
  "exclusive",
  "heart",
  "grass",
  "attack",
  "instinct",
  "vague",
  "applaud",
  "adviser",
  "host",
  "pick",
  "robot",
  "read",
  "worker",
  "tribe",
  "authorize",
  "resort",
  "traction",
  "effective",
  "computervirus",
  "overeat",
  "respectable",
  "material",
  "direction",
  "thigh",
  "thesis",
  "still",
  "function",
  "corruption",
  "circulate",
  "mayor",
  "ridge",
  "revenge",
  "election",
  "design",
  "wheat",
  "cater",
  "consciousness",
  "tight",
  "long",
  "childish",
  "fresh",
  "cluster",
  "mind",
  "artificial",
  "engine",
  "coffin",
  "shed",
  "lace",
  "hypothesize",
  "equation",
  "achievement",
  "deep",
  "maze",
  "manage",
  "trunk",
  "lean",
  "hate",
  "image",
  "maid",
  "distort",
  "clash",
  "administration",
  "fitness",
  "whole",
  "due",
  "ethics",
  "ethnic",
  "pudding",
  "virgin",
  "able",
  "simplicity",
  "uncertainty",
  "introduce",
  "harmony",
  "exceed",
  "onion",
  "advantage",
  "harsh",
  "tent",
  "nominate",
  "embrace",
  "breakdown",
  "concession",
  "snuggle",
  "isolation",
  "trail",
  "liver",
  "behead",
  "memorandum",
  "float",
  "attraction",
  "banish",
  "original",
  "apple",
  "researcher",
  "number",
  "sharp",
  "neutral",
  "crime",
  "proposal",
  "cave",
  "trap",
  "subway",
  "breed",
  "scrape",
  "economic",
  "rightwing",
  "bomber",
  "face",
  "noncommittal",
  "ignorant",
  "wrong",
  "storm",
  "challenge",
  "peasant",
  "example",
  "basis",
  "transition",
  "bake",
  "trial",
  "embark",
  "designer",
  "weigh",
  "fraction",
  "lead",
  "official",
  "unique",
  "pawn",
  "first-hand",
  "provision",
  "compete",
  "fastidious",
  "old",
  "dribble",
  "seed",
  "polite",
  "build",
  "pavement",
  "conference",
  "implicit",
  "eagle",
  "tower",
  "slave",
  "corn",
  "angel",
  "overlook",
  "bridge",
  "spider",
  "vein",
  "tolerant",
  "sniff",
  "craft",
  "waterfall",
  "growth",
  "compliance",
  "mechanical",
  "drum",
  "professional",
  "biography",
  "decrease",
  "good",
  "parking",
  "head",
  "reject",
  "credibility",
  "minimum",
  "premium",
  "leave",
  "fund",
  "establish",
  "bare",
  "sell",
  "pain",
  "patient",
  "break",
  "width",
  "central",
  "thumb",
  "imagine",
  "lid",
  "nose",
  "reveal",
  "liability",
  "vertical",
  "Mars",
  "punish",
  "front",
  "medium",
  "close",
  "beautiful",
  "conservative",
  "acquisition",
  "recognize",
  "demand",
  "bottle",
  "stubborn",
  "kidney",
  "insert",
  "happen",
  "valley",
  "enemy",
  "resignation",
  "assume",
  "inspiration",
  "ballot",
  "date",
  "bubble",
  "president",
  "feel",
  "mislead",
  "drag",
  "formulate",
  "cattle",
  "forge",
  "diplomat",
  "ample",
  "defend",
  "contribution",
  "determine",
  "technique",
  "ice",
  "check",
  "half",
  "study",
  "detector",
  "crisis",
  "separate",
  "gesture",
  "consolidate",
  "trainer",
  "frozen",
  "fee",
  "cotton",
  "arm",
  "instruction",
  "sock",
  "roar",
  "disgrace",
  "marsh",
  "leash",
  "person",
  "acceptance",
  "pest",
  "ignorance",
  "haunt",
  "cupboard",
  "thanks",
  "complex",
  "cash",
  "mastermind",
  "war",
  "split",
  "testify",
  "sensitivity",
  "brick",
  "shadow",
  "wrist",
  "chord",
  "home",
  "law",
  "behavior",
  "muscle",
  "angle",
  "brink",
  "slant",
  "democratic",
  "pipe",
  "tune",
  "weight",
  "value",
  "continental",
  "graze",
  "ribbon",
  "platform",
  "gossip",
  "elbow",
  "implication",
  "wisecrack",
  "coat",
  "short",
  "primary",
  "shell",
  "argument",
  "punch",
  "education",
  "exploration",
  "hypothesize",
  "hero",
  "bathtub",
  "camera",
  "improve",
  "volunteer",
  "wash",
  "verdict",
  "retired",
  "diamond",
  "quote",
  "genuine",
  "drain",
  "lawyer",
  "major",
  "pack",
  "pie",
  "habitat",
  "impulse",
  "Venus",
  "wording",
  "village",
  "delay",
  "exit",
  "goal",
  "quotation",
  "model",
  "reason",
  "bike",
  "comment",
  "impound",
  "manager",
  "sausage",
  "exempt",
  "destruction",
  "sheet",
  "passage",
  "ward",
  "volcano",
  "maximum",
  "warn",
  "spirit",
  "writer",
  "science",
  "order",
  "deport",
  "category",
  "crystal",
  "hurl",
  "planet",
  "appeal",
  "TRUE",
  "prove",
  "snatch",
  "poem",
  "reporter",
  "sticky",
  "hospital",
  "reference",
  "kettle",
  "intermediate",
  "elapse",
  "revive",
  "cousin",
  "romantic",
  "drug",
  "money",
  "candle",
  "item",
  "civilization",
  "econobox",
  "explode",
  "sign",
  "range",
  "dark",
  "flock",
  "chain",
  "air",
  "calf",
  "salad",
  "separation",
  "drama",
  "advance",
  "performance",
  "echo",
  "hierarchy",
  "exact",
  "philosophy",
  "tenant",
  "basketball",
  "speech",
  "hemisphere",
  "terrify",
  "empirical",
  "tablet",
  "hay",
  "loyalty",
  "cap",
  "departure",
  "magazine",
  "black",
  "comfortable",
  "tiger",
  "friend",
  "silk",
  "doubt",
  "dough",
  "counter",
  "arise",
  "hunting",
  "budget",
  "charity",
  "stop",
  "mole",
  "spill",
  "coach",
  "abundant",
  "uniform",
  "wage",
  "funeral",
  "site",
  "betray",
  "will",
  "justify",
  "folk",
  "hip",
  "midnight",
  "wilderness",
  "move",
  "straw",
  "chalk",
  "wear",
  "survival",
  "constitution",
  "recommend",
  "pause",
  "spend",
  "axis",
  "sin",
  "symbol",
  "round",
  "track",
  "abandon",
  "style",
  "meaning",
  "tape",
  "change",
  "acquit",
  "sailor",
  "blue",
  "escape",
  "clay",
  "format",
  "harvest",
  "twin",
  "rotate",
  "gradient",
  "estimate",
  "inside",
  "upset",
  "population",
  "magnitude",
  "tank",
  "full",
  "shoot",
  "flag",
  "enter",
  "reliable",
  "retirement",
  "door",
  "labor",
  "jockey",
  "campaign",
  "dare",
  "mutual",
  "owe",
  "dull",
  "biology",
  "sigh",
  "poison",
  "section",
  "raw",
  "siege",
  "clarify",
  "arch",
  "requirement",
  "underline",
  "nail",
  "density",
  "apathy",
  "father",
  "complete",
  "grip",
  "whip",
  "runner",
  "concept",
  "retreat",
  "feed",
  "password",
  "duck",
  "floor",
  "comprehensive",
  "obstacle",
  "woman",
  "creation",
  "valid",
  "urgency",
  "Europe",
  "relieve",
  "flight",
  "sheep",
  "anticipation",
  "cane"];
}
