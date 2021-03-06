module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1580873891915, function(require, module, exports) {


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var countDict = require('./stroke-count-fan.json');

var orderDict = require('./stroke-order-fan.json');

var convert = require('./converter');

var arg = {
  simple: 'simple',
  array: 'array',
  order: 'order' // 开启简单模式

};
var _ = {}; // 工具方法

function main(cnchar) {
  if (cnchar.plugins.indexOf('trad') !== -1) {
    return;
  }

  cnchar.plugins.push('trad');
  cnchar.convert = convert;
  var _p = String.prototype;
  cnchar.type.spell.simple = arg.simple;
  cnchar.type.stroke.simple = arg.simple;
  reinitSpell(_p, cnchar);
  reinitStroke(_p, cnchar); // _p.convert = function(to,from){return convert(this,to,from);}

  _p.convertSimpleToTrad = function () {
    return convert.simpleToTrad(this);
  };

  _p.convertSimpleToSpark = function () {
    return convert.simpleToSpark(this);
  };

  _p.convertTradToSimple = function () {
    return convert.tradToSimple(this);
  };

  _p.convertTradToSpark = function () {
    return convert.tradToSpark(this);
  };

  _p.convertSparkToSimple = function () {
    return convert.sparkToSimple(this);
  };

  _p.convertSparkToTrad = function () {
    return convert.sparkToTrad(this);
  }; // _p.convertToTrad = function(){return convert.toTrad(this);}
  // _p.convertToSimple = function(){return convert.toSimple(this);}
  // _p.convertToSpark = function(){return convert.toSpark(this);}


  _ = cnchar._;
  _.convert = convert;

  _.dict.getTradOrders = function () {
    return orderDict;
  };

  _.dict.getTradCount = function () {
    return countDict;
  };
}

function init(cnchar) {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.CnChar) {
    main(window.CnChar);
  } else if (typeof cnchar !== 'undefined') {
    main(cnchar);
  }
}

function reinitSpell(proto, cnchar) {
  var _spell = cnchar.spell;

  var newSpell = function newSpell() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var str = args[0];
    args = args.splice(1);

    if (!_.has(args, arg.simple)) {
      // 默认繁体模式
      str = convert.tradToSimple(str);
    }

    return _spell.apply(void 0, [str].concat(_toConsumableArray(args)));
  };

  proto.spell = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return newSpell.apply(void 0, [this].concat(args));
  };

  cnchar.spell = function () {
    return newSpell.apply(void 0, arguments);
  };

  if (!cnchar._.poly) {
    cnchar._reinitSpellPoly = function () {
      _spell = cnchar.spell;

      proto.spell = function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return newSpell.apply(void 0, [this].concat(args));
      };

      cnchar.spell = function () {
        return newSpell.apply(void 0, arguments);
      };
    };

    ;
  }
}

function reinitStroke(proto, cnchar) {
  var _stroke = cnchar.stroke;

  var _new = function _new() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var str = args[0];
    args = args.splice(1);

    _.checkArgs('stroke', args, true);

    var isArr = _.has(args, arg.array);

    var isOrder = _.has(args, arg.order);

    if (!isArr) {
      args.push(arg.array);
    } // 先使用array模式


    var res = _stroke.apply(void 0, [str].concat(_toConsumableArray(args))); // 没有繁体的结果


    if (!isOrder) {
      // stroke 方法
      if (_.has(args, arg.simple)) {
        // 启用简单模式则 直接返回
        return isArr ? res : _.sumStroke(res);
      }

      for (var i = 0; i < countDict.length; i++) {
        for (var j = 0; j < res.length; j++) {
          if (res[j] === 0 && countDict[i].indexOf(str[j]) !== -1) {
            res[j] = i;
          }
        }
      }

      return isArr ? res : _.sumStroke(res);
    } else {
      // strokeOrder 方法
      if (_.has(args, arg.simple)) {
        // 启用简单模式则 直接返回
        return res;
      } else {
        // 将其中的繁体字获取 strokeOrder
        var igList = [];

        for (var i = 0; i < res.length; i++) {
          if (typeof res[i] === 'undefined') {
            res[i] = orderDict[str[i]]; // 字母版笔画表
          } else {
            igList.push(i);
          }
        }

        return _.orderWithLetters(res, str, args, igList);
      }
    }
  };

  proto.stroke = function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return _new.apply(void 0, [this].concat(args));
  };

  cnchar.stroke = function () {
    return _new.apply(void 0, arguments);
  };

  if (!cnchar._.order) {
    cnchar._reinitStrokeOrder = function () {
      _stroke = cnchar.stroke;

      proto.stroke = function () {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        return _new.apply(void 0, [this].concat(args));
      };

      cnchar.stroke = function () {
        return _new.apply(void 0, arguments);
      };
    };

    ;
  }
}

