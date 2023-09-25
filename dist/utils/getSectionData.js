"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionData = void 0;
exports.getSectionData = (data, charIndex, uncategorizedAtTop = false) => {
    const validLettersMap = getValidLettersMap(charIndex);
    const alphabetEntrySet = getAlphabetEntrySet(data, validLettersMap);
    return alphabetEntrySet
        .map(formatEntry)
        .sort((a, b) => sortSectionsByCharIndex(a, b, validLettersMap, uncategorizedAtTop))
        .map((section, index) => (Object.assign(Object.assign({}, section), { index })));
};
const getValidLettersMap = (letterMap) => {
    const map = {};
    letterMap.forEach((letter, i) => {
        map[letter.toLowerCase()] = i + 1;
    });
    return map;
};
const getAlphabetEntrySet = (data, validLettersMap) => {
    const alphabetSet = {};
    data.forEach((item) => {
        const letter = getItemFirstLetter(item.value, validLettersMap);
        if (!letter)
            return;
        if (!alphabetSet[letter]) {
            alphabetSet[letter] = [];
        }
        alphabetSet[letter].push(item);
    });
    return Object.entries(alphabetSet);
};
const getItemFirstLetter = (value, validLettersMap) => {
    const firstChar = value.substring(0, 1);
    const isValidLetter = validLettersMap[firstChar.toLowerCase()];
    if (isValidLetter) {
        return firstChar.toUpperCase();
    }
    return "#";
};
const formatEntry = (entry) => {
    const [title, unsortedData] = entry;
    const data = unsortedData.sort((a, b) => alphabeticComparison(a.value, b.value));
    return { title, data };
};
const isLetterHash = (charOne, charTwo) => charOne !== "#" && charTwo === "#";
const sortSectionsByCharIndex = (a, b, validLettersMap, uncategorizedAtTop) => {
    const charA = a.title.toLowerCase();
    const charB = b.title.toLowerCase();
    const isBHash = isLetterHash(charA, charB);
    if (isBHash)
        return uncategorizedAtTop ? 1 : -1;
    const isAHash = isLetterHash(charB, charA);
    if (isAHash)
        return uncategorizedAtTop ? -1 : 1;
    const charAPosition = validLettersMap[charA];
    const charBPosition = validLettersMap[charB];
    return charAPosition - charBPosition;
};
const alphabeticComparison = (a, b) => {
    const aCap = a.toUpperCase();
    const bCap = b.toUpperCase();
    if (aCap < bCap)
        return -1;
    if (aCap > bCap)
        return 1;
    return 0;
};
