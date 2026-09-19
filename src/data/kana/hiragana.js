// Each table has vowel columns and consonant-row cells of [kana, romaji] pairs (or null for a gap).
export const gojuon = {
    key: "gojuon",
    name: "Gojuon (Basic Sounds)",
    examples: [["あ", "a"], ["し", "shi"], ["を", "o"]],
    columns: ["a", "i", "u", "e", "o"],
    rows: [
        { label: "", cells: [["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"]] },
        { label: "k", cells: [["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"]] },
        { label: "s", cells: [["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"]] },
        { label: "t", cells: [["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"]] },
        { label: "n", cells: [["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"]] },
        { label: "h", cells: [["は", "ha"], ["ひ", "hi"], ["ふ", "fu"], ["へ", "he"], ["ほ", "ho"]] },
        { label: "m", cells: [["ま", "ma"], ["み", "mi"], ["む", "mu"], ["め", "me"], ["も", "mo"]] },
        { label: "y", cells: [["や", "ya"], null, ["ゆ", "yu"], null, ["よ", "yo"]] },
        { label: "r", cells: [["ら", "ra"], ["り", "ri"], ["る", "ru"], ["れ", "re"], ["ろ", "ro"]] },
        { label: "w", cells: [["わ", "wa"], null, null, null, ["を", "o"]] },
        { label: "", cells: [["ん", "n"], null, null, null, null] },
    ]
};

export const dakuten = {
    key: "dakuten",
    name: "Dakuten (Voiced Sounds)",
    examples: [["が", "ga"], ["じ", "ji"], ["ぽ", "po"]],
    columns: ["a", "i", "u", "e", "o"],
    rows: [
        { label: "g", cells: [["が", "ga"], ["ぎ", "gi"], ["ぐ", "gu"], ["げ", "ge"], ["ご", "go"]] },
        { label: "z", cells: [["ざ", "za"], ["じ", "ji"], ["ず", "zu"], ["ぜ", "ze"], ["ぞ", "zo"]] },
        { label: "d", cells: [["だ", "da"], ["ぢ", "ji"], ["づ", "zu"], ["で", "de"], ["ど", "do"]] },
        { label: "b", cells: [["ば", "ba"], ["び", "bi"], ["ぶ", "bu"], ["べ", "be"], ["ぼ", "bo"]] },
        { label: "p", cells: [["ぱ", "pa"], ["ぴ", "pi"], ["ぷ", "pu"], ["ぺ", "pe"], ["ぽ", "po"]] },
    ]
};

export const youon = {
    key: "youon",
    name: "Youon (Combo Sounds)",
    examples: [["きゃ", "kya"], ["しゅ", "shu"], ["じょ", "jo"]],
    columns: ["a", "u", "o"],
    rows: [
        { label: "ky", cells: [["きゃ", "kya"], ["きゅ", "kyu"], ["きょ", "kyo"]] },
        { label: "sh", cells: [["しゃ", "sha"], ["しゅ", "shu"], ["しょ", "sho"]] },
        { label: "ch", cells: [["ちゃ", "cha"], ["ちゅ", "chu"], ["ちょ", "cho"]] },
        { label: "ny", cells: [["にゃ", "nya"], ["にゅ", "nyu"], ["にょ", "nyo"]] },
        { label: "hy", cells: [["ひゃ", "hya"], ["ひゅ", "hyu"], ["ひょ", "hyo"]] },
        { label: "my", cells: [["みゃ", "mya"], ["みゅ", "myu"], ["みょ", "myo"]] },
        { label: "ry", cells: [["りゃ", "rya"], ["りゅ", "ryu"], ["りょ", "ryo"]] },
        { label: "gy", cells: [["ぎゃ", "gya"], ["ぎゅ", "gyu"], ["ぎょ", "gyo"]] },
        { label: "j", cells: [["じゃ", "ja"], ["じゅ", "ju"], ["じょ", "jo"]] },
        { label: "by", cells: [["びゃ", "bya"], ["びゅ", "byu"], ["びょ", "byo"]] },
        { label: "py", cells: [["ぴゃ", "pya"], ["ぴゅ", "pyu"], ["ぴょ", "pyo"]] },
    ]
};

const hiragana = { title: "Hiragana", tables: [gojuon, dakuten, youon] };

export default hiragana;
