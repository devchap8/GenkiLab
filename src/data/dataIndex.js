import L0 from "./vocab/L0Vocab.json";
import L1 from "./vocab/L1Vocab.json";
import L2 from "./vocab/L2Vocab.json";
import L3 from "./vocab/L3Vocab.json";
import L4 from "./vocab/L4Vocab.json";
import L5 from "./vocab/L5Vocab.json";
import L6 from "./vocab/L6Vocab.json";
import L7 from "./vocab/L7Vocab.json";
import L8 from "./vocab/L8Vocab.json";
import L9 from "./vocab/L9Vocab.json";
import L10 from "./vocab/L10Vocab.json";
import L11 from "./vocab/L11Vocab.json";
import L12 from "./vocab/L12Vocab.json";
import L13 from "./vocab/L13Vocab.json";
import L14 from "./vocab/L14Vocab.json";
import L15 from "./vocab/L15Vocab.json";
import L16 from "./vocab/L16Vocab.json";
import L17 from "./vocab/L17Vocab.json";
import L18 from "./vocab/L18Vocab.json";
import L19 from "./vocab/L19Vocab.json";
import L20 from "./vocab/L20Vocab.json";
import L21 from "./vocab/L21Vocab.json";
import L22 from "./vocab/L22Vocab.json";
import L23 from "./vocab/L23Vocab.json";

const vocab = {L0, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11, L12, 
    L13, L14, L15, L16, L17, L18, L19, L20, L21, L22, L23
};

const lessonNames = {
    L0: "Writing System, Greetings, and Numbers",
    L1: "New Friends",
    L2: "Shopping",
    L3: "Making a Date",
    L4: "The First Date",
    L5: "A Trip to Okinawa",
    L6: "A Day in Robert's Life",
    L7: "Family Picture",
    L8: "Barbecue",
    L9: "Kabuki",
    L10: "Winter Vacation Plans",
    L11: "After the Vacation",
    L12: "Feeling Ill",
    L13: "Looking for a Part-time Job",
    L14: "Valentine's Day",
    L15: "A Trip to Nagano",
    L16: "Lost and Found",
    L17: "Grumble and Gossip",
    L18: "John's Part-time Job",
    L19: "Meeting the Boss",
    L20: "Mary Goes Shopping",
    L21: "Burglar",
    L22: "Education in Japan",
    L23: "Good-bye"
};

const subsects = {};
Object.entries(vocab).forEach(v => {
    const subsect = new Set();
    Object.values(v[1]).forEach(info => {
        subsect.add(info.subsect);
    });
    subsects[v[0]] = [...subsect];
});

const data = {vocab, lessonNames, subsects};

export default data;