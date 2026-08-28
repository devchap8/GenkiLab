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

const inThisLesson = {
    L0: ["Read hiragana and katakana", "Greet people", "Read numbers and count"],
    L1: ["Introduce Ourselves", "Ask and tell people names, majors at school, time, etc."],
    L2: ["Ask and answer how much things cost", "Go shopping", "Order food in a restaurant"],
    L3: ["Talk about daily activities", "Extend, accept, and refuse invitations"],
    L4: ["Ask and descripe where things/people are", "Talk about things that happened in the past", "Talk about habitual actions in the past"],
    L5: ["Talk about travel", "Describe people and things", "Make offers and invitations", "Talk about likes and dislikes"],
    L6: ["Make requests", "Ask for and give permission", "Talk about rules and regulations", "Offer help", "Give reasons for doing/not doing something"],
    L7: ["Talk about families and friends", "Describe how people are dressed and how they look"],
    L8: ["Talk casually", "Express thoughts and opinions", "Report someone's speech", "Request not to do", "Talk about things we like/dislike"],
    L9: ["Talk casually about the things that happened in the past", "Express thoughts and opinions about past events", "Report someone's speech", "Order food at a restaurant or shop", "Give reasons"],
    L10: ["Compare things and people", "Talk about future plans", "Describe changes in states", "Talk about means of transportation and the time required", "Ask about tours and make reservations"], 
    L11: ["Express what we want to do", "Talk about our experiences", "Introduce friends to each other", "Ask and talk about hometowns"],
    L12: ["Give and ask for an explanation", "Complain about something being too much", "Express what we have to do", "Describe symptoms of illness", "Give advice"],
    L13: ["Say what we can or cannot do", "Give several reasons", "Express first impressions", "Talk about part-time job experience"],
    L14: ["Express what we want", "Talk about uncertain things", "Give and receive presents", "Talk about Valentine's Day and special days"],
    L15: ["Suggest doing something together", "Make preparations", "Describe people or things in detail", "Make plans for the trip with friends"],
    L16: ["Talk about doing a favor", "Express our hopes and wishes", "Apologize", "Describe lost items"],
    L17: ["Tell what we hear from others", "Talk about hypothetical situations", "Point out similarities", "Grumble about our situations"],
    L18: ["Describe the states of things", "Talk about failures", "Express our regret", "Talk with the manager at a workplace"],
    L19: ["Show our respect", "Express gratitude", "Talk about things we are glad that we did", "Talk politely with bosses"],
    L20: ["Speak modestly about ourselves", "Express what is difficult or easy to do", "Return and exchange merchandise", "Ask for directions"],
    L21: ["Talk about bad experiences", "Check if things have been prepared", "Tell somebody what we wish them to do", "Report incidents to the police"],
    L22: ["Talk about getting people to do things", "Instruct people to do things", "Ask for and give advice", "Express opinions on education"],
    L23: ["Complain about doing something undesirable", "Make a resolution for a new phase of life", "Reminisce about the past", "Say farewell"]
}

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