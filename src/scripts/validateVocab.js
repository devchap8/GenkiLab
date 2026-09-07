export default function validateVocab(response, answer) {
    // regexes from cleanSearchText in VocabListSection component
    if(!answer) return false;
    let newAnswer = answer.trim();
    response = response.trim();
    if(response === newAnswer) return true;

    // for words with multiple readings, split at / and check each word
    if(newAnswer.includes("/") || newAnswer.includes("／")) {
        const answers = newAnswer.split(/[/／]/);
        for(let ans of answers) {
            if(validateVocab(response, ans)) return true;
        }
    }

    // check the answer including things in parenthesis
    const parens = /[()（）]/g;
    if(parens.test(answer)) {
        const noParen = answer.trim().replace(parens, "");
        if(validateVocab(response, noParen)) return true;
    }


    // pluses and everything following them (words ending in + negative, etc.)
    newAnswer = newAnswer.replace(/[+＋].*/, "").trim();
    if(newAnswer === response) return true;
    // replace english parenthesis and their contents
    newAnswer = newAnswer.replace(/\([^)]*\)/g, "").trim();
    if(newAnswer === response) return true;
    // replace japanese parenthesis and their contents
    newAnswer = newAnswer.replace(/（[^）]*）/g, "").trim();
    if(newAnswer === response) return true;
    // replace special characters
    newAnswer = newAnswer.replace(/[～。~.]/g, "").trim();
    return newAnswer === response;    
    

}
