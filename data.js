// deta.js
const locations = [
    {
        "location_id": 7,
        "title": "台北物流中⼼",
        "city": "台北市",
        "address": "台北市中正區忠孝東路100號"
    },
    {
        "location_id": 13,
        "title": "新⽵物流中⼼",
        "city": "新⽵市",
        "address": "新⽵市東區光復路⼀段101號"
    },
    {
        "location_id": 24,
        "title": "台中物流中⼼",
        "city": "台中市",
        "address": "台中市⻄區⺠⽣路200號"
    },
    {
        "location_id": 3,
        "title": "桃園物流中⼼",
        "city": "桃園市",
        "address": "桃園市中壢區中央⻄路三段150號"
    },
    {
        "location_id": 18,
        "title": "⾼雄物流中⼼",
        "city": "⾼雄市",
        "address": "⾼雄市前⾦區成功⼀路82號"
    },
    {
        "location_id": 9,
        "title": "彰化物流中⼼",
        "city": "彰化市",
        "address": "彰化市中⼭路⼆段250號"
    },
    {
        "location_id": 15,
        "title": "嘉義物流中⼼",
        "city": "嘉義市",
        "address": "嘉義市東區⺠族路380號"
    },
    {
        "location_id": 6,
        "title": "宜蘭物流中⼼",
        "city": "宜蘭市",
        "address": "宜蘭市中⼭路⼆段58號"
    },
    {
        "location_id": 21,
        "title": "屏東物流中⼼",
        "city": "屏東市",
        "address": "屏東市⺠⽣路300號"
    },
    {
        "location_id": 1,
        "title": "花蓮物流中⼼",
        "city": "花蓮市",
        "address": "花蓮市國聯⼀路100號"
    },
    {
        "location_id": 4,
        "title": "台南物流中⼼",
        "city": "台南市",
        "address": "台南市安平區建平路18號"
    },
    {
        "location_id": 11,
        "title": "南投物流中⼼",
        "city": "南投市",
        "address": "南投市⾃由路67號"
    },
    {
        "location_id": 23,
        "title": "雲林物流中⼼",
        "city": "雲林市",
        "address": "雲林市中正路五段120號"
    },
    {
        "location_id": 14,
        "title": "基隆物流中⼼",
        "city": "基隆市",
        "address": "基隆市信⼀路50號"
    },
    {
        "location_id": 8,
        "title": "澎湖物流中⼼",
        "city": "澎湖縣",
        "address": "澎湖縣⾺公市中正路200號"
    },
    {
        "location_id": 19,
        "title": "⾦⾨物流中⼼",
        "city": "⾦⾨縣",
        "address": "⾦⾨縣⾦城鎮⺠⽣路90號"
    }
];

const recipients = [
    {
        "id": 1234,
        "name": "賴⼩賴",
        "address": "台北市中正區仁愛路⼆段99號",
        "phone": "091234567"
    },
    {
        "id": 1235,
        "name": "陳⼤明",
        "address": "新北市板橋區⽂化路⼀段100號",
        "phone": "092345678"
    },
    {
        "id": 1236,
        "name": "林⼩芳",
        "address": "台中市⻄區⺠⽣路200號",
        "phone": "093456789"
    },
    {
        "id": 1237,
        "name": "張美玲",
        "address": "⾼雄市前⾦區成功⼀路82號",
        "phone": "094567890"
    },
    {
        "id": 1238,
        "name": "王⼩明",
        "address": "台南市安平區建平路18號",
        "phone": "095678901"
    },
    {
        "id": 1239,
        "name": "劉⼤華",
        "address": "新⽵市東區光復路⼀段101號",
        "phone": "096789012"
    },
    {
        "id": 1240,
        "name": "⿈⼩琳",
        "address": "彰化市中⼭路⼆段250號",
        "phone": "097890123"
    },
    {
        "id": 1241,
        "name": "吳美美",
        "address": "花蓮市國聯⼀路100號",
        "phone": "098901234"
    },
    {
        "id": 1242,
        "name": "蔡⼩虎",
        "address": "屏東市⺠⽣路300號",
        "phone": "099012345"
    },
    {
        "id": 1243,
        "name": "鄭⼤勇",
        "address": "基隆市信⼀路50號",
        "phone": "091123456"
    },
    {
        "id": 1244,
        "name": "謝⼩珍",
        "address": "嘉義市東區⺠族路380號",
        "phone": "092234567"
    },
    {
        "id": 1245,
        "name": "潘⼤為",
        "address": "宜蘭市中⼭路⼆段58號",
        "phone": "093345678"
    },
    {
        "id": 1246,
        "name": "趙⼩梅",
        "address": "南投市⾃由路67號",
        "phone": "094456789"
    },
    {
        "id": 1247,
        "name": "周⼩⿓",
        "address": "雲林市中正路五段120號",
        "phone": "095567890"
    },
    {
        "id": 1248,
        "name": "李⼤同",
        "address": "澎湖縣⾺公市中正路200號",
        "phone": "096678901"
    },
    {
        "id": 1249,
        "name": "陳⼩凡",
        "address": "⾦⾨縣⾦城鎮⺠⽣路90號",
        "phone": "097789012"
    },
    {
        "id": 1250,
        "name": "楊⼤明",
        "address": "台北市信義區松仁路50號",
        "phone": "098890123"
    },
    {
        "id": 1251,
        "name": "吳⼩雯",
        "address": "新北市中和區景平路100號",
        "phone": "099901234"
    }
];

module.exports = { locations, recipients };