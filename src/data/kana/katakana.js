// Each table has vowel columns and consonant-row cells of [kana, romaji, alts?] tuples
// (or null for a gap). alts, when present, are additional accepted readings.
export const gojuon = {
    key: "gojuon",
    name: "Gojuon (Basic Sounds)",
    examples: [["カ", "ka"], ["シ", "shi"], ["ン", "n"]],
    columns: ["a", "i", "u", "e", "o"],
    rows: [
        { label: "", cells: [["ア", "a"], ["イ", "i"], ["ウ", "u"], ["エ", "e"], ["オ", "o"]] },
        { label: "k", cells: [["カ", "ka"], ["キ", "ki"], ["ク", "ku"], ["ケ", "ke"], ["コ", "ko"]] },
        { label: "s", cells: [["サ", "sa"], ["シ", "shi"], ["ス", "su"], ["セ", "se"], ["ソ", "so"]] },
        { label: "t", cells: [["タ", "ta"], ["チ", "chi"], ["ツ", "tsu"], ["テ", "te"], ["ト", "to"]] },
        { label: "n", cells: [["ナ", "na"], ["ニ", "ni"], ["ヌ", "nu"], ["ネ", "ne"], ["ノ", "no"]] },
        { label: "h", cells: [["ハ", "ha"], ["ヒ", "hi"], ["フ", "fu"], ["ヘ", "he"], ["ホ", "ho"]] },
        { label: "m", cells: [["マ", "ma"], ["ミ", "mi"], ["ム", "mu"], ["メ", "me"], ["モ", "mo"]] },
        { label: "y", cells: [["ヤ", "ya"], null, ["ユ", "yu"], null, ["ヨ", "yo"]] },
        { label: "r", cells: [["ラ", "ra"], ["リ", "ri"], ["ル", "ru"], ["レ", "re"], ["ロ", "ro"]] },
        { label: "w", cells: [["ワ", "wa"], null, null, null, ["ヲ", "o", ["wo"]]] },
        { label: "", cells: [["ン", "n"], null, null, null, null] },
    ]
};

export const dakuten = {
    key: "dakuten",
    name: "Dakuten (Voiced Sounds)",
    examples: [["ザ", "za"], ["ヂ", "ji"], ["プ", "pu"]],
    columns: ["a", "i", "u", "e", "o"],
    rows: [
        { label: "g", cells: [["ガ", "ga"], ["ギ", "gi"], ["グ", "gu"], ["ゲ", "ge"], ["ゴ", "go"]] },
        { label: "z", cells: [["ザ", "za"], ["ジ", "ji"], ["ズ", "zu"], ["ゼ", "ze"], ["ゾ", "zo"]] },
        { label: "d", cells: [["ダ", "da"], ["ヂ", "ji", ["di"]], ["ヅ", "zu", ["du"]], ["デ", "de"], ["ド", "do"]] },
        { label: "b", cells: [["バ", "ba"], ["ビ", "bi"], ["ブ", "bu"], ["ベ", "be"], ["ボ", "bo"]] },
        { label: "p", cells: [["パ", "pa"], ["ピ", "pi"], ["プ", "pu"], ["ペ", "pe"], ["ポ", "po"]] },
    ]
};

export const youon = {
    key: "youon",
    name: "Youon (Combo Sounds)",
    examples: [["キャ", "kya"], ["シェ", "she"], ["ジョ", "jo"]],
    columns: ["a", "i", "u", "e", "o"],
    rows: [
        { label: "ky", cells: [["キャ", "kya"], null, ["キュ", "kyu"], null, ["キョ", "kyo"]] },
        { label: "sh", cells: [["シャ", "sha"], null, ["シュ", "shu"], ["シェ", "she"], ["ショ", "sho"]] },
        { label: "ch", cells: [["チャ", "cha"], null, ["チュ", "chu"], ["チェ", "che"], ["チョ", "cho"]] },
        { label: "ny", cells: [["ニャ", "nya"], null, ["ニュ", "nyu"], null, ["ニョ", "nyo"]] },
        { label: "hy", cells: [["ヒャ", "hya"], null, ["ヒュ", "hyu"], null, ["ヒョ", "hyo"]] },
        { label: "my", cells: [["ミャ", "mya"], null, ["ミュ", "myu"], null, ["ミョ", "myo"]] },
        { label: "ry", cells: [["リャ", "rya"], null, ["リュ", "ryu"], null, ["リョ", "ryo"]] },
        { label: "gy", cells: [["ギャ", "gya"], null, ["ギュ", "gyu"], null, ["ギョ", "gyo"]] },
        { label: "j", cells: [["ジャ", "ja", ["jya"]], null, ["ジュ", "ju", ["jyu"]], ["ジェ", "je"], ["ジョ", "jo", ["jyo"]]] },
        { label: "by", cells: [["ビャ", "bya"], null, ["ビュ", "byu"], null, ["ビョ", "byo"]] },
        { label: "py", cells: [["ピャ", "pya"], null, ["ピュ", "pyu"], null, ["ピョ", "pyo"]] },
    ]
};

export const extended = {
    key: "extended",
    name: "Extended (Loanword Sounds)",
    examples: [["ファ", "fa"], ["ウィ", "wi"], ["ヴォ", "vo"]],
    columns: ["a", "i", "u", "e", "o"],
    rows: [
        { label: "w", cells: [null, ["ウィ", "wi"], null, ["ウェ", "we"], ["ウォ", "wo"]] },
        { label: "kw", cells: [["クァ", "kwa"], ["クィ", "kwi"], null, ["クェ", "kwe"], ["クォ", "kwo"]] },
        { label: "ts", cells: [["ツァ", "tsa"], ["ツィ", "tsi"], null, ["ツェ", "tse"], ["ツォ", "tso"]] },
        { label: "t", cells: [null, ["ティ", "ti"], ["テュ", "tyu"], null, null] },
        { label: "f", cells: [["ファ", "fa"], ["フィ", "fi"], ["フュ", "fyu"], ["フェ", "fe"], ["フォ", "fo"]] },
        { label: "d", cells: [null, ["ディ", "di"], ["デュ", "dyu"], null, null] },
        { label: "v", cells: [["ヴァ", "va"], ["ヴィ", "vi"], ["ヴ", "vu"], ["ヴェ", "ve"], ["ヴォ", "vo"]] },
    ],
    footnote: "Other less frequently used katakana combinations include: イェ (ye), グァ (gwa), トゥ (tu), ドゥ (du), ヴュ (vyu)."
};

const katakana = { title: "Katakana", tables: [gojuon, dakuten, youon, extended] };

export default katakana;
