export interface Dish {
    id: string;
    name: string;
    category: string;
    series: string;
}

export const dateSeriesMapping: Record<string, string> = {
    "2026-03-14": "201A",
    "2026-03-21": "201B",
    "2026-04-11": "201C",
    "2026-04-18": "201D",
    "2026-04-25": "201E",
    "2026-05-02": "202A",
    "2026-05-09": "202B",
    "2026-05-16": "202C",
    "2026-06-13": "202D",
    "2026-06-20": "202E",
    "2026-06-27": "203A"
};

export const dishes: Dish[] = [
    // 201 Series
    { id: "201A-1", name: "蒸牛肉丸", category: "", series: "201A" },
    { id: "201A-2", name: "煙燻黃魚", category: "", series: "201A" },
    { id: "201A-3", name: "五柳魷魚", category: "", series: "201A" },
    { id: "201A-4", name: "白果燴芥菜", category: "", series: "201A" },
    { id: "201A-5", name: "糖醋佛手黃瓜", category: "", series: "201A" },
    { id: "201A-6", name: "掛霜腰果", category: "", series: "201A" },
    { id: "201A-7", name: "炸韭菜春捲", category: "", series: "201A" },

    { id: "201B-1", name: "酸菜炒牛肉絲", category: "", series: "201B" },
    { id: "201B-2", name: "松鼠黃魚", category: "", series: "201B" },
    { id: "201B-3", name: "白果炒魷魚", category: "", series: "201B" },
    { id: "201B-4", name: "金銀蛋扒芥菜", category: "", series: "201B" },
    { id: "201B-5", name: "涼拌佛手黃瓜", category: "", series: "201B" },
    { id: "201B-6", name: "掛霜腰果", category: "", series: "201B" },
    { id: "201B-7", name: "炸肉絲春捲", category: "", series: "201B" },

    { id: "201C-1", name: "炒牛肉鬆", category: "", series: "201C" },
    { id: "201C-2", name: "拆燴黃魚羹", category: "", series: "201C" },
    { id: "201C-3", name: "椒鹽魷魚", category: "", series: "201C" },
    { id: "201C-4", name: "金菇扒芥菜", category: "", series: "201C" },
    { id: "201C-5", name: "麻辣佛手黃瓜", category: "", series: "201C" },
    { id: "201C-6", name: "掛霜腰果", category: "", series: "201C" },
    { id: "201C-7", name: "炸牡蠣春捲", category: "", series: "201C" },

    { id: "201D-1", name: "煎牛肉餅", category: "", series: "201D" },
    { id: "201D-2", name: "酥炸黃魚條", category: "", series: "201D" },
    { id: "201D-3", name: "彩椒炒魷魚", category: "", series: "201D" },
    { id: "201D-4", name: "酸辣黃瓜條", category: "", series: "201D" },
    { id: "201D-5", name: "三菇燴芥菜", category: "", series: "201D" },
    { id: "201D-6", name: "掛霜腰果", category: "", series: "201D" },
    { id: "201D-7", name: "炸韮黃春捲", category: "", series: "201D" },

    { id: "201E-1", name: "彩椒滑牛肉片", category: "", series: "201E" },
    { id: "201E-2", name: "蒜子燒黃魚", category: "", series: "201E" },
    { id: "201E-3", name: "西芹炒魷魚", category: "", series: "201E" },
    { id: "201E-4", name: "廣東泡菜", category: "", series: "201E" },
    { id: "201E-5", name: "竹笙燴芥菜", category: "", series: "201E" },
    { id: "201E-6", name: "掛雙腰果", category: "", series: "201E" },
    { id: "201E-7", name: "掛素菜春捲", category: "", series: "201E" },

    // 202 Series
    { id: "202A-1", name: "炸杏片蝦球", category: "", series: "202A" },
    { id: "202A-2", name: "粉蒸小排骨", category: "", series: "202A" },
    { id: "202A-3", name: "蔥油雞", category: "", series: "202A" },
    { id: "202A-4", name: "宮保墨魚捲", category: "", series: "202A" },
    { id: "202A-5", name: "佛手白菜", category: "", series: "202A" },
    { id: "202A-6", name: "鮮肉水餃", category: "", series: "202A" },
    { id: "202A-7", name: "三絲蛋皮捲", category: "", series: "202A" },

    { id: "202B-1", name: "京都排骨", category: "", series: "202B" },
    { id: "202B-2", name: "椒鹽蝦球", category: "", series: "202B" },
    { id: "202B-3", name: "人參枸杞醉雞", category: "", series: "202B" },
    { id: "202B-4", name: "家常墨魚捲", category: "", series: "202B" },
    { id: "202B-5", name: "香菇白菜膽", category: "", series: "202B" },
    { id: "202B-6", name: "花素煎餃", category: "", series: "202B" },
    { id: "202B-7", name: "高麗菜蛋皮捲", category: "", series: "202B" },

    { id: "202C-1", name: "鼓汁小排骨", category: "", series: "202C" },
    { id: "202C-2", name: "蝦丸蔬片湯", category: "", series: "202C" },
    { id: "202C-3", name: "玉樹上湯雞", category: "", series: "202C" },
    { id: "202C-4", name: "金鈎墨魚絲", category: "", series: "202C" },
    { id: "202C-5", name: "什錦白菜捲", category: "", series: "202C" },
    { id: "202C-6", name: "香煎餃子", category: "", series: "202C" },
    { id: "202C-7", name: "豆芽菜蛋皮捲", category: "", series: "202C" },

    { id: "202D-1", name: "蔥串排骨", category: "", series: "202D" },
    { id: "202D-2", name: "時蔬燴蝦丸", category: "", series: "202D" },
    { id: "202D-3", name: "燻雞", category: "", series: "202D" },
    { id: "202D-4", name: "芫爆墨魚捲", category: "", series: "202D" },
    { id: "202D-5", name: "銀杏白菜膽", category: "", series: "202D" },
    { id: "202D-6", name: "蝦仁水餃", category: "", series: "202D" },
    { id: "202D-7", name: "韭黃蛋皮捲", category: "", series: "202D" },

    { id: "202E-1", name: "紅燒排骨", category: "", series: "202E" },
    { id: "202E-2", name: "三絲蝦球", category: "", series: "202E" },
    { id: "202E-3", name: "家鄉屈雞", category: "", series: "202E" },
    { id: "202E-4", name: "蔥油灼墨魚片", category: "", series: "202E" },
    { id: "202E-5", name: "千層白菜", category: "", series: "202E" },
    { id: "202E-6", name: "冬粉蛋皮捲", category: "", series: "202E" },
    { id: "202E-7", name: "高麗菜水餃", category: "", series: "202E" },

    // 203 Series
    { id: "203A-1", name: "滑豬肉片", category: "", series: "203A" },
    { id: "203A-2", name: "五柳鱸魚", category: "", series: "203A" },
    { id: "203A-3", name: "蒸一品雞排", category: "", series: "203A" },
    { id: "203A-4", name: "威化香蕉蝦捲", category: "", series: "203A" },
    { id: "203A-5", name: "洋菇海皇羹", category: "", series: "203A" },
    { id: "203A-6", name: "干貝燴芥菜", category: "", series: "203A" },
    { id: "203A-7", name: "八寶芋泥", category: "", series: "203A" },

    { id: "203B-1", name: "炒豬肉鬆", category: "", series: "203B" },
    { id: "203B-2", name: "鱸魚兩吃", category: "", series: "203B" },
    { id: "203B-3", name: "油淋去骨雞", category: "", series: "203B" },
    { id: "203B-4", name: "百花豆腐", category: "", series: "203B" },
    { id: "203B-5", name: "鮮菇三層樓", category: "", series: "203B" },
    { id: "203B-6", name: "蟹肉燴芥菜", category: "", series: "203B" },
    { id: "203B-7", name: "芋泥西米露", category: "", series: "203B" },

    { id: "203C-1", name: "蒸豬肉丸", category: "", series: "203C" },
    { id: "203C-2", name: "松鼠鱸魚", category: "", series: "203C" },
    { id: "203C-3", name: "香橙燒雞排", category: "", series: "203C" },
    { id: "203C-4", name: "紫菜沙拉蝦捲", category: "", series: "203C" },
    { id: "203C-5", name: "珍菇翡翠芙蓉羹", category: "", series: "203C" },
    { id: "203C-6", name: "香菇燴芥菜", category: "", series: "203C" },
    { id: "203C-7", name: "蛋黃芋棗", category: "", series: "203C" },

    { id: "203D-1", name: "乾炸豬肉丸", category: "", series: "203D" },
    { id: "203D-2", name: "鱸魚羹", category: "", series: "203D" },
    { id: "203D-3", name: "百花釀雞腿", category: "", series: "203D" },
    { id: "203D-4", name: "蘋果蝦鬆", category: "", series: "203D" },
    { id: "203D-5", name: "鮑菇燒白菜", category: "", series: "203D" },
    { id: "203D-6", name: "蜊肉燴芥菜", category: "", series: "203D" },
    { id: "203D-7", name: "紅心芋泥", category: "", series: "203D" },

    { id: "203E-1", name: "煎豬肉餅", category: "", series: "203E" },
    { id: "203E-2", name: "麒麟蒸魚", category: "", series: "203E" },
    { id: "203E-3", name: "八寶封雞腿", category: "", series: "203E" },
    { id: "203E-4", name: "果律蝦球", category: "", series: "203E" },
    { id: "203E-5", name: "碧綠雙味菇", category: "", series: "203E" },
    { id: "203E-6", name: "芥菜鹹蛋湯", category: "", series: "203E" },
    { id: "203E-7", name: "豆沙芋棗", category: "", series: "203E" },
];