init();
module.exports = init;
}, function(modId) {var map = {"./stroke-count-fan.json":1580873891916,"./stroke-order-fan.json":1580873891917,"./converter":1580873891918}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1580873891916, function(require, module, exports) {
module.exports = [
	"",
	"",
	"",
	"三",
	"戶內勻",
	"冊",
	"丟扡汙",
	"貝別車沈沖囪兌夾見決呂沒刪禿吳災妝壯",
	"並長東兒岡矽糾屆況來兩侖門妳臥協亞軋爭狀",
	"訂飛風負訃軌紅後級計紀勁荊軍侶卻紉陝屍帥韋俠洶彥頁約則柵貞陣茲",
	"剝狽畢財倉陳恥純島釘凍鬥紡紛剛個宮貢剮華記莢莖徑晉庫倆連陸倫馬脈們畝納紐豈氣訖殺紗閃師時書孫討條紋烏務峽狹挾脅軒訓訊陰郵娛員悅這針紙莊",
	"敗絆閉貶缽參側産處從帶釣頂動隊訛釩販訪婦崗夠貫規國過貨堅將階淨進訣萊淚涼淩婁鹵掄淪麥覓鳥貧淒啓牽釺淺強氫頃區軟掃紹設紳視術訟貪屜烴脫偉問渦習細現鄉許敘啞訝陽異魚責紮斬張帳偵掙猙執終晝專著組",
	"綁報備筆補殘廁測場鈔創詞湊達貸單盜棟鈍惡貳發琺飯費馮鈣稈臯給鈎貴賀壺畫換喚渙黃揮葷渾禍極幾間堿揀減絞痙廄傑結絕鈞開凱殼塊勞祿絡買貿悶鈉惱甯鈕評棲棄喬欽韌絨閏傘喪腎勝稅順絲訴筍湯貼統萬違圍爲葦無閑廂項虛須絢尋硯揚堯爺葉壹飲喲詠湧猶遊馭淵雲鄖隕運棗詐棧脹診幀衆軸貯鄒詛",
	"愛奧頒飽鉑蒼滄詫腸誠馳傳誕當搗滌遞電叠頓煩楓該蓋幹溝詭號嘩話煥毀賄會彙際賈鉀腳較節經絹僅誇裏蓮漣煉賃鈴虜賂亂媽嗎鉚夢滅腦農鉛鉗嗆搶傾傷聖獅詩勢飾試飼頌肅綏歲損塗蛻馱頑溫窩嗚塢廈羨詳詢馴遜煙楊搖遙業義詣蔭傭鈾與預園圓遠粵暈載賊閘債盞睜腫誅裝資",
	"幣賓餅駁蔔慚慘摻嘗暢塵稱綢綽蔥鄲鄧墊對奪墮爾餌罰閥瘋鳳輔複趕綱閣鉻構慣廣閨滾漢閡滬劃瘓誨夥監箋漸蔣鉸僥餃稭誡緊盡摳寬厲鄰領摟鋁屢綠綸瑪滿麽綿閩鳴銘瘧嘔漚頗齊塹槍僑寢輕認榮賒滲蝕實適壽說碩誦隨瑣態銅圖團窪網維僞聞撾蝸誣誤銑銜緒厭瘍養瑤銥銀熒誘漁語獄劄嶄綻漲趙鄭滯種墜綴漬綜",
	"皚罷輩鋇編標撥層廠徹撐遲齒廚鋤瘡賜撣憚彈蕩導敵締調賭緞餓範誹廢墳憤鋒膚撫賦鞏劊輥緩輝緝價駕緘儉踐賤劍澗漿槳獎膠澆嬌駒劇潔課褲儈潰撈澇樂憐練輛諒遼凜劉樓魯慮輪論碼罵賣邁貓冪緬廟憫撓鬧餒撚諾歐毆盤賠噴潑撲鋪遷潛請慶窮確熱銳潤賞審駛樞豎數誰慫撻談歎銻駝橢緯衛蕪蝦賢險線銷寫鋅噓選鴉樣窯遺儀億誼瑩憂緣閱暫賬摯幟質皺豬諸駐樁諄",
	"辦鮑憊艙熾醜錘錯擔擋燈澱諜錠獨噸奮縫諷輻縛鋼館龜鍋駭橫還謊諱獲機積輯薊劑頰撿薦鍵餞頸靜舉據鋸錦墾窺賴勵曆龍盧擄錄駱螞瞞錨錳謎謀膩濃頻憑樸錢薔橋親薩篩燒輸樹壇燙縧頭頹鴕謂錫鍁縣餡憲蕭曉嘯諧興學勳鴨閹閻諺鴦頤彜憶隱螢營穎擁踴嶼鴛擇澤戰鍺築磚錐濁",
	"襖幫謗繃斃濱擯燦償騁儲聰膽檔點鍍鍛糞擱鴿購韓鴻環燴擊績擠濟艱檢講矯舊駿顆懇虧擴闊藍闌濫禮隸聯斂臉療臨嶺簍縷鎂彌擬獰擰濘膿謙牆鍬趨賽澀聲濕聳雖縮擡濤謄濰甕戲轄嚇鮮謝壓謠嬰應優輿禦轅嶽醞鍘齋氈輾蟄擲鍾謅燭賺贅總縱",
	"翺擺鎊邊蟬蟲雛礎闖叢竄禱斷鵝額豐鎬歸櫃穢雞繭簡檻濺醬鵑謹燼曠壘離鯉鏈糧獵餾隴濾謾謬攆聶鎳檸臍騎翹竅瓊軀擾繞繕嬸繩雙擻鎖題鎢霧瀉顔藥醫藝蠅雜鎮織職轉蹤",
	"藹礙癟瀕鏟懲癡寵疇櫥辭顛犢關懷壞繪譏繳轎鯨鏡礦臘懶類麗瀝簾嚨壟攏蘆廬羅饅難龐鵬騙蘋譜簽勸鵲騷識獸爍蘇獺譚襪穩蠍繡嚴癢蟻繹願蘊韻贊贈轍證",
	"寶辮攙闡襯籌觸黨礬護饑繼艦競覺饋攔籃蘭瀾礫鐐齡爐飄譴饒鰓贍釋騰犧鹹獻響懸議譯贏譽竈",
	"辯纏躊顧鶴轟歡殲懼巋蠟欄覽爛鐳鐮騾齧驅權攝懾屬鐵囂攜鏽續櫻躍贓髒",
	"顫疊讀龔鑒驕驚聾籠巒孿蘿邏鷗竊灑贖攤灘體聽彎襲癬攢鑄",
	"變鼈蠱攪戀鱗攣黴曬纖顯驗纓癰",
	"壩蠶讒贛觀鹼讕攬籬靈釀齲讓癱鹽鷹驟囑",
	"饞躥顱籮蠻廳灣鑲鑰",
	"驢灤鑷顴釁矚",
	"纜鑼鑽",
	"豔鑿",
	"",
	"",
	"",
	"籲"
]
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1580873891917, function(require, module, exports) {
module.exports = {
	"皚": "sfcjjfbfjfcjksj",
	"藹": "jffkjjjfcjfcjjsrskb",
	"礙": "jsfcjsusjjskekefjsl",
	"愛": "skksdedykksel",
	"翺": "sfcjjjkiskjfrkirki",
	"襖": "kefsksfcksjfskjsl",
	"奧": "sfcsksjfskjsl",
	"壩": "jfijdefkkkkjffjfcjjfsrjj",
	"罷": "fcffjnkfrjjsusu",
	"擺": "jgifcffjnkfrjjsusu",
	"敗": "fcjjjsksjsl",
	"頒": "skrsjsfcjjjsk",
	"辦": "kjksjjsrskjksjjf",
	"絆": "nnkdkkksjjf",
	"幫": "jfjjfijgksfcjjfrf",
	"綁": "nnkdkkjjjswf",
	"鎊": "skjjfksikjksdekjrs",
	"謗": "kjjjfcjkjksdekjrs",
	"剝": "nejgkiskfg",
	"飽": "skkcjjhksrcju",
	"寶": "kdejjfisjjfbffcjjjsk",
	"報": "jfjksjjfrfel",
	"鮑": "sefcjfjdkkksrcju",
	"輩": "fjjjfjjjjfcjjjf",
	"貝": "fcjjjsk",
	"鋇": "skjjfksifcjjjsk",
	"狽": "stsfcjjjsk",
	"備": "sfjffjsfrjjf",
	"憊": "sfjffjsfrjjfdykk",
	"繃": "nnkdkkfbfsrjjsrjj",
	"筆": "sjksjkcjjjjf",
	"畢": "fcjjjffjjf",
	"斃": "ksfcfsksjsljseksu",
	"幣": "ksfcfsksjslfrf",
	"閉": "cjjffrjjjgs",
	"邊": "sfcjjjkdeskkjrskal",
	"編": "nnkdkkkcjsfrjff",
	"貶": "fcjjjskskel",
	"變": "kjjjfcjnnkdkknnkdkksjsl",
	"辯": "kjksjjskjjjfcjkjksjjf",
	"辮": "kjksjjsnnkgskkjksjjf",
	"標": "jfskjfcffjjjgsk",
	"鼈": "ksfcfsksjslfcjfcjjjujbj",
	"別": "fcjrsfg",
	"癟": "kjskisfcjjjsljfrjff",
	"瀕": "kkifjfjfssjsfcjjjsk",
	"濱": "kkikdejfssfcjjjsk",
	"賓": "kdejfssfcjjjsk",
	"擯": "jgikdejfssfcjjjsk",
	"餅": "skkcjjhkksjjsf",
	"並": "ksjffksj",
	"撥": "jgieksslcjzsvek",
	"缽": "sjjfbfjfslj",
	"鉑": "skjjfksisfcjj",
	"駁": "jfjjfrdkkksksl",
	"蔔": "jffsrjfcjfcjfj",
	"補": "kefskjfrjjfk",
	"財": "fcjjjskjgs",
	"參": "nknknkslsss",
	"蠶": "jbshjbsufcjjfcjfjkfcjfjk",
	"殘": "jsekjyskjysk",
	"慚": "dkfjfcjjjfssjf",
	"慘": "dkfnknknkslsss",
	"燦": "dsskfjsekekksjfsl",
	"蒼": "jffslkcjjsfcj",
	"艙": "ssrkjkslkcjjsfcj",
	"倉": "slkcjjsfcj",
	"滄": "kkislkcjjsfcj",
	"廁": "kjsfcjjjskfg",
	"側": "sffcjjjskfg",
	"冊": "frjff",
	"測": "kkifcjjjskfg",
	"層": "cjsksfcfksjfcjj",
	"詫": "kjjjfcjkdesju",
	"攙": "jgisefcjjhsusefcjsuk",
	"摻": "jginknknkslsss",
	"蟬": "fcjfjkfcjfcjfcjjjf",
	"饞": "skkcjjhksefcjjhsusefcjsuk",
	"讒": "kjjjfcjsefcjjhsusefcjsuk",
	"纏": "nnkdkkkjsfcjjfjjskjfj",
	"鏟": "skjjfksikjksjssjjfj",
	"産": "kjksjssjjfj",
	"闡": "cjjffrjjfcjfcjfcjjjf",
	"顫": "kjfcfcjjfcjjijsfcjjjsk",
	"場": "jfifcjjjsrss",
	"嘗": "fksdefcjsufcjj",
	"長": "jfjjjhsl",
	"償": "sffksdefcjfcjjjsk",
	"腸": "srjjfcjjjsrss",
	"廠": "kjsfksfrfcjsjsl",
	"暢": "fcjjffcjjjsrss",
	"鈔": "skjjfksifdks",
	"車": "jfcjjjf",
	"徹": "ssfkjnkfrjjsjsl",
	"塵": "kjscffjjhsujfj",
	"沈": "kkidesu",
	"陳": "wfjfcjjfsl",
	"襯": "kefskkjksjjgskfcjjsu",
	"撐": "jgifksdefcjjngs",
	"稱": "sjfskskksfrfjj",
	"懲": "ssffbfjjjfjsjsldykk",
	"誠": "kjjjfcjjsrysk",
	"騁": "jfjjfrdkkkfcjfjjz",
	"癡": "kjskisusjjskekefjsl",
	"遲": "cjsfkisksjjfkal",
	"馳": "jfjjfrdkkkrfu",
	"恥": "jffjjidykk",
	"齒": "fjfjskskjskskbf",
	"熾": "dsskkjksjfcjjysk",
	"沖": "kkifcjf",
	"蟲": "fcjfjkfcjfjkfcjfjk",
	"寵": "kdekjksjfrjjjxjujjj",
	"疇": "fcjfjjfjejfjjfcjjgk",
	"躊": "fcjfjfijfjejfjjfcjjgk",
	"籌": "sjksjkjfjejfjjfcjjgk",
	"綢": "nnkdkksrjfjfcj",
	"醜": "jfcsbjjsfcjjsunk",
	"櫥": "jfskkjsjfjfcjksijgk",
	"廚": "kjsjfjfcjksijgk",
	"鋤": "skjjfksifcjjirs",
	"雛": "srbfssrbfssfkjjjfj",
	"礎": "jsfcjjfskjfslefjsl",
	"儲": "sfkjjjfcjjfjsfcjj",
	"觸": "sesrjjffcffjsrfcjfjk",
	"處": "fjesjuselso",
	"傳": "sfjfcjjfjkjgk",
	"瘡": "kjskislkcjjsfcj",
	"闖": "cjjffrjjjfjjfrdkkk",
	"創": "skkcjjsfcjfg",
	"錘": "skjjfksisjfjffjj",
	"純": "nnkdkkjbfu",
	"綽": "nnkdkkfjfcjjjf",
	"辭": "skksekfrnkekkjksjjf",
	"詞": "kjjjfcjrjfcj",
	"賜": "fcjjjskfcjjsrss",
	"聰": "jffjjisfcsekjdykk",
	"蔥": "jffsfcsekjdykk",
	"囪": "sfcsskj",
	"從": "ssfskskfjsl",
	"叢": "ffksjksjjfjffjjiel",
	"湊": "kkijjjsljjsk",
	"躥": "fcjfjfikdesksfjcjjhkkhkky",
	"竄": "kdesksfjcjjhkkhkky",
	"錯": "skjjfksijffjfcjj",
	"達": "jfjksjjjfkal",
	"帶": "jffjsudefrf",
	"貸": "sfjykfcjjjsk",
	"擔": "jgisejsskkjjjfcj",
	"單": "fcjfcjfcjjjf",
	"鄲": "fcjfcjfcjjjfwf",
	"撣": "jgifcjfcjfcjjjf",
	"膽": "srjjsejsskkjjjfcj",
	"憚": "dkffcjfcjfcjjjf",
	"誕": "kjjjfcjsfjbal",
	"彈": "cjzfcjfcjfcjjjf",
	"當": "fksdefcjfcjfj",
	"擋": "jgifksdefcjfcjfj",
	"黨": "fksdefcjfcksjfjjdkkk",
	"蕩": "jffkkifcjjjsrss",
	"檔": "jfskfksdefcjfcjfj",
	"搗": "jgisfcjjjrfbf",
	"島": "sfcjjjrfbf",
	"禱": "kefkjfjejfjjfcjjgk",
	"導": "ksjsfcjjjkaljgk",
	"盜": "kkiseslfcffj",
	"燈": "dsskekssljfcjksj",
	"鄧": "eksskjfcjksiwf",
	"敵": "kjksfrjffcjsjsl",
	"滌": "kkisffseljgsk",
	"遞": "ssfjesjusokal",
	"締": "nnkdkkkjksdefrf",
	"顛": "jffcjjjjskjsfcjjjsk",
	"點": "fcksjfjidkkkfjfcj",
	"墊": "jfjksjjfsokjfj",
	"電": "jdefkkkkfcjju",
	"澱": "kkicjsjffjsksvel",
	"釣": "skjjfksisrk",
	"調": "kjjjfcjsrjfjfcj",
	"叠": "ekekekdefcjjj",
	"諜": "kjjjfcjjffjbjfsl",
	"疊": "fcjfjfcjfjfcjfjdefcjjj",
	"釘": "skjjfksijg",
	"頂": "jgjsfcjjjsk",
	"錠": "skjjfksikdejfjsl",
	"訂": "kjjjfcjjg",
	"丟": "jjfjnk",
	"東": "jfcjjfsl",
	"動": "sjfcjjjfirs",
	"棟": "jfskjfcjjfsl",
	"凍": "kijfcjjfsl",
	"鬥": "jjfjfjjfjg",
	"犢": "sjfijfjfcffjfcjjjsk",
	"獨": "stsfcffjsrfcjfjk",
	"讀": "kjjjfcjjfjfcffjfcjjjsk",
	"賭": "fcjjjskjfjsfcjj",
	"鍍": "skjjfksikjsjffjel",
	"鍛": "skjjfksisfjjisvel",
	"斷": "nnknnkjnnknnkbssjf",
	"緞": "nnkdkksfjjisvel",
	"兌": "slfcjsu",
	"隊": "wfksjstsssl",
	"對": "ffksjksjjfijgk",
	"噸": "fcjjbfhjsfcjjjsk",
	"頓": "jbfhjsfcjjjsk",
	"鈍": "skjjfksijbfu",
	"奪": "jslsfkjjjfjjgk",
	"墮": "wfjsjfjfrjjjfj",
	"鵝": "sjgiysksfcjjjrdkkk",
	"額": "kdesekfcjjsfcjjjsk",
	"訛": "kjjjfcjsfsu",
	"惡": "jfjxxjfjdykk",
	"餓": "skkcjjhksjgiysk",
	"兒": "sfjcjjsu",
	"爾": "jskfrfsksksksk",
	"餌": "skkcjjhkjffjjj",
	"貳": "jjjfcjjjskyk",
	"發": "eksslcjzsvek",
	"罰": "fcffjkjjjfcjfg",
	"閥": "cjjffrjjsfjysk",
	"琺": "jjfikkijfjnk",
	"礬": "jfskskskjfskjsljsfcj",
	"釩": "skjjfksisok",
	"煩": "dsskjsfcjjjsk",
	"範": "sjksjkjfcjjjfru",
	"販": "fcjjjskssel",
	"飯": "skkcjjhkssel",
	"訪": "kjjjfcjkjrs",
	"紡": "nnkdkkkjrs",
	"飛": "osksosksf",
	"誹": "kjjjfcjfjjjfjjj",
	"廢": "kjseksslcjzsvek",
	"費": "cjzsffcjjjsk",
	"紛": "nnkdkkslrs",
	"墳": "jfijfjfffcjjjsk",
	"奮": "jslsfkjjjfjfcjfj",
	"憤": "dkfjfjfffcjjjsk",
	"糞": "ksjfslfcjfjjffjsk",
	"豐": "jjjffjjjfbfjfcjksj",
	"楓": "jfsksosfcjfjk",
	"鋒": "skjjfksiseljjjf",
	"風": "sosfcjfjk",
	"瘋": "kjskisosfcjfjk",
	"馮": "kijfjjfrdkkk",
	"縫": "nnkdkkseljjjfkal",
	"諷": "kjjjfcjsosfcjfjk",
	"鳳": "sojsfcjjjrdkkk",
	"膚": "fjesjufcjfjfrjj",
	"輻": "jfcjjjfjfcjfcjfj",
	"撫": "jgisjjffffjdkkk",
	"輔": "jfcjjjfjfrjjfk",
	"賦": "fcjjjskjjfjfiyk",
	"複": "kefsksjfcjjsel",
	"負": "sefcjjjsk",
	"訃": "kjjjfcjfk",
	"婦": "msjcjjdefrf",
	"縛": "nnkdkkjfcjjfkjgk",
	"該": "kjjjfcjkjnssk",
	"鈣": "skjjfksijfjz",
	"蓋": "jffjfjnkfcffj",
	"幹": "jffcjjjfsljjf",
	"趕": "jfjfjslfcjjjjf",
	"稈": "sjfskfcjjjjf",
	"贛": "kjksjfcjjjfseljfjfcjjjsk",
	"岡": "frksjfbf",
	"剛": "frksjfbffg",
	"鋼": "skjjfksifrksjfbf",
	"綱": "nnkdkkfrksjfbf",
	"崗": "fbffrksjfbf",
	"臯": "sfcjjjkiskjf",
	"鎬": "skjjfksikjfcjfrfcj",
	"擱": "jgicjjffrjjselfcj",
	"鴿": "skjfcjsfcjjjrdkkk",
	"閣": "cjjffrjjselfcj",
	"鉻": "skjjfksiselfcj",
	"個": "sffcjffcjj",
	"給": "nnkdkksljfcj",
	"龔": "kjksjfrjjjxjujjjjffjsk",
	"宮": "kdefcjsfcj",
	"鞏": "jfisokjffjfcjjf",
	"貢": "jfjfcjjjsk",
	"鈎": "skjjfksisrnk",
	"溝": "kkijjffjfrfjj",
	"構": "jfskjjffjfrfjj",
	"購": "fcjjjskjjffjfrfjj",
	"夠": "sekseksrfcj",
	"蠱": "fcjfjkfcjfjkfcjfjkfcffj",
	"顧": "kcjssfkjjjfjjsfcjjjsk",
	"剮": "fccfrfcjfg",
	"關": "cjjffrjjnnknnkbsfjf",
	"觀": "jfffcjfcjsfkjjjfjfcjjjsu",
	"館": "skkcjjhkkdefcjcj",
	"慣": "dkfbcfjfcjjjsk",
	"貫": "bcfjfcjjjsk",
	"廣": "kjsjffjfcjfjsk",
	"規": "jjskfcjjjsu",
	"矽": "jsfcjsek",
	"歸": "sfcjcjfjficjjdefrf",
	"龜": "sfcjfcskjucjjcjj",
	"閨": "cjjffrjjjfjjfj",
	"軌": "jfcjjjfso",
	"詭": "kjjjfcjsejsru",
	"櫃": "jfskjfcjfjfcjjjskb",
	"貴": "fcjfjfcjjjsk",
	"劊": "skjfcfksjfcjjfg",
	"輥": "jfcjjjffcjjjhsu",
	"滾": "kkikjskfcjshsl",
	"鍋": "skjjfksifccfrfcj",
	"國": "fcjfcjiyskj",
	"過": "fccfrfcjkal",
	"駭": "jfjjfrdkkkkjnssk",
	"韓": "jffcjjjfcfjfcjjnf",
	"漢": "kkijffjfcjjjsl",
	"號": "fcjjzfjesjuso",
	"閡": "cjjffrjjkjnssk",
	"鶴": "desfkjjjfjsfcjjjrdkkk",
	"賀": "rsfcjfcjjjsk",
	"橫": "jfskjffjjfcjfjsk",
	"轟": "jfcjjjfjfcjjjfjfcjjjf",
	"鴻": "kkijfisfcjjjrdkkk",
	"紅": "nnkdkkjfj",
	"後": "ssfnnksel",
	"壺": "jfjdefjxxjfj",
	"護": "kjjjfcjjffsfkjjjfjel",
	"滬": "kkikcjsfcjcfju",
	"戶": "sscj",
	"嘩": "fcjjffjjffjjf",
	"華": "jffjjffjjf",
	"畫": "cjjjfjfcjfjj",
	"劃": "cjjjfjfcjfjifg",
	"話": "kjjjfcjsjffcj",
	"懷": "dkfkjfcffjfkiskshsl",
	"壞": "jfikjfcffjfkiskshsl",
	"歡": "jfffcjfcjsfkjjjfjsesl",
	"環": "jjfifcffjjfcjshsl",
	"還": "fcffjjfcjshskkal",
	"緩": "nnkdkkskksjjsel",
	"換": "jgisefcskjsl",
	"喚": "fcjsefcskjsl",
	"瘓": "kjskisefcskjsl",
	"煥": "dssksefcskjsl",
	"渙": "kkisefcskjsl",
	"黃": "jffjjfcjfjsk",
	"謊": "kjjjfcjjffkjbsfu",
	"揮": "jgidejfcjjjf",
	"輝": "fksjshdejfcjjjf",
	"毀": "sfjcjjjfisvel",
	"賄": "fcjjjskjsfrjj",
	"穢": "sjfskfjfjjsjfssysk",
	"會": "sljfcfksjfcjj",
	"燴": "dssksljfcfksjfcjj",
	"彙": "nejdefcjjjfsl",
	"諱": "kjjjfcjcfjfcjjnf",
	"誨": "kjjjfcjsjbrkjk",
	"繪": "nnkdkksljfcfksjfcjj",
	"葷": "jffdejfcjjjf",
	"渾": "kkidejfcjjjf",
	"夥": "fcjjjfskseksek",
	"獲": "stsjffsfkjjjfjel",
	"貨": "sfsufcjjjsk",
	"禍": "kefkfccfrfcj",
	"擊": "jfcjjjfbfsvelsjjg",
	"機": "jfsknnknnkjskysk",
	"積": "sjfskjjfjfcjjjsk",
	"饑": "skkcjjhknnknnkjskysk",
	"譏": "kjjjfcjnnknnkjskysk",
	"雞": "skksnnkjsksfkjjjfj",
	"績": "nnkdkkjjfjfcjjjsk",
	"緝": "nnkdkkfcjjffjjj",
	"極": "jfskegfcjekj",
	"輯": "jfcjjjffcjjffjjj",
	"級": "nnkdkksal",
	"擠": "jgikjksfrsshlsfjj",
	"幾": "nnknnkjskysk",
	"薊": "jffsefcjfjdkkkfg",
	"劑": "kjksfrsshlsfjjfg",
	"濟": "kkikjksfrsshlsfjj",
	"計": "kjjjfcjjf",
	"記": "kjjjfcjcju",
	"際": "wfsekkeljjgsk",
	"繼": "nnkdkknnknnkjnnknnkb",
	"紀": "nnkdkkcju",
	"夾": "jsksksl",
	"莢": "jffjsksksl",
	"頰": "jskskskjsfcjjjsk",
	"賈": "jfcffjfcjjjsk",
	"鉀": "skjjfksifcjjf",
	"價": "sfjfcffjfcjjjsk",
	"駕": "rsfcjjfjjfrdkkk",
	"殲": "jsekskskjfjjjfjjjiysk",
	"監": "jfcjfbsjkfcffj",
	"堅": "jfcjfbeljfj",
	"箋": "sjksjkjyskjysk",
	"間": "cjjffrjjfcjj",
	"艱": "jffjfcjjjskcjjhsl",
	"緘": "nnkdkkjsjfcjysk",
	"繭": "jfffrfnnkdkkfcjfjk",
	"檢": "jfsksljfcjfcjsksk",
	"堿": "jfijsjfcjysk",
	"鹼": "fjfcskkkkkjsljfcjfcjsksk",
	"揀": "jgijfcksjfsl",
	"撿": "jgisljfcjfcjsksk",
	"簡": "sjksjkcjjffrjjfcjj",
	"儉": "sfsljfcjfcjsksk",
	"減": "kkijsjfcjysk",
	"薦": "jffkjscffjjzdkkk",
	"檻": "jfskjfcjfbsjkfcffj",
	"鑒": "jfcjfbsjkfcffjsljjfksj",
	"踐": "fcjfjfijyskjysk",
	"賤": "fcjjjskjyskjysk",
	"見": "fcjjjsu",
	"鍵": "skjjfksicjjjjfal",
	"艦": "ssrkjkjfcjfbsjkfcffj",
	"劍": "skjfcjfcjskskfg",
	"餞": "skkcjjhkjyskjysk",
	"漸": "kkijfcjjjfssjf",
	"濺": "kkifcjjjskjyskjysk",
	"澗": "kkicjjffrjjfcjj",
	"將": "bfjssekkjgk",
	"漿": "bfjssekkjgkgesl",
	"蔣": "jffbfjssekkjgk",
	"槳": "bfjssekkjgkjfsl",
	"獎": "bfjssekkjgkjslk",
	"講": "kjjjfcjjjffjfrfjj",
	"醬": "bfjssekkjgkjfcsbjj",
	"膠": "srjjckickislsss",
	"澆": "kkijfjjfijfjjsu",
	"驕": "jfjjfrdkkksjslfcjfrfcj",
	"嬌": "msjsjslfcjfrfcj",
	"攪": "jgisfjjskskcjjdefcjjjsu",
	"鉸": "skjjfksikjsksl",
	"矯": "sjjsksjslfcjfrfcj",
	"僥": "sfjfjjfijfjjsu",
	"腳": "srjjskskfcjrf",
	"餃": "skkcjjhkkjsksl",
	"繳": "nnkdkksfcjjkjrssjsl",
	"絞": "nnkdkkkjsksl",
	"轎": "jfcjjjfsjslfcjfrfcj",
	"較": "jfcjjjfkjsksl",
	"稭": "sjfskjhsusfcjj",
	"階": "wfjhsusfcjj",
	"節": "sjksjkcjjhkrf",
	"莖": "jffjmmmjfj",
	"鯨": "sefcjfjdkkkkjfcjgsk",
	"驚": "jffsrfcjsjsljfjjfrdkkk",
	"經": "nnkdkkjmmmjfj",
	"頸": "jmmmjfijsfcjjjsk",
	"靜": "jjfjfrjjskkscjjg",
	"鏡": "skjjfksikjksjfcjjsu",
	"徑": "ssfjmmmjfj",
	"痙": "kjskijmmmjfj",
	"競": "kjksjfcjshkjksjfcjsu",
	"淨": "kkiskkscjjg",
	"糾": "nnkdkkhf",
	"廄": "kjscjjhksvel",
	"舊": "jffsfkjjjfjsfjcjj",
	"駒": "jfjjfrdkkksrfcj",
	"舉": "sfjjjxfcjjjsljjf",
	"據": "jgifjesjujstsssl",
	"鋸": "skjjfksicjsjffcj",
	"懼": "dkffcjjjfcjjjsfkjjjfj",
	"劇": "fjesjujstssskfg",
	"鵑": "fcjfrjjsfcjjjrdkkk",
	"絹": "nnkdkkfcjfrjj",
	"傑": "sfsekjnfjfsl",
	"潔": "kkijjjfrsnnkgsk",
	"結": "nnkdkkjfjfcj",
	"誡": "kjjjfcjjjsfysk",
	"屆": "cjsjfjbf",
	"緊": "jfcjfbelnnkgsk",
	"錦": "skjjfksisfcjjfrf",
	"僅": "sfjffjfcjjjfj",
	"謹": "kjjjfcjjffjfcjjjfj",
	"進": "sfkjjjfjkal",
	"晉": "jnknkjfcjj",
	"燼": "dsskcjjfjdkkkfcffj",
	"盡": "cjjfjdkkkfcffj",
	"勁": "jmmmjfirs",
	"荊": "jffjjsffg",
	"覺": "sfjjskskcjjdefcjjjsu",
	"決": "kkicjsl",
	"訣": "kjjjfcjcjsl",
	"絕": "nnkdkkrscfju",
	"鈞": "skjjfksisrki",
	"軍": "dejfcjjjf",
	"駿": "jfjjfrdkkknksksel",
	"開": "cjjffrjjjjsf",
	"凱": "fbfjfcjksiso",
	"顆": "fcjjjfskjsfcjjjsk",
	"殼": "jfjdejspsvel",
	"課": "kjjjfcjfcjjjfsl",
	"墾": "skkstsscjjhsljfj",
	"懇": "skkstsscjjhsldykk",
	"摳": "jgijfcjfcjfcjb",
	"庫": "kjsjfcjjjf",
	"褲": "kefskkjsjfcjjjf",
	"誇": "kjjjfcjjsljjz",
	"塊": "jfisfcjjsunk",
	"儈": "sfsljfcfksjfcjj",
	"寬": "kdejfffcjjjsuk",
	"礦": "jsfcjkjsjffjfcjfjsk",
	"曠": "fcjjkjsjffjfcjfjsk",
	"況": "kkifcjsu",
	"虧": "fjesjusfkjjjfjjjz",
	"巋": "fbfsfcjcjfjficjjdefrf",
	"窺": "kdeskjjskfcjjjsu",
	"饋": "skkcjjhkfcjfjfcjjjsk",
	"潰": "kkifcjfjfcjjjsk",
	"擴": "jgikjsjffjfcjfjsk",
	"闊": "cjjffrjjkkisjffcj",
	"蠟": "fcjfjkmmmfcskjhkkhkky",
	"臘": "srjjmmmfcskjhkkhkky",
	"萊": "jffjskskfsl",
	"來": "jskskfsl",
	"賴": "jfcjfsksefcjjjsk",
	"藍": "jffjfcjfbsjkfcffj",
	"欄": "jfskcjjffrjjjfcksjfsk",
	"攔": "jgicjjffrjjjfcksjfsk",
	"籃": "sjksjkjfcjfbsjkfcffj",
	"闌": "cjjffrjjjfcksjfsk",
	"蘭": "jffcjjffrjjjfcksjfsk",
	"瀾": "kkicjjffrjjjfcksjfsk",
	"讕": "kjjjfcjcjjffrjjjfcksjfsk",
	"攬": "jgijfcjfbsjkfcffjfcjjjsu",
	"覽": "jfcjfbsjkfcffjfcjjjsu",
	"懶": "dkfjfcjfsksefcjjjsk",
	"纜": "nnkdkkjfcjfbsjkfcffjfcjjjsu",
	"爛": "dsskcjjffrjjjfcksjfsk",
	"濫": "kkijfcjfbsjkfcffj",
	"撈": "jgidsskdsskders",
	"勞": "dsskdsskders",
	"澇": "kkidsskdsskders",
	"樂": "sfcjjnnknnkjfsl",
	"鐳": "skjjfksijdefkkkkfcjfj",
	"壘": "fcjfjfcjfjfcjfjjfj",
	"類": "ksjfskjskkjsfcjjjsk",
	"淚": "kkikcjsjslk",
	"籬": "sjksjkkjskbffrnksfkjjjfj",
	"離": "kjskbffrnksfkjjjfj",
	"裏": "kjfcjjfjjshsl",
	"鯉": "sefcjfjdkkkfcjjfjj",
	"禮": "kefkfcjffjjfcjksj",
	"麗": "jfckjfckkjscffjjhsu",
	"厲": "jsjfffcjjfrfik",
	"勵": "jsjfffcjjfrfikrs",
	"礫": "jsfcjsfcjjnnknnkjfsl",
	"曆": "jssjfsksjfslfcjj",
	"瀝": "kkijssjfsksjfslfjfj",
	"隸": "jfskjjgskcjjgkisl",
	"倆": "sfjfrfsksk",
	"聯": "jffjjinnknnkhsffj",
	"蓮": "jffjfcjjjfkal",
	"連": "jfcjjjfkal",
	"鐮": "skjjfksikjsksjcjjffsl",
	"憐": "dkfksjfslsekjnf",
	"漣": "kkijfcjjjfkal",
	"簾": "sjksjkkjsksjcjjffsl",
	"斂": "skjfcjfcjsksksjsl",
	"臉": "srjjsljfcjfcjsksk",
	"鏈": "skjjfksijfcjjjfkal",
	"戀": "kjjjfcjnnkdkknnkdkkdykk",
	"煉": "dsskjfcksjfsl",
	"練": "nnkdkkjfcksjfsl",
	"糧": "ksjfskfcjjjfcjjfjj",
	"涼": "kkikjfcjgsk",
	"兩": "jfrfsksk",
	"輛": "jfcjjjfjfrfsksk",
	"諒": "kjjjfcjkjfcjgsk",
	"療": "kjskijslksfcjjgsk",
	"遼": "jslksfcjjgskkal",
	"鐐": "skjjfksijslksfcjjgsk",
	"獵": "stsmmmfcskjhkkhkky",
	"臨": "jfcjfbsjfcjfcjfcj",
	"鄰": "ksjfsksekjnfwf",
	"鱗": "sefcjfjdkkkksjfslsekjnf",
	"凜": "kikjfcfcjjsjfsl",
	"賃": "sfsjfjfcjjjsk",
	"齡": "fjfjskskjskskbfslkek",
	"鈴": "skjjfksislkek",
	"淩": "kkijfjsksel",
	"靈": "jdefkkkkfcjfcjfcjjfskskj",
	"嶺": "fbfskkekjsfcjjjsk",
	"領": "skkekjsfcjjjsk",
	"餾": "skkcjjhkshkrsfcjfj",
	"劉": "shkrsskjjfksifg",
	"龍": "kjksjfrjjjxjujjj",
	"聾": "kjksjfrjjjxjujjjjffjjj",
	"嚨": "fcjkjksjfrjjjxjujjj",
	"籠": "sjksjkkjksjfrjjjxjujjj",
	"壟": "kjksjfrjjjxjujjjjfj",
	"攏": "jgikjksjfrjjjxjujjj",
	"隴": "wfkjksjfrjjjxjujjj",
	"樓": "jfskfcjjfcjfmsj",
	"婁": "fcjjfcjfmsj",
	"摟": "jgifcjjfcjfmsj",
	"簍": "sjksjkfcjjfcjfmsj",
	"蘆": "jfffjesjufcjfjfcffj",
	"盧": "fjesjufcjfjfcffj",
	"顱": "fjesjufcjfjfcffijsfcjjjsk",
	"廬": "kjsfjesjufcjfjfcffj",
	"爐": "dsskfjesjufcjfjfcffj",
	"擄": "jgifjesjufcjfjrs",
	"鹵": "fjfcskkkkkj",
	"虜": "fjesjufcjfjrs",
	"魯": "sefcjfjdkkkfcjj",
	"賂": "fcjjjskselfcj",
	"祿": "kefknejgkisl",
	"錄": "skjjfksinejgkisl",
	"陸": "wfjfjskjfj",
	"驢": "jfjjfrdkkkfjesjufcjfjfcffj",
	"呂": "fcjsfcj",
	"鋁": "skjjfksifcjfcj",
	"侶": "sffcjsfcj",
	"屢": "cjsfcjjfcjfmsj",
	"縷": "nnkdkkfcjjfcjfmsj",
	"慮": "fjesjufcjfjdykk",
	"濾": "kkifjesjufcjfjdykk",
	"綠": "nnkdkknejgkisl",
	"巒": "kjjjfcjnnkdkknnkdkkfbf",
	"攣": "kjjjfcjnnkdkknnkdkksjjg",
	"孿": "kjjjfcjnnkdkknnkdkkegj",
	"灤": "kkikjjjfcjnnkdkknnkdkkjfsl",
	"亂": "skksekfrnkeku",
	"掄": "jgisljfrjff",
	"輪": "jfcjjjfsljfrjff",
	"倫": "sfsljfrjff",
	"侖": "sljfrjff",
	"淪": "kkisljfrjff",
	"綸": "nnkdkksljfrjff",
	"論": "kjjjfcjsljfrjff",
	"蘿": "jfffcffjnnkdkksfkjjjfj",
	"羅": "fcffjnnkdkksfkjjjfj",
	"邏": "fcffjnnkdkksfkjjjfjkal",
	"鑼": "skjjfksifcffjnnkdkksfkjjjfj",
	"籮": "sjksjkfcffjnnkdkksfkjjjfj",
	"騾": "jfjjfrdkkkfcjfjnnkgsk",
	"駱": "jfjjfrdkkkselfcj",
	"絡": "nnkdkkselfcj",
	"媽": "msjjfjjfrdkkk",
	"瑪": "jjfijfjjfrdkkk",
	"碼": "jsfcjjfjjfrdkkk",
	"螞": "fcjfjkjfjjfrdkkk",
	"馬": "jfjjfrdkkk",
	"罵": "fcffjjfjjfrdkkk",
	"嗎": "fcjjfjjfrdkkk",
	"買": "fcffjfcjjjsk",
	"麥": "jfskskslsek",
	"賣": "jfjfcffjfcjjjsk",
	"邁": "jfffcjjfrfikkal",
	"脈": "srjjssshsl",
	"瞞": "fcjjjjffjfrfsksk",
	"饅": "skkcjjhkfcjjfcffjel",
	"蠻": "kjjjfcjnnkdkknnkdkkfcjfjk",
	"滿": "kkijffjfrfsksk",
	"謾": "kjjjfcjfcjjfcffjel",
	"貓": "skkstssjfffcjfj",
	"錨": "skjjfksijfffcjfj",
	"鉚": "skjjfksishsrf",
	"貿": "shkrsfcjjjsk",
	"麽": "kjsjfskjfslsnk",
	"黴": "ssffbfjfcksjfjidkkksjsl",
	"沒": "kkisrel",
	"鎂": "skjjfksiksjjfjjsl",
	"門": "cjjffrjj",
	"悶": "cjjffrjjdykk",
	"們": "sfcjjffrjj",
	"錳": "skjjfksiegjfcffj",
	"夢": "jfffcffjdesek",
	"謎": "kjjjfcjksjfskkal",
	"彌": "cjzjskfrfsksksksk",
	"覓": "skksfcjjjsu",
	"冪": "dejfffcjjjslfrf",
	"綿": "nnkdkksfcjjfrf",
	"緬": "nnkdkkjsfcffjjj",
	"廟": "kjsjffcjjjfsrjj",
	"滅": "kkijsjdsskysk",
	"憫": "dkfcjjffrjjkjsk",
	"閩": "cjjffrjjfcjfjk",
	"鳴": "fcjsfcjjjrdkkk",
	"銘": "skjjfksisekfcj",
	"謬": "kjjjfcjckickislsss",
	"謀": "kjjjfcjjffjjjfsl",
	"畝": "kjfcjfjsel",
	"鈉": "skjjfksifrsk",
	"納": "nnkdkkfrsk",
	"難": "jffjfcjjjsksfkjjjfj",
	"撓": "jgijfjjfijfjjsu",
	"腦": "srjjmmmsfcskj",
	"惱": "dkfmmmsfcskj",
	"鬧": "jjfjfjjfjgkjfrf",
	"餒": "skkcjjhkskksmsj",
	"內": "frsl",
	"擬": "jgisusjjskekefjsl",
	"妳": "msjsegsk",
	"膩": "srjjjjjfcjjjskyk",
	"攆": "jgijjskjjsljfcjjjf",
	"撚": "jgisekkjslkdkkk",
	"釀": "jfcsbjjkjfcjfcjjjffjshsl",
	"鳥": "sfcjjjrdkkk",
	"聶": "jffjjjjffjjijffjjj",
	"齧": "jjjfrsfjfjskskjskskbf",
	"鑷": "skjjfksijffjjjjffjjijffjjj",
	"鎳": "skjjfksisfcjjjjfsl",
	"檸": "jfskkdedykkfcffjjg",
	"獰": "stskdedykkfcffjjg",
	"甯": "kdedykkfrjjf",
	"擰": "jgikdedykkfcffjjg",
	"濘": "kkikdedykkfcffjjg",
	"鈕": "skjjfksicfjj",
	"紐": "nnkdkkcfjj",
	"膿": "srjjfcjffjjsjjhsl",
	"濃": "kkifcjffjjsjjhsl",
	"農": "fcjffjjsjjhsl",
	"瘧": "kjskifjesjujbj",
	"諾": "kjjjfcjjffjsfcj",
	"歐": "jfcjfcjfcjbsesl",
	"鷗": "jfcjfcjfcjbsfcjjjrdkkk",
	"毆": "jfcjfcjfcjbsvel",
	"嘔": "fcjjfcjfcjfcjb",
	"漚": "kkijfcjfcjfcjb",
	"盤": "ssrkjksvelfcffj",
	"龐": "kjskjksjfrjjjxjujjj",
	"賠": "fcjjjskkjksjfcj",
	"噴": "fcjjfjfffcjjjsk",
	"鵬": "srjjsrjjsfcjjjrdkkk",
	"騙": "jfjjfrdkkkkcjsfrjff",
	"飄": "jfcffjjjgsksosfcjfjk",
	"頻": "fjfjfssjsfcjjjsk",
	"貧": "slrsfcjjjsk",
	"蘋": "jfffjfjfssjsfcjjjsk",
	"憑": "kijfjjfrdkkkdykk",
	"評": "kjjjfcjjksjf",
	"潑": "kkieksslcjzsvek",
	"頗": "esfekjsfcjjjsk",
	"撲": "jgiffksjksjjjsl",
	"鋪": "skjjfksijfrjjfk",
	"樸": "jfskffksjksjjjsl",
	"譜": "kjjjfcjksjffksjfcjj",
	"棲": "jfskjcjjfmsj",
	"淒": "kkijcjjfmsj",
	"臍": "srjjkjksfrsshlsfjj",
	"齊": "kjksfrsshlsfjj",
	"騎": "jfjjfrdkkkjskjfcjg",
	"豈": "fbfjfcjksj",
	"啓": "kcjssjslfcj",
	"氣": "sjjoksjfsk",
	"棄": "kjnkjffjjfsl",
	"訖": "kjjjfcjsjo",
	"牽": "kjnnkdesjjf",
	"扡": "jgirfu",
	"釺": "skjjfksisjf",
	"鉛": "skjjfksisvfcj",
	"遷": "jfcffjjskcjukal",
	"簽": "sjksjksljfcjfcjsksk",
	"謙": "kjjjfcjksjcjjffsl",
	"錢": "skjjfksijyskjysk",
	"鉗": "skjjfksijffjj",
	"潛": "kkijbshjbsufcjj",
	"淺": "kkijyskjysk",
	"譴": "kjjjfcjfcjfjfcjcjkal",
	"塹": "jfcjjjfssjfjfj",
	"槍": "jfskslkcjjsfcj",
	"嗆": "fcjslkcjjsfcj",
	"牆": "bfjsjfskskjfcfcjj",
	"薔": "jffjfskskjfcfcjj",
	"強": "cjznkfcjfjk",
	"搶": "jgislkcjjsfcj",
	"鍬": "skjjfksisjfskdssl",
	"橋": "jfsksjslfcjfrfcj",
	"喬": "sjslfcjfrfcj",
	"僑": "sfsjslfcjfrfcj",
	"翹": "jfjjfijfjjsurkirki",
	"竅": "kdesksfcjjkjrssjsl",
	"竊": "kdesksksjfskfjfcskfrnk",
	"欽": "skjjfksisesl",
	"親": "kjksjjgskfcjjjsu",
	"寢": "kdebfjscjjdeel",
	"輕": "jfcjjjfjmmmjfj",
	"氫": "sjjojmmmjfj",
	"傾": "sfjhjsfcjjjsk",
	"頃": "jhjsfcjjjsk",
	"請": "kjjjfcjjjfjfrjj",
	"慶": "kjscffjedykksel",
	"瓊": "jjfisefcskfcjjjsel",
	"窮": "kdesksfrjjjscjz",
	"趨": "jfjfjslsrbfssrbfs",
	"區": "jfcjfcjfcjb",
	"軀": "sfrjjjsjfcjfcjfcjb",
	"驅": "jfjjfrdkkkjfcjfcjfcjb",
	"齲": "fjfjskskjskskbfsfcjfrfik",
	"顴": "jfffcjfcjsfkjjjfjjsfcjjjsk",
	"權": "jfskjfffcjfcjsfkjjjfj",
	"勸": "jfffcjfcjsfkjjjfjrs",
	"卻": "skskfcjrf",
	"鵲": "jffjfcjjsfcjjjrdkkk",
	"確": "jsfcjdesfkjjjfj",
	"讓": "kjjjfcjkjfcjfcjjjffjshsl",
	"饒": "skkcjjhkjfjjfijfjjsu",
	"擾": "jgijsfcjjdedykksel",
	"繞": "nnkdkkjfjjfijfjjsu",
	"熱": "jfjskjfisokdkkk",
	"韌": "cfjfcjjnfrsd",
	"認": "kjjjfcjrsddykk",
	"紉": "nnkdkkrsd",
	"榮": "dsskdsskdejfsl",
	"絨": "nnkdkkjjsysk",
	"軟": "jfcjjjfsesl",
	"銳": "skjjfksislfcjsu",
	"閏": "cjjffrjjjjfj",
	"潤": "kkicjjffrjjjjfj",
	"灑": "kkijfckjfckkjscffjjhsu",
	"薩": "jffwfkjksjssjjfj",
	"鰓": "sefcjfjdkkkfcjfjdykk",
	"賽": "kdejjffjslfcjjjsk",
	"三": "jjj",
	"傘": "slskskskskjf",
	"喪": "jffcjfcjjhsl",
	"騷": "jfjjfrdkkkelkfcjfjk",
	"掃": "jgicjjdefrf",
	"澀": "kkirsdrsdfjfifjfj",
	"殺": "skjgsksvel",
	"紗": "nnkdkkfsks",
	"篩": "sjksjksfcjcjjfrf",
	"曬": "fcjjjfckjfckkjscffjjhsu",
	"刪": "frjfffg",
	"閃": "cjjffrjjsk",
	"陝": "wfjsksksl",
	"贍": "fcjjjsksejsskkjjjfcj",
	"繕": "nnkdkkksjjjfksjfcj",
	"傷": "sfsjfcjjjsrss",
	"賞": "fksdefcjfcjjjsk",
	"燒": "dsskjfjjfijfjjsu",
	"紹": "nnkdkkrsfcj",
	"賒": "fcjjjsksljjgsk",
	"攝": "jgijffjjjjffjjijffjjj",
	"懾": "dkfjffjjjjffjjijffjjj",
	"設": "kjjjfcjsvel",
	"紳": "nnkdkkfcjjf",
	"審": "kdesksjfslfcjfj",
	"嬸": "msjkdesksjfslfcjfj",
	"腎": "jfcjfbelfrjj",
	"滲": "kkinknknkslsss",
	"聲": "jfjcfjssveljffjjj",
	"繩": "nnkdkkfcjfcjjjujbj",
	"勝": "srjjksjjslrs",
	"聖": "jffjjifcjjjfj",
	"師": "sfcjcjjfrf",
	"獅": "stssfcjcjjfrf",
	"濕": "kkifcjjnnknnkdkkk",
	"詩": "kjjjfcjjfjjgk",
	"屍": "cjsjseksu",
	"時": "fcjjjfjjgk",
	"蝕": "skkcjjhkfcjfjk",
	"實": "kdebcfjfcjjjsk",
	"識": "kjjjfcjkjksjfcjjysk",
	"駛": "jfjjfrdkkkfcjsl",
	"勢": "jfjskjfisokrs",
	"適": "kjksfrjffcjkal",
	"釋": "sksjfskfcffjjfjksjjf",
	"飾": "skkcjjhksjfrf",
	"視": "kefkfcjjjsu",
	"試": "kjjjfcjjjfiyk",
	"壽": "jfjejfjjfcjjgk",
	"獸": "fcjfcjfcjfjjfcjjslk",
	"樞": "jfskjfcjfcjfcjb",
	"輸": "jfcjjjfsljfrjjfg",
	"書": "cjjjfjfcjj",
	"贖": "fcjjjskjfjfcffjfcjjjsk",
	"屬": "cjsfkiskfcffjsrfcjfjk",
	"術": "ssfjfskkjjg",
	"樹": "jfskjfjfcjksijgk",
	"豎": "jfcjfbeljfcjksj",
	"數": "fcjjfcjfmsjsjsl",
	"帥": "sfcjcjfrf",
	"雙": "sfkjjjfjsfkjjjfjel",
	"誰": "kjjjfcjsfkjjjfj",
	"稅": "sjfskslfcjsu",
	"順": "sffjsfcjjjsk",
	"說": "kjjjfcjslfcjsu",
	"碩": "jsfcjjsfcjjjsk",
	"爍": "dssksfcjjnnknnkjfsl",
	"絲": "nnkdkknnkgsk",
	"飼": "skkcjjhkrjfcj",
	"聳": "ssfskskfjsljffjjj",
	"慫": "ssfskskfjsldykk",
	"頌": "sknkjsfcjjjsk",
	"訟": "kjjjfcjslnk",
	"誦": "kjjjfcjekfrjjf",
	"擻": "jgifcjjfcjfmsjsjsl",
	"蘇": "jffsefcjfjdkkksjfsl",
	"訴": "kjjjfcjssjfk",
	"肅": "cjjfsfjjcbfjf",
	"雖": "fcjfcjfjksfkjjjfj",
	"隨": "wfjsjfjfrjjkal",
	"綏": "nnkdkkskksmsj",
	"歲": "fjfjjsjfssysk",
	"孫": "egisnnkgsk",
	"損": "jgifcjfcjjjsk",
	"筍": "sjksjksrfcjj",
	"縮": "nnkdkkkdesfjsfcjj",
	"瑣": "jjfifksfcjjjsk",
	"鎖": "skjjfksifksfcjjjsk",
	"獺": "stsjfcjfsksefcjjjsk",
	"撻": "jgijfjksjjjfkal",
	"擡": "jgijfjfcjdejnkjfj",
	"態": "nkfrjjsusudykk",
	"攤": "jgijffjfcjjjsksfkjjjfj",
	"貪": "slkefcjjjsk",
	"癱": "kjskijffjfcjjjsksfkjjjfj",
	"灘": "kkijffjfcjjjsksfkjjjfj",
	"壇": "jfikjfcfcjjfcjjj",
	"譚": "kjjjfcjjfcffjfcjjjf",
	"談": "kjjjfcjdsskdssl",
	"歎": "jffjfcjjjsksesl",
	"湯": "kkifcjjjsrss",
	"燙": "kkifcjjjsrssdssl",
	"濤": "kkijfjejfjjfcjjgk",
	"縧": "nnkdkksffseljgsk",
	"討": "kjjjfcjjgk",
	"騰": "srjjksjjsljfjjfrdkkk",
	"謄": "srjjksjjslkjjjfcj",
	"銻": "skjjfksikscjzfs",
	"題": "fcjjjfjsljsfcjjjsk",
	"體": "fccdefrjjfcjffjjfcjksj",
	"屜": "cjsssfjffjb",
	"條": "sffseljgsk",
	"貼": "fcjjjskfjfcj",
	"鐵": "skjjfksijfjfcjjjfiysk",
	"廳": "kjsjffjjjjjfijsfcffjjdykk",
	"聽": "jffjjjjjfijsfcffjjdykk",
	"烴": "dsskjmmmjfj",
	"銅": "skjjfksifrjfcj",
	"統": "nnkdkkkjnksu",
	"頭": "jfcjksijsfcjjjsk",
	"禿": "sjfslsu",
	"圖": "fcfcjjffcfcjjj",
	"塗": "kkisljjgskjfj",
	"團": "fcjfcjjfikjgkj",
	"頹": "sjfskshjsfcjjjsk",
	"蛻": "fcjfjkslfcjsu",
	"脫": "srjjslfcjsu",
	"鴕": "sfcjjjrdkkkkdesu",
	"馱": "jfjjfrdkkkjsl",
	"駝": "jfjjfrdkkkkdesu",
	"橢": "jfskwfjsjfjfrjj",
	"窪": "kdeskkkijfjjfj",
	"襪": "kefskjfffcffjjskysk",
	"彎": "kjjjfcjnnkdkknnkdkkcjz",
	"灣": "kkikjjjfcjnnkdkknnkdkkcjz",
	"頑": "jjshjsfcjjjsk",
	"萬": "jfffcjjfrfik",
	"網": "nnkdkkfrksjkjb",
	"韋": "cfjfcjjnf",
	"違": "cfjfcjjnfkal",
	"圍": "fccfjfcjjnfj",
	"爲": "skkssccrdkkk",
	"濰": "kkinnkdkksfkjjjfj",
	"維": "nnkdkksfkjjjfj",
	"葦": "jffcfjfcjjnf",
	"偉": "sfcfjfcjjnf",
	"僞": "sfskkssccrdkkk",
	"緯": "nnkdkkcfjfcjjnf",
	"謂": "kjjjfcjfcjfjfrjj",
	"衛": "ssfcfjfcjjnfjjg",
	"溫": "kkifcskjfcffj",
	"聞": "cjjffrjjjffjjj",
	"紋": "nnkdkkkjsl",
	"穩": "sjfskskksjfjcjjdykk",
	"問": "cjjffrjjfcj",
	"甕": "kjnnssfkjjjfjjhok",
	"撾": "jgifccfrfcjkal",
	"蝸": "fcjfjkfccfrfcj",
	"渦": "kkifccfrfcj",
	"窩": "kdeskfccfrfcj",
	"臥": "jfcjfbsl",
	"嗚": "fcjsfcjjrdkkk",
	"鎢": "skjjfksisfcjjrdkkk",
	"烏": "sfcjjrdkkk",
	"汙": "kkijjg",
	"誣": "kjjjfcjjfskskj",
	"無": "sjjffffjdkkk",
	"蕪": "jffsjjffffjdkkk",
	"吳": "fcjxjsl",
	"塢": "jfisfcjjrdkkk",
	"霧": "jdefkkkkekegsselrs",
	"務": "ekegsselrs",
	"誤": "kjjjfcjfcjjjsl",
	"錫": "skjjfksifcjjsrss",
	"犧": "sjfiksjjfjsjfskjzysk",
	"襲": "kjksjfrjjjxjujjjkjshsl",
	"習": "ckickisfcjj",
	"銑": "skjjfksisjfjsu",
	"戲": "fjesjujfcjksijysk",
	"細": "nnkdkkfcjfj",
	"蝦": "fcjfjkcjfjjcjel",
	"轄": "jfcjjjfkdejjjffcj",
	"峽": "fbfjsksksl",
	"俠": "sfjsksksl",
	"狹": "stsjsksksl",
	"廈": "kjsjsfcjjjsel",
	"嚇": "fcjjfjsgskjfjsgsk",
	"鍁": "skjjfksissjfsesl",
	"鮮": "sefcjfjdkkkksjjjf",
	"纖": "nnkdkkskskjfjjjfjjjiysk",
	"鹹": "fjfcskkkkkjjsjfcjysk",
	"賢": "jfcjfbelfcjjjsk",
	"銜": "ssfskjjfksijjg",
	"閑": "cjjffrjjjfsk",
	"顯": "fcjjnnknnkdkkkjsfcjjjsk",
	"險": "wfsljfcjfcjsksk",
	"現": "jjfifcjjjsu",
	"獻": "fjesjujfcjfrksjfjslk",
	"縣": "fcjjjjgsksnnkgsk",
	"餡": "skkcjjhksesfjcjj",
	"羨": "ksjjfjkkisesl",
	"憲": "kdejjfjfcffjdykk",
	"線": "nnkdkksfcjjgesl",
	"廂": "kjsjfskfcjjj",
	"鑲": "skjjfksikjfcjfcjjjffjshsl",
	"鄉": "nnskcjjhkwf",
	"詳": "kjjjfcjksjjjf",
	"響": "nnskcjjhkwfkjksjfcjj",
	"項": "jfijsfcjjjsk",
	"蕭": "jffcjjfsfjjcbfjf",
	"囂": "fcjfcjjsfcjjjskfcjfcj",
	"銷": "skjjfksifksfrjj",
	"曉": "fcjjjfjjfijfjjsu",
	"嘯": "fcjcjjfsfjjcbfjf",
	"蠍": "fcjfjkfcjjsrskbsesl",
	"協": "jfrsrsrs",
	"挾": "jgijsksksl",
	"攜": "jgifbfsfkjjjfjfrskfcj",
	"脅": "rsrsrsfrjj",
	"諧": "kjjjfcjjhsusfcjj",
	"寫": "kdesfjcjjsrdkkk",
	"瀉": "kkikdesfjcjjsrdkkk",
	"謝": "kjjjfcjsfrjjjsjgk",
	"鋅": "skjjfksikjksjjf",
	"釁": "sfjjfcjfcjcjjdejfcsbjjslrs",
	"興": "sfjjfcjfcjcjjjsk",
	"洶": "kkisrskbf",
	"鏽": "skjjfksicjjfsfjjcbfjf",
	"繡": "nnkdkkcjjfsfjjcbfjf",
	"虛": "fjesjuffbfjj",
	"噓": "fcjfjesjuffbfjj",
	"須": "sssjsfcjjjsk",
	"許": "kjjjfcjsjjf",
	"敘": "skjjgsksjsl",
	"緒": "nnkdkkjfjsfcjj",
	"續": "nnkdkkjfjfcffjfcjjjsk",
	"軒": "jfcjjjfjjf",
	"懸": "fcjjjjgsksnnkgskdykk",
	"選": "cjucjujffjskkal",
	"癬": "kjskisefcjfjdkkkksjjjf",
	"絢": "nnkdkksrfcjj",
	"學": "sfjjskskcjjdeegj",
	"勳": "sjfcksjfjjdkkkrs",
	"詢": "kjjjfcjsrfcjj",
	"尋": "cjjjfifcjjgk",
	"馴": "jfjjfrdkkksff",
	"訓": "kjjjfcjsff",
	"訊": "kjjjfcjojf",
	"遜": "egisnnkgskkal",
	"壓": "jsfcjjfrjjjslkjfj",
	"鴉": "jngssfcjjjrdkkk",
	"鴨": "fcjjfsfcjjjrdkkk",
	"啞": "fcjjfjxxjfj",
	"亞": "jfjxxjfj",
	"訝": "kjjjfcjjngs",
	"閹": "cjjffrjjjslfcjju",
	"煙": "dsskjfcffjjfj",
	"鹽": "jfcjfbsjfjfcskkkkkjfcffj",
	"嚴": "fcjfcjjsejffjjisjsl",
	"顔": "kjksjssssjsfcjjjsk",
	"閻": "cjjffrjjsesfjcjj",
	"豔": "jjjffjjjfbfjfcjksijfjnkfcffj",
	"厭": "jsfcjjfrjjjslk",
	"硯": "jsfcjfcjjjsu",
	"彥": "kjskjssss",
	"諺": "kjjjfcjkjksjssss",
	"驗": "jfjjfrdkkksljfcjfcjsksk",
	"鴦": "fcjslsfcjjjrdkkk",
	"楊": "jfskfcjjjsrss",
	"揚": "jgifcjjjsrss",
	"瘍": "kjskifcjjjsrss",
	"陽": "wffcjjjsrss",
	"癢": "kjskiksjjjslkcjjhsk",
	"養": "ksjjjslkcjjhsk",
	"樣": "jfskksjjfjkresl",
	"瑤": "jjfisekksjjfbf",
	"搖": "jgisekksjjfbf",
	"堯": "jfjjfijfjjsu",
	"遙": "sekksjjfbfkal",
	"窯": "kdeskksjjfjdkkk",
	"謠": "kjjjfcjsekksjjfbf",
	"藥": "jffsfcjjnnknnkjfsl",
	"爺": "sksljffjjiwf",
	"頁": "jsfcjjjsk",
	"業": "ffksjksjjjfsl",
	"葉": "jffjffjbjfsl",
	"壹": "jfjdejfcjksj",
	"醫": "jsjjskbsvekjfcsbjj",
	"銥": "skjjfksikjshsl",
	"頤": "jffcjfbjsfcjjjsk",
	"遺": "fcjfjfcjjjskkal",
	"儀": "sfksjjfjsjgiysk",
	"彜": "nejksjfskslrsjsf",
	"蟻": "fcjfjkksjjfjsjgiysk",
	"藝": "jffjfjskjfisokjjnk",
	"億": "sfkjksjfcjjdykk",
	"憶": "dkfkjksjfcjjdykk",
	"義": "ksjjfjsjgiysk",
	"詣": "kjjjfcjsufcjj",
	"議": "kjjjfcjksjjfjsjgiysk",
	"誼": "kjjjfcjkdefcjjj",
	"譯": "kjjjfcjfcffjjfjksjjf",
	"異": "fcjfjjffjsk",
	"繹": "nnkdkkfcffjjfjksjjf",
	"蔭": "jffwfslkejjnk",
	"陰": "wfslkejjnk",
	"銀": "skjjfksicjjhsl",
	"飲": "skkcjjhksesl",
	"隱": "wfskksjfjcjjdykk",
	"櫻": "jfskfcjjjskfcjjjskmsj",
	"嬰": "fcjjjskfcjjjskmsj",
	"鷹": "kjssfsfkjjjfjsfcjjjrdkkk",
	"應": "kjssfsfkjjjfjdykk",
	"纓": "nnkdkkfcjjjskfcjjjskmsj",
	"瑩": "dsskdsskdejjfjk",
	"螢": "dsskdsskdefcjfjk",
	"營": "dsskdsskdefcjfcj",
	"熒": "dsskdsskdedssl",
	"蠅": "fcjfjkfcjfcjjjujbj",
	"贏": "kjbfcjsrjjfcjjjsksok",
	"穎": "susjfskjsfcjjjsk",
	"喲": "fcjnnkdkksrk",
	"擁": "jgikjnnssfkjjjfj",
	"傭": "sfkjscjjfrjjf",
	"癰": "kjskimmmfcjcfjusfkjjjfj",
	"踴": "fcjfjfiekfcjjfrs",
	"詠": "kjjjfcjkresl",
	"湧": "kkiekfcjjfrs",
	"優": "sfjsfcjjdedykksel",
	"憂": "jsfcjjdedykksel",
	"郵": "sjfjffjiwf",
	"鈾": "skjjfksifcjfj",
	"猶": "stsksjfcsbjj",
	"遊": "kjrssjegjkal",
	"誘": "kjjjfcjsjfslws",
	"輿": "sfjjjfcjjjfcjjjsk",
	"魚": "sefcjfjdkkk",
	"漁": "kkisefcjfjdkkk",
	"娛": "msjfcjxjsl",
	"與": "sfjjjxfcjjjsk",
	"嶼": "fbfsfjjjxfcjjjsk",
	"語": "kjjjfcjjfcjfcj",
	"籲": "sjksjkskjfcjfcjfcjfrjffjsfcjjjsk",
	"禦": "ssfsjjfjfirfjjgsk",
	"獄": "stskjjjfcjjslk",
	"譽": "sfjjjxfcjjjslkjjjfcj",
	"預": "ekegjsfcjjjsk",
	"馭": "jfjjfrdkkkel",
	"鴛": "sekrusfcjjjrdkkk",
	"淵": "kkisjfjcbfjf",
	"轅": "jfcjjjfjfjfcjshsl",
	"園": "fcjfjfcjsfskj",
	"員": "fcjfcjjjsk",
	"圓": "fcfcjfcjjjskj",
	"緣": "nnkdkknejstsssl",
	"遠": "jfjfcjsfskkal",
	"願": "jssfcjjgskjsfcjjjsk",
	"約": "nnkdkksrk",
	"躍": "fcjfjfickickisfkjjjfj",
	"鑰": "skjjfksisljfcjfcjfcjfrjff",
	"嶽": "fbfstskjjjfcjjslk",
	"粵": "sfcsksjfskjjz",
	"悅": "dkfslfcjsu",
	"閱": "cjjffrjjskfcjsu",
	"雲": "jdefkkkkjjnk",
	"鄖": "fcjfcjjjskwf",
	"勻": "srjj",
	"隕": "wffcjfcjjjsk",
	"運": "dejfcjjjfkal",
	"蘊": "jffnnkdkkfcskjfcffj",
	"醞": "jfcsbjjfcskjfcffj",
	"暈": "fcjjdejfcjjjf",
	"韻": "kjksjfcjjfcjfcjjjsk",
	"雜": "kjskskjgsksfkjjjfj",
	"災": "mmmdssl",
	"載": "jfjjfcjjjfysk",
	"攢": "jgisjfjshsjfjsufcjjjsk",
	"暫": "jfcjjjfssjffcjj",
	"贊": "sjfjshsjfjsufcjjjsk",
	"贓": "fcjjjskjsbjsjfcjfbysk",
	"髒": "fccdefrjjjffjseksujsf",
	"鑿": "ffksjksjjfsfjcjjsveksljjfksj",
	"棗": "jfcfskjfcfsl",
	"竈": "kdeskjfjfcjfcjjjujbj",
	"責": "jjfjfcjjjsk",
	"擇": "jgifcffjjfjksjjf",
	"則": "fcjjjskfg",
	"澤": "kkifcffjjfjksjjf",
	"賊": "fcjjjskjjsysk",
	"贈": "fcjjjskksfcfksjfcjj",
	"紮": "jfskunnkgsk",
	"劄": "sjksjkskjfcjfg",
	"軋": "jfcjjjfu",
	"鍘": "skjjfksifcjjjskfg",
	"閘": "cjjffrjjfcjjf",
	"柵": "jfskfrjff",
	"詐": "kjjjfcjsjfjj",
	"齋": "kjksfrsshlsfjjfsk",
	"債": "sfjjfjfcjjjsk",
	"氈": "kjfcfcjjfcjjisjju",
	"盞": "jyskjyskfcffj",
	"斬": "jfcjjjfssjf",
	"輾": "jfcjjjfcjsjffjhsl",
	"嶄": "fbfjfcjjjfssjf",
	"棧": "jfskjyskjysk",
	"戰": "fcjfcjfcjjjfjysk",
	"綻": "nnkdkkkdejfjsl",
	"張": "cjzjfjjjhsl",
	"漲": "kkicjzjfjjjhsl",
	"帳": "frfjfjjjhsl",
	"賬": "fcjjjskjfjjjhsl",
	"脹": "srjjjfjjjhsl",
	"趙": "jfjfjslfksfrjj",
	"蟄": "jfjksjjfsokfcjfjk",
	"轍": "jfcjjjfkjnkfrjjsjsl",
	"鍺": "skjjfksijfjsfcjj",
	"這": "kjjjfcjkal",
	"貞": "fjfcjjjsk",
	"針": "skjjfksijf",
	"偵": "sffjfcjjjsk",
	"診": "kjjjfcjslsss",
	"鎮": "skjjfksijffcjjjjsk",
	"陣": "wfjfcjjjf",
	"掙": "jgiskkscjjg",
	"睜": "fcjjjskkscjjg",
	"猙": "stsskkscjjg",
	"爭": "skkscjjg",
	"幀": "frffjfcjjjsk",
	"鄭": "ksjfcsbjjjskwf",
	"證": "kjjjfcjekssljfcjksj",
	"織": "nnkdkkkjksjfcjjysk",
	"職": "jffjjikjksjfcjjysk",
	"執": "jfjksjjfsok",
	"紙": "nnkdkkshjy",
	"摯": "jfjksjjfsoksjjg",
	"擲": "jgiksjfcsbjjjskwf",
	"幟": "frfkjksjfcjjysk",
	"質": "ssjfssjffcjjjsk",
	"滯": "kkijffjsudefrf",
	"鍾": "skjjfksisjfcjjjfj",
	"終": "nnkdkkselkk",
	"種": "sjfsksjfcjjjfj",
	"腫": "srjjsjfcjjjfj",
	"衆": "sfcffjsfsssl",
	"謅": "kjjjfcjsrbfssrbfs",
	"軸": "jfcjjjffcjfj",
	"皺": "srbfssrbfsesfel",
	"晝": "cjjjfjfcjjj",
	"驟": "jfjjfrdkkkjffjjieksfsssl",
	"豬": "jstssskjfjsfcjj",
	"諸": "kjjjfcjjfjsfcjj",
	"誅": "kjjjfcjsjjfsl",
	"燭": "dsskfcffjsrfcjfjk",
	"矚": "fcjjjcjsfkiskfcffjsrfcjfjk",
	"囑": "fcjcjsfkiskfcffjsrfcjfjk",
	"貯": "fcjjjskkdejg",
	"鑄": "skjjfksijfjejfjjfcjjgk",
	"築": "sjksjkjfisokjfsl",
	"駐": "jfjjfrdkkkkjjfj",
	"專": "jfcjjfjkjgk",
	"磚": "jsfcjjfcjjfjkjgk",
	"轉": "jfcjjjfjfcjjfikjgk",
	"賺": "fcjjjskksjcjjffsl",
	"樁": "jfskjjjslsfjcjj",
	"莊": "jffbfjsjfj",
	"裝": "bfjsjfjkjshsl",
	"妝": "bfjsmsj",
	"壯": "bfjsjfj",
	"狀": "bfjsjslk",
	"錐": "skjjfksisfkjjjfj",
	"贅": "jjfjrssjslfcjjjsk",
	"墜": "wfksjstsssljfj",
	"綴": "nnkdkkekekekel",
	"諄": "kjjjfcjkjfcjegj",
	"著": "jffjfjsfcjj",
	"濁": "kkifcffjsrfcjfjk",
	"茲": "jffnnknnk",
	"資": "kiseslfcjjjsk",
	"漬": "kkijjfjfcjjjsk",
	"蹤": "fcjfjfissfskskfjsl",
	"綜": "nnkdkkkdejjgsk",
	"總": "nnkdkksfcsekjdykk",
	"縱": "nnkdkkssfskskfjsl",
	"鄒": "srbfssrbfswf",
	"詛": "kjjjfcjfcjjj",
	"組": "nnkdkkfcjjj",
	"鑽": "skjjfksisjfjshsjfjsufcjjjsk"
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1580873891918, function(require, module, exports) {


var tradDict = require('./trad-simple.json');

var sparkDict = require('./spark-simple.json');

var type = {
  trad: 'trad',
  simple: 'simple',
  spark: 'spark'
};

function convert(str, to, from) {
  if (typeof to === 'undefined' || !type[to]) {
    throw new Error('convert 参数类型错误： to=' + to);
  }

  if (typeof from === 'undefined' || !type[from]) {
    throw new Error('convert 参数类型错误： from=' + from);
  }

  var toDict = '',
      fromDict = '';

  if (to === type.simple) {
    if (from === type.trad) {
      // 繁体 => 简体
      toDict = tradDict.simple;
      fromDict = tradDict.trad;
    } else {
      // 火星 => 简体
      toDict = sparkDict.simple;
      fromDict = sparkDict.spark;
    }
  } else if (to === type.trad) {
    if (from === type.simple) {
      // 简体 => 繁体
      toDict = tradDict.trad;
      fromDict = tradDict.simple;
    } else {
      // 火星 => 繁体
      return convert(convert(str, type.simple, type.spark), type.trad, type.simple);
    }
  } else {
    if (from === type.trad) {
      // 繁体 => 火星
      return convert(convert(str, type.simple, type.trad), type.spark, type.simple);
    } else {
      // 简体 => 火星
      toDict = sparkDict.spark;
      fromDict = sparkDict.simple;
    }
  }

  var res = '';

  for (var i = 0; i < str.length; i++) {
    var index = fromDict.indexOf(str[i]);
    res += index !== -1 ? toDict[index] : str[i];
  }

  return res;
}

module.exports = {
  type: type,
  simpleToTrad: function simpleToTrad(str) {
    return convert(str, type.trad, type.simple);
  },
  simpleToSpark: function simpleToSpark(str) {
    return convert(str, type.spark, type.simple);
  },
  tradToSimple: function tradToSimple(str) {
    return convert(str, type.simple, type.trad);
  },
  tradToSpark: function tradToSpark(str) {
    return convert(str, type.spark, type.trad);
  },
  sparkToSimple: function sparkToSimple(str) {
    return convert(str, type.simple, type.spark);
  },
  sparkToTrad: function sparkToTrad(str) {
    return convert(str, type.trad, type.spark);
  }
};
}, function(modId) { var map = {"./trad-simple.json":1580873891919,"./spark-simple.json":1580873891920}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1580873891919, function(require, module, exports) {
module.exports = {
    "simple": "制皑蔼碍爱肮翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙币闭辟边编贬变辩辫标鳖别瘪濒滨宾摈饼并拨钵铂驳卜补财采参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮床闯创锤唇纯绰辞词赐聪葱囱从丛凑蹿窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔颠点垫电淀钓调迭谍叠钉顶锭订丢东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺堕鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞诽废费纷坟奋愤粪丰枫峰锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗杠皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾雇剐挂关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉号阂鹤贺横恒轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥迹讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧将浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎鲸惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪厘篱离里鲤礼栗丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉梁两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥秘觅幂绵缅庙灭悯闽鸣铭谬谋亩呐钠纳难挠脑恼闹馁内拟你腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞抛赔喷鹏骗飘频贫苹凭评泼颇扑铺仆朴谱栖凄脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲寝轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊确群让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛三叁伞丧骚扫涩杀刹纱筛晒删闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸虱时蚀实识驶势适释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲松耸怂颂讼诵擞苏诉肃虽随绥岁孙损笋缩琐锁獭挞抬台态摊贪瘫滩坛谭谈叹汤烫涛绦讨腾誊锑题体屉条贴铁厅听烃铜统头秃图涂团颓蜕托脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝卧呜钨乌污诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦吓锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧嚣销晓啸蝎协挟携胁谐写泻谢锌衅兴凶汹锈绣虚嘘须许叙绪续轩悬选癣绚学勋熏询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严岩颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶一医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮隐樱婴鹰应缨莹萤营荧蝇赢颖哟拥佣痈踊咏涌优忧邮铀犹游诱于舆余鱼渔娱与屿语郁吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣皂灶责择则泽贼赠扎札轧铡闸栅诈斋债毡盏斩辗崭栈占战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁征狰争帧郑证织职执纸挚掷帜质滞钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆准着浊兹咨资渍踪综总纵邹诅组钻闩刍劢叽戋讦讧讪邝钅亘伛伥伧伫凫厍圹忏扪犷犸玑纡纣纥纨纩芗讴讵讷邬钆钇闫饧佥刭吣呒呓呖呗呙囵坂坜奁奂妩妪妫岖岘岙岚帏庑忾怃怄怅怆抟杩欤沣沩炀疖矶纭纰纾芈苁苈苋苌苎虬诂诃诋诎诏诒轫邺钊钋钌闱闳闵闶陉饨饩饪饫饬鸠侪侬兖刿剀匦卺咛咝垅垆姗岽峄弪怿戗昙枞枥枧枨枭殁泷泸泺泾炖炜炝牦玮瓯疠砀籴绀绁绂绉绋绌绐肴苘茏茑茔茕虮诓诔诖诘诙诜诟诠诤诨诩轭迩迳郏郐郓钍钏钐钔钕钗饴驵驷驸驺驽驿骀鸢黾祎俣俦俨俪咤哒哓哔哕哙哜哝垩垭垲垴姹娅娆娈峤峥怼恸恹恺恻恽挢昵柽栀栉栊栌栎殇泶浃浈浍浏浒浔狯狲珑疬眍砗砜祢笃籼绔绗绛胧胨胪胫舣荛荜荞荟荠荥荦荨荩荪荬荭荮虿觇诮诰诳诶贲贳贶贻轱轲轳轵轶轷轸轹轺郦钚钛钜钣钤钪钫钬钭钯闼闾陧顸飑飒饷骁骅骈鸨鸩袅唛唠唢埘埙埚娲娴崂崃帱徕悭晔晖栾桠桡桢桤桦桧氩涞涠烨猃玺珲疱疴砺砻祯笕绠绡绨脍莅莳莴莶莸莺莼蚝蚬衮觊诹诼诿谀谂谄谇贽赀赅赆趸轼轾辁辂逦钰钲钴钶钷钸钹钺钼钽钿铄铈铉铊铋铌铍铎阃阄阆隽顼颀颃饽馀骊鸪鸫鸬鸱鸲鸶龀龛偬偻偾匮厣啧啬啭埯婵帻帼悫惬掴掼棂殒殓渌渎渑渖焖焘猕猡琏痖皲眦硖硗稆笾粜粝绫绮绯绱绲绶绺绻绾缁缍羟聍脶舻萦蛎蛏裆觋谌谏谑谒谔谕谖谘谙谛谝赇赈赉跄辄铐铑铒铕铖铗铘铙铛铞铟铠铢铤铥铧铨铩铪铫铮铯铳铴铵铷阈阊阋阌阍阏馄骐骒骓骖鸷鸸鸹鸺鸾麸亵傥傧傩喽喾媪嵘嵝巯弑愠愦揿椁椟椠椤殚毵溆牍猬痨痫睐睑禅筚筝絷缂缃缇缈缋缌缏缑缒缗脔腌蒇蒉蒌蛱蛲蛳蛴裢裣裥觌觞谟谠谡谥谧赍赓赕跞辇辋辍辎铹铼铽铿锂锃锆锇锉锊锍锎锏锒锓锔锕阒阕雳靓颉颌颍颏飓飨馇馊骘骛鱿鲂鹁鹂鹄鹆鹇鹈鼋缙嗫嗳嫒嫔尴摅榄榇榈榉毂氲滗滟滠滢瘅碛碜禀稣窦缛缜缟缡缢缣缤耢腭腼腽蓠蓣蓥蓦觎谪谫跷跸跹跻辏辔锖锘锛锝锞锟锢锩锪锫锬锱阖阗阙韪韫颔飕馍馐骜骝骞骟鲅鲆鲇鲈鲋鲎鲐鹉鹋鹌鹎鹑龃龅龆厮嘤嫱戬撄暧槟槠殡潆潇潋潴瑷瘗瘘窭箦箧箨箪箫粽糁缥缦缧缪缫罂罴膑蔹蔺蝈褛觏谮谯谲赙酽酾銮锲锴锵锶锷锸锺锼锾锿镂镄镅阚霁韬馑骠骢鲑鲒鲔鲕鲚鲛鲞鲟鹕鹗鹘鹚鹛鹜麽龇龈噜屦幞撷撸撺樯橥璎篑糇糍缬缭缯耧聩蕲蝼蝾褴觐觑觯谳谵赜踬踯辘镆镉镌镎镏镒镓镔靥鞑鞒颚颛餍馓馔骣魇鲠鲡鲢鲣鲥鲦鲧鲨鲩鲫鹞鹣齑龉龊廪懔斓橹橼氇濑瘾瘿穑缰缱缲缳薮螨赝辚錾镖镗镘镙镛镝镞镟颞颟颡飙飚魉鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲺鲻鹦鹧鹨鹾黉嬷懑檩簖羁膻藓蹑蹒镡镢镤镥镦镧镨镩镪镫鲼鲽鳄鳅鳆鳇鳊鳋鹩鹪鹫鹬龌冁癞镬镯镱雠鞯颢髅鳌鳍鳎鳏鳐鹭鹱巅籁缵谶蹰镲霭鞲骥髋髌鳓鳔鳕鳗鳘鳙鼗瓒蘖镳颥骧鬓鳜鳝鳟黩黪鼍灏癫躏颦鳢鹳趱躜鼹齄馕戆",
    "trad": "製皚藹礙愛骯翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃幣閉闢邊編貶變辯辮標鱉別癟瀕濱賓擯餅並撥鉢鉑駁蔔補財採參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟產闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡牀闖創錘脣純綽辭詞賜聰蔥囪從叢湊躥竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締顛點墊電澱釣調叠諜疊釘頂錠訂丟東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪墮鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛誹廢費紛墳奮憤糞豐楓峯鋒風瘋馮縫諷鳳膚輻撫輔賦復負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗槓臯鎬擱鴿閣鉻個給龔宮鞏貢鉤溝構購夠蠱顧僱剮掛關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢號閡鶴賀橫恆轟鴻紅後壺護滬戶譁華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴匯諱誨繪葷渾夥獲貨禍擊機積飢跡譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢鹼礆揀撿簡儉減薦檻鑑踐賤見鍵艦劍餞漸濺澗將漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖鯨驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚釐籬離裏鯉禮慄麗厲勵礫歷瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼樑兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄滷虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麼黴沒鎂門悶們錳夢謎彌祕覓冪綿緬廟滅憫閩鳴銘謬謀畝吶鈉納難撓腦惱鬧餒內擬妳膩攆撚釀鳥聶齧鑷鎳檸獰寧擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐拋賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪僕樸譜棲悽臍齊騎豈啓氣棄訖牽扡釺鉛遷籤謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親寢輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲確羣讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽叄三傘喪騷掃澀殺剎紗篩曬刪閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅溼詩屍蝨時蝕實識駛勢適釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼鬆聳慫頌訟誦擻蘇訴肅雖隨綏歲孫損筍縮瑣鎖獺撻擡臺態攤貪癱灘壇譚談嘆湯燙濤絛討騰謄銻題體屜條貼鐵廳聽烴銅統頭禿圖塗團頹蛻託脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩臥嗚鎢烏汙誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈嚇杴鮮纖鹹賢銜閒顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭囂銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興兇洶鏽繡虛噓須許敘緒續軒懸選癬絢學勳薰詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴巖顏閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉壹醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲隱櫻嬰鷹應纓瑩螢營熒蠅贏穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘於輿餘魚漁娛與嶼語鬱籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗皁竈責擇則澤賊贈紮劄軋鍘閘柵詐齋債氈盞斬輾嶄棧佔戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜徵猙爭幀鄭證織職執紙摯擲幟質滯鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄準著濁茲諮資漬蹤綜總縱鄒詛組鑽閂芻勱嘰戔訐訌訕鄺釒亙傴倀傖佇鳧厙壙懺捫獷獁璣紆紂紇紈纊薌謳詎訥鄔釓釔閆餳僉剄唚嘸囈嚦唄咼圇阪壢奩奐嫵嫗嬀嶇峴嶴嵐幃廡愾憮慪悵愴摶榪歟灃潙煬癤磯紜紕紓羋蓯藶莧萇苧虯詁訶詆詘詔詒軔鄴釗釙釕闈閎閔閌陘飩餼飪飫飭鳩儕儂兗劌剴匭巹嚀噝壠壚姍崬嶧弳懌戧曇樅櫪梘棖梟歿瀧瀘濼涇燉煒熗犛瑋甌癘碭糴紺紲紱縐紼絀紿餚檾蘢蔦塋煢蟣誆誄詿詰詼詵詬詮諍諢詡軛邇逕郟鄶鄆釷釧釤鍆釹釵飴駔駟駙騶駑驛駘鳶黽禕俁儔儼儷吒噠嘵嗶噦噲嚌噥堊埡塏堖奼婭嬈孌嶠崢懟慟懨愷惻惲撟暱檉梔櫛櫳櫨櫟殤澩浹湞澮瀏滸潯獪猻瓏癧瞘硨碸禰篤秈絝絎絳朧腖臚脛艤蕘蓽蕎薈薺滎犖蕁藎蓀蕒葒葤蠆覘誚誥誑誒賁貰貺貽軲軻轤軹軼軤軫轢軺酈鈈鈦鉅鈑鈐鈧鈁鈥鈄鈀闥閭隉頇颮颯餉驍驊駢鴇鴆嫋嘜嘮嗩塒壎堝媧嫺嶗崍幬徠慳曄暉欒椏橈楨榿樺檜氬淶潿燁獫璽琿皰痾礪礱禎筧綆綃綈膾蒞蒔萵薟蕕鶯蓴蠔蜆袞覬諏諑諉諛諗諂誶贄貲賅贐躉軾輊輇輅邐鈺鉦鈷鈳鉕鈽鈸鉞鉬鉭鈿鑠鈰鉉鉈鉍鈮鈹鐸閫鬮閬雋頊頎頏餑餘驪鴣鶇鸕鴟鴝鷥齔龕傯僂僨匱厴嘖嗇囀垵嬋幘幗愨愜摑摜櫺殞殮淥瀆澠瀋燜燾獼玀璉瘂皸眥硤磽穭籩糶糲綾綺緋鞝緄綬綹綣綰緇綞羥聹腡艫縈蠣蟶襠覡諶諫謔謁諤諭諼諮諳諦諞賕賑賚蹌輒銬銠鉺銪鋮鋏鋣鐃鐺銱銦鎧銖鋌銩鏵銓鎩鉿銚錚銫銃鐋銨銣閾閶鬩閿閽閼餛騏騍騅驂鷙鴯鴰鵂鸞麩褻儻儐儺嘍嚳媼嶸嶁巰弒慍憒撳槨櫝槧欏殫毿漵牘蝟癆癇睞瞼禪篳箏縶緙緗緹緲繢緦緶緱縋緡臠醃蕆蕢蔞蛺蟯螄蠐褳襝襉覿觴謨讜謖諡謐齎賡賧躒輦輞輟輜鐒錸鋱鏗鋰鋥鋯鋨銼鋝鋶鐦鐗鋃鋟鋦錒闃闋靂靚頡頜潁頦颶饗餷餿騭騖魷魴鵓鸝鵠鵒鷳鵜黿縉囁噯嬡嬪尷攄欖櫬櫚櫸轂氳潷灩灄瀅癉磧磣稟穌竇縟縝縞縭縊縑繽耮齶靦膃蘺蕷鎣驀覦謫譾蹺蹕躚躋輳轡錆鍩錛鍀錁錕錮錈鍃錇錟錙闔闐闕韙韞頷颼饃饈驁騮騫騸鮁鮃鮎鱸鮒鱟鮐鵡鶓鵪鵯鶉齟齙齠廝嚶嬙戩攖曖檳櫧殯瀠瀟瀲瀦璦瘞瘻窶簀篋籜簞簫糉糝縹縵縲繆繅罌羆臏蘞藺蟈褸覯譖譙譎賻釅釃鑾鍥鍇鏘鍶鍔鍤鍾鎪鍰鎄鏤鐨鎇闞霽韜饉驃驄鮭鮚鮪鮞鱭鮫鯗鱘鶘鶚鶻鶿鶥鶩麼齜齦嚕屨襆擷擼攛檣櫫瓔簣餱餈纈繚繒耬聵蘄螻蠑襤覲覷觶讞譫賾躓躑轆鏌鎘鐫鎿鎦鎰鎵鑌靨韃鞽顎顓饜饊饌驏魘鯁鱺鰱鰹鰣鰷鯀鯊鯇鯽鷂鶼齏齬齪廩懍斕櫓櫞氌瀨癮癭穡繮繾繰繯藪蟎贗轔鏨鏢鏜鏝鏍鏞鏑鏃鏇顳顢顙飆飈魎鯖鯪鯫鯡鯤鯧鯝鯢鮎鯛鯴鯔鸚鷓鷚鹺黌嬤懣檁籪羈羶蘚躡蹣鐔钁鏷鑥鐓鑭鐠鑹鏹鐙鱝鰈鱷鰍鰒鰉鯿鰠鷯鷦鷲鷸齷囅癩鑊鐲鐿讎韉顥髏鰲鰭鰨鰥鰩鷺鸌巔籟纘讖躕鑔靄韝驥髖髕鰳鰾鱈鰻鰵鱅鞀瓚櫱鑣顬驤鬢鱖鱔鱒黷黲鼉灝癲躪顰鱧鸛趲躦鼴齇饢戇"
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1580873891920, function(require, module, exports) {
module.exports = {
    "simple": "啊阿哎唉矮艾爱安俺按昂敖袄傲懊澳芭扒叭吧八巴拔跋把霸爸白百拜斑班般板版扮拌伴半办邦帮榜膀绑棒磅傍胞包保饱抱报暴爆杯悲卑北背贝倍奔本笨崩蹦迸逼鼻比鄙笔蔽毕敝必辟避边编扁便辨辩遍标彪膘表别滨宾兵冰柄丙病玻播拨波驳捕哺补不布步部擦材才睬踩彩菜餐参蚕惭惨苍仓沧藏操糙曹草厕策测蹭插叉茶查碴察差柴掺馋缠产昌场尝常长唱超抄朝嘲潮巢吵撤彻澈臣辰晨沉城成呈乘程澄诚逞吃持池迟弛驰齿尺赤翅充崇抽酬畴踌稠愁筹绸丑臭出橱滁除楚础揣川穿传喘串窗吹捶锤垂春醇淳纯戳绰茨磁慈此刺次葱匆从丛醋促摧崔催粹淬翠村存寸搓错搭达答打大呆戴代逮担丹单胆旦但淡蛋挡档刀蹈倒到稻道德得的蹬登瞪邓堤低滴迪笛底地蒂第帝弟典店碉叼雕凋掉吊钓调跌爹碟蝶谍叠丁盯叮钉顶定订东冬董懂动栋冻洞兜抖斗陡豆逗痘都毒犊读堵赌杜度渡端锻段缎堆对吨蹲钝多躲朵惰堕蛾峨俄娥恶厄饿恩而儿耳尔饵二发罚伐乏法帆番翻繁凡范犯饭泛坊芳方防仿访纺放菲非肥匪肺费芬吩分纷粉份愤丰封枫锋风逢冯缝奉凤佛否夫扶幅符伏服浮福俯斧府副付负富附嘎该改概盖溉干甘竿赶感敢冈刚缸肛纲岗杠篙高羔糕搞稿告哥歌割革葛格各根跟耕更庚工攻功恭供躬公宫弓拱共钩勾沟狗构购估沽孤姑鼓古骨谷股故固刮瓜挂褂拐棺关官冠管馆罐惯灌贯光广逛龟轨鬼桂柜跪滚棍锅郭果哈孩海害含涵函喊罕旱焊汗杭豪好耗号浩呵喝荷核禾和何合盒河贺嘿黑很狠恨哼亨衡哄虹洪宏弘红喉侯猴吼候呼乎忽葫胡蝴糊湖虎护互沪花哗华猾滑画化徊淮环患幻荒慌黄皇凰惶煌晃幌谎灰挥辉徽回毁悔晦会绘昏婚混活伙火获或霍基机激鸡吉集及急即挤几季济记既际纪家加甲假稼架嫁歼监间兼奸检简俭剪减贱键健建僵姜浆江疆奖降焦胶交骄狡缴绞教较叫接皆节睛晶京精井警景境敬镜竟净炯窘揪久九酒救就疚拘居菊局矩聚拒据巨具距锯俱句炬剧捐娟倦卷绢撅抉掘倔爵捷戒界借介巾筋斤金今津襟锦谨进禁近浸尽决诀绝均菌钧君峻俊竣骏卡开楷凯刊砍康慷糠扛抗亢炕考拷烤苛棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空孔控口扣寇枯窟苦库夸块快款筐狂矿眶旷亏奎馈愧坤昆捆困括扩廓垃拉蜡啦来赖婪栏篮揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老姥酪烙涝勒乐雷镭蕾磊累擂肋泪冷梨离丽厉历利例立力俩联莲连敛链练粮良两辆量晾亮谅撩聊僚燎了廖列裂烈劣琳林磷鳞淋吝拎玲菱零铃羚凌陵岭另令溜榴留刘瘤流柳六龙咙笼隆垄拢陇楼娄搂篓漏芦鲁露路鹿录驴吕铝侣旅律率滤绿峦挛掠略抡轮伦沦论萝罗逻锣箩洛骆麻玛码蚂马嘛吗买脉瞒馒满蔓曼慢漫芒茫盲忙莽茅毛矛卯冒帽貌么玫梅霉煤没眉每美妹门萌蒙盟猛孟眯迷谜米蜜密棉绵免面苗描瞄藐秒渺庙妙蔑灭民敏明鸣铭名命谬摸蘑模膜磨摩魔抹末莫墨沫漠陌谋牟某母墓幕木目拿呐钠那娜纳乃奶耐奈南男囊脑恼闹呢馁内嫩倪泥尼拟你匿逆拈年念鸟尿捏聂孽镊宁牛扭钮纽脓浓农弄奴努怒女暖虐懦糯诺哦欧鸥殴藕偶趴爬帕怕拍排牌徘派攀潘盼畔判叛庞旁胖咆刨炮袍跑泡呸培赔陪配佩喷盆砰彭蓬棚朋捧碰霹批披劈脾皮匹屁篇偏片飘漂票撇瞥拼品聘坪苹萍平瓶屏坡泼颇婆破迫扑铺仆葡菩埔朴谱瀑期欺戚妻七其棋奇歧齐骑乞企启器泣掐牵千签谦乾前潜欠歉枪呛墙蔷抢敲悄桥瞧侨撬翘俏切茄且怯窃侵亲秦琴勤擒禽寝青清晴情请秋丘球求酋区曲驱取娶去圈泉全犬劝缺裙然燃冉染嚷饶绕热仁人忍任刃日蓉融熔溶容揉柔肉茹儒如辱汝入阮蕊闰若弱撒萨塞赛三散桑嗓骚嫂色森莎砂杀刹沙啥煞珊山删衫闪善汕扇商上尚梢捎稍勺少邵绍蛇舌舍摄涉社设申伸身深绅神沈审甚渗声生牲升省盛剩胜师失狮施湿尸十石拾时食屎驶式示士世柿事逝是市室试收手首守授受瘦兽殊抒输叔舒淑熟暑鼠术述束竖数刷衰栓霜双爽水睡税瞬舜说斯撕嘶思私司丝死寺四似松送宋搜素速塑宿肃蒜算隋绥碎岁遂梭唆琐索锁所塌他它她塔踏抬台泰太态汰坛潭坦碳炭汤塘堂棠唐糖掏滔萄桃逃淘陶藤腾疼梯提题蹄啼体替涕剃屉天添填田甜舔腆挑跳贴铁帖厅听廷停亭庭挺通桐同铜彤童桶捅筒痛偷突徒途涂屠土吐兔推腿褪退吞拖托鸵陀驮驼妥拓洼娃瓦外弯湾玩丸完碗挽晚婉万汪王亡枉网往旺望忘威巍微危唯为维萎委伪尾未蔚味畏胃喂魏位谓尉慰卫蚊文纹吻稳嗡翁蜗涡窝我握巫污诬屋无吾吴武五捂午舞伍雾物勿悟昔熙析西吸锡牺稀希夕惜溪喜洗系戏瞎霞暇峡侠狭下夏吓掀先仙纤闲弦嫌险现馅陷相香箱乡响享项橡像向象萧削哮晓小孝鞋协邪谐写械卸懈泄谢薪欣辛新心星腥猩惺刑型邢行醒幸杏性姓兄胸熊休修羞嗅锈秀墟需虚嘘须徐许叙旭序婿轩喧宣旋玄眩学穴雪血勋循旬询寻驯巡殉汛讯迅押呀丫芽牙雅讶焉淹研岩延言颜炎掩演艳燕焰宴验央杨扬羊洋仰漾邀腰妖瑶摇遥窑谣姚咬药要椰耶野也业叶夜一医依伊衣移疑姨椅倚已乙以艺易亦意毅益茵因音阴姻吟银淫寅饮尹引隐印英樱婴迎盈颖硬映拥佣庸雍咏泳涌永勇用幽优悠忧由犹油有友右佑又幼迂淤于余俞逾鱼愉渝娱与宇语玉郁遇愈欲育誉渊冤元袁原援园员圆源远苑愿怨院约越跃岳月悦耘云匀陨允蕴孕砸杂栽哉载再在咱攒赞赃脏葬遭糟枣早澡躁噪造皂燥责择则增憎曾赠扎渣眨榨乍炸诈摘窄粘沾展占站湛章掌杖丈帐仗招照兆召遮折哲者这浙珍真贞侦枕诊振阵蒸挣睁征争怔正政证芝枝支吱蜘知肢汁之织职直植执值址指止只纸志至致制智稚治中忠钟终肿重舟周州洲珠蛛朱猪诸逐竹煮嘱主柱助筑住注祝拽专转庄撞壮状追准捉拙卓桌咨资姿滋紫子自字棕踪宗综总纵走奏揍租足族祖诅阻组嘴醉最罪尊遵昨左做作坐座",
    "spark": "娿婀餀呃婑銰嬡鮟唵洝昻獓仸謸襖奧妑朳朳妑仈妑菝柭妑覇妑皛咟湃癍癍瘢闆蝂汾絆柈柈刅綁幇徬嫎垹蜯嫎徬菢笣湺怉砲蕔懪嚗柸蕜萆苝揹赑俻渀夲苯镚嘣逬腷嬶仳啚毣幣滭獙怭澼鐴笾揙碥楩辧辮猵摽滮鏢錶莂璸濱娦栤窉眪疒箥譒妭菠訤峬誧卟芣鈽荹蔀攃財財棌棌埰婇爘傪蛬慙參芲仺獊蔵懆鐰蓸愺厠憡恻竲揷紁嗏楂楂镲槎枈傪镵瀍浐誯畼甞瑺萇晿趫莏謿謿謿漅訬徹沏瞮烥宸曟冗峸荿珵塖珵僜諴浧阣歭肔呎肔肔歯呎哧趐茺漴菗絒帱帱婤僽薵皗忸溴炪廚蒢篨椘绌遄巛瑏伝遄賗囱欥腄腄箠舂錞錞蒓戥焯垐濨濨泚剌佽茐茐苁苁齰娖凗慛慛濢濢濢籿洊籿髊措溚垯荅咑汏槑瀻笩曃泹冄啴狚狚泹惔疍澢澢叨稲箌菿稲檤徳嘚哋簦憕簦郰諟彽嘀廸廸疧哋渧苐渧弚敟扂淍汈鵰蜩鋽铞銱蜩瓞嗲渫渫媟疉玎饤汀町嵿萣忊崬笗蓳慬憅崬岽狪兠鬦乧跿荳浢哣嘟毐渎渎陼帾荰喥喥鍴葮葮葮碓怼沌壿沌哆躱朶媠憜睋睋皒皒悪苊皒慁洏ル洱尒聶②潑藅浌疺琺汎畨飜瀿汎笵氾粄疺汸淓汸汸汸汸汸倣婔悱萉厞腓曊棼玢汾妢帉妢濆仹崶猦峯颩漨溤漨唪鳯仏娝玞荴諨苻茯棴捊湢椨釡椨諨苻萯冨胕嗄姟妀漑葢漑迀苷芉迀憾噉罓碙矼釭罁罓釭禞滈餻溔鎬鎬哠滒戨剨愅噶咯茖艮茛畊浭菮笁糼糼塨栱匑厷営弖珙珙溝芶芶豞媾媾诂钴箛菇鼔咕嗗唂骰诂凅剮呱啩啩枴菅関菅蒄涫菅潅遦潅遦洸広迋亀匦媿蓕匱蛫蔉輥煱漷淉铪陔嗨嗐浛凾凾諴癷猂猂汙忼濠恏秏呺滘哬曷嗬劾秝啝哬匼盉菏哿潶嫼佷哏悢涥悙蘅晎渱葓宖宖葒糇糇糇犼糇苸苸唿煳箶箶煳煳唬戶沍戶埖蕐澕磆磆畵囮佪准寰漶抝巟巟曂瑝瑝瑝瑝愰縨巟洃媈媈幑冋毇珻珻浍浍涽殙婫萿钬焱镬戓靃樭僟噭鶏咭潗彶喼旣哜凢悸哜汜旣漈汜傢咖曱徦糘泇糘姧盬簡凲奷撿彅倹彅諴濺楗揵踺壃葁槳茳彊奨夅潐烄茭嬌烄儌烄嘋珓嘂帹湝兯聙瞐倞棈丼檠憬璄擏傹獍凈泂僒啾玖勼氿慦僦咎佝劇匊挶怇藂岠琚姖倶岠涺倶呴岠涺涓涓惓捲涓瘚決崛崛嚼啑悈鎅徣夰凧荕釿唫妗珒噤婂殣琎噤菦锓浕吷吷蕝汮箘呁焄浚浚浚浚鉲閞揩剀刋歃嫝嵻嵻摃忼囥忼栲洘栲岢錁溘錁萪涜嗑妸渇尅尅愙錁肻肻恳垦妔妔涳芤啌囗釦簆喖崫楛厙洿赽赽窾筺誑纩洭纩扝喹潰隗堒崐涃涃葀拡霩柆菈臘菈唻攋漤孄藍灠灠攋灠灡嚂哴蓈哴蓢蓢蓢烺崂崂窂荖粩絡絡崂嘞泺檑檑檑藞蔂檑叻汨唥悡蓠婯疠呖悡唎竝劦唡聅嗹涟潋嗹煉悢悢倆唡糧涼煷涼嫽窷獠獠孒漻烮煭烮挘啉啉潾潾啉悋柃玪夌蕶玪玪夌夌玪叧泠媹媹畱嚠媹蓅栁陸瀧茏茏湰泷泷茏溇溇嵝溇屚廬噜蕗蕗蔍淥馿焒焒佀膂侓卛慮淥欒孌稤畧囵囵囵囵囵囉囉羅囉儸詻詻嫲犸犸犸骉嫲嬤荬霡慲獌慲嫚嫚嫚嫚笀汒吂杧漭罞毝罞茆萺萺邈庅坆烸苺湈莈葿烸羙妺閄萠懞擝掹掹侎洣洣洣滵滵婂婂凂媔媌媌媌邈仯緲庿仯篾搣姄勄眀嘄佲洺掵繆嗼嚤嗼嗼嚤嚤嚤沬沬嗼嚜沬嗼帞湈哞湈毋募募朩朩嗱妠妠哪哪妠釢艿恧柰遖莮灢悩悩閙迡浽禸嫰淣狔胒抳沵嫟屰秥姩淰茑杘涅嗫糵嗫苧犇沑妞狃哝哝哝挵伮怓伮囡煖疟穤穤喏呃瓯瓯瓯耦耦汃瓟啪啪啪棑簰棑哌襻瀋昐溿叛判厐臱眫垉铇垉垉垉垉怌掊婄婄蓜姵濆湓泙憉莑堋萠唪湴噼纰怶噼裨怶苉庇萹媥爿彯慓嘌潎潎拚闆娉岼泙泙岼甁屛岥秡櫇嘙岥廹圤舗圤匍箁逋圤鐠鑤剘剘嘁悽⑦娸諆渏忮斉騏阣佱晵噐淇拤撁芉簽嗛墘湔濳芡嗛熗濸嫱嫱熗毃佾喬趭喬毳趬佾苆苆苴愜苆埐儭蓁噖懄檎噙寑圊凊啨凊埥偢坵浗浗媨岖浀駆掫婜厾圜葲洤吠勧蒛峮嘫嘫姌媣孃隢隢慹芢亾涊姙刄ㄖ嫆瀜嫆嫆嫆渘渘禸筎濡洳媷肗叺朊惢潤婼弜潵蕯噻噻彡潵鎟鎟騒溲脃潹莏唦摋閷乷倽繺姍屾剼釤閁僐訕傓啇仩尙哨哨哨汋仯卲袑虵舙舎摂渉涻蔎妽訷裑堔訷鉮瀋谉卙椮殸泩狌圱渻墭乗夝溮妷浉湤濕迉拾坧湁溡喰屍馶鉽沶仕迣枾倳迣湜巿厔鉽荍掱渞垨涭辤痩獣姝杼瀭埱忬蔋孰濐癙朮沭娕竪薮唰缞拴灀叒摤渁腄挩橓橓説凘凘凘偲俬呞噝屍峙④姒菘鎹浨溲嫊趚愬蹜歗祘匴陏浽誶嵗嬘逡逡鎖鎍鎻葰禢彵咜咜嗒沓孡珆溙忲忲呔墵憛钽湠湠饧溏漟橖瑭溏匋瑫匋洮洮匋匋駦駦庝珶諟趧渧渧軆櫕珶珶屟兲婖瑱甶甛婖睓狣朓萜鉄萜廰厛侹渟渟侹侹嗵秱哃恫浵僮硧硧茼痌偸湥徙蒤凃廜汢汢兎蓷蹆蹆蹆昋柂仛袉拕駞袉鋖沰哇哇咓迯塆塆琓汍唍涴梚脕啘萭忹迋匄忹蛧暀忹朢莣媙蘶嶶佹惟潙惟崣逶沩屗沬墛菋嵔媦嵔蘶莅媦墛墛衞螡妏鈫沕穏滃暡窩煱窉莪楃莁汚莁偓嘸圄呉娬伍圄吘橆⑤霚粅匢圄厝凞唽覀扱唶犠浠唏汐厝渓禧冼係戱磍葭叚浹浹浹芐嗄圷锨姺佡汘娴妶溓険哯陥陥楿萫葙芗姠啍頙潒潒姠潒簘萷涍哓尒涍嚡拹峫喈冩悈啣澥绁塮蕲俽厗噺杺暒睲睲瑆鉶侀郉垳瑆圉莕悻狌兇洶熋咻俢饈溴琇莠歔濡歔歔湏俆汻溆旮垿胥蓒媗媗嫙玆妶敩泬膤洫勛揗洵咰浔紃廵咰卂卂卂呷吖吖厊厊蕥冴漹殗妍啱娫訁顔烾殗湮滟嬿熖匽験姎昜婸咩樣卬羕撽崾岆愮愮滛窰愮烑吆葯婹倻倻嘢竾鄴旪液①悘畩吚扆簃寲侇掎掎巳乁姒兿昜洂嬑藙谥筃洇堷隂絪荶檭婬夤飮吚吲陻茚渶璎璎迊盁颕哽眏砽砽滽澭怺怺悀怺湧鼡豳沋滺沋甴沋怞洧伖祐祐叒孧扜菸纡悇揄揄渔揄揄娯玙荢娪砡喐喁匬慾唷謍棩寃沅媴厡瑗圎園園羱逺夗蒝葾阮箹樾跞捳仴哾秐囩枃殒狁藴夃咂卆酨酨酨侢茬洎瓒瓒賍賍髒蹧蹧栆皁璪璪璪慥唣璪嫧萚荝熷璔嶒熷紥碴喳搾咋怍怍擿搾秥跕蹍颭跕偡嶂礃粀扙賬扙妱燳狣佋嗻菥悊鍺適淅沴嫃浈浈忱沴桭俥篜諍諍姃踭姃囸炡姃芷汥伎汥倁倁汥汥と枳轵矗淔秇惪歮栺圵呮衹梽臸臸淛潪雉菭狆筗妕蔠妕偅洀淍詶詶咮咮咮蕏渚豩艸煑瞩炷炷莇茿炷炷柷跩抟啭圧獞匨匨搥痽浞炪婥棹恣粢恣稵橴ふ洎牸琮琮崈琮縂枞趉楱楱蒩娖蔟袓蒩蒩蒩觜酔朂嶵澊噂葃咗莋莋唑蓙"
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1580873891915);
})()
//# sourceMappingURL=index.js.map