const natoDict = {
    'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot', 
    'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett', 'K': 'Kilo', 'L': 'Lima', 
    'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 
    'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 
    'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu', ' ': ' '
};
const reverseNatoDict = Object.fromEntries(Object.entries(natoDict).map(([k, v]) => [v, k]));

const morseDict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
    'Y': '-.--', 'Z': '--..', ' ': ' / ', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
    '9': '----.', '0': '-----'
};
const reverseMorseDict = Object.fromEntries(Object.entries(morseDict).map(([k, v]) => [v, k]));

function caesarEncrypt(text, shift = 3) {
    return text.toUpperCase().split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        return char;
    }).join('');
}

function caesarDecrypt(text, shift = 3) {
    return text.toUpperCase().split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        }
        return char;
    }).join('');
}

function vigenereEncrypt(text, key = "KEY") {
    let result = '';
    key = key.toUpperCase();
    let keyIndex = 0;
    
    for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
            const shift = key.charCodeAt(keyIndex % key.length) - 65;
            result += String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

function vigenereDecrypt(text, key = "KEY") {
    let result = '';
    key = key.toUpperCase();
    let keyIndex = 0;
    
    for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
            const shift = key.charCodeAt(keyIndex % key.length) - 65;
            result += String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

function natoEncrypt(text) {
    return text.toUpperCase().split('').map(char => natoDict[char] || char).join(' ');
}

function natoDecrypt(text) {
    return text.split(' ').map(word => reverseNatoDict[word] || ' ').join('');
}

function morseEncrypt(text) {
    return text.toUpperCase().split('').map(char => morseDict[char] || '').join(' ');
}

function morseDecrypt(text) {
    return text.split(' ').map(code => reverseMorseDict[code] || ' ').join('');
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("INFORMATION ASSURANCE AND SECURITY 2");
console.log("Encrypt and decrypt the text using Caesar, Vigenere, NATO, and Morse code.");

readline.question("Enter text to encrypt/decrypt: ", (text) => {
    readline.question("Select encryption method (Caesar, Vigenere, NATO, Morse): ", (method) => {
        let result, decrypted;
        if (method.toLowerCase() === "caesar") {
            result = caesarEncrypt(text);
            decrypted = caesarDecrypt(result);
            console.log(`Encrypted Text: ${result}`);
            console.log(`Decrypted Text: ${decrypted}`);
        } else if (method.toLowerCase() === "vigenere") {
            readline.question("Enter Vigenere key: ", (key) => {
                result = vigenereEncrypt(text, key);
                decrypted = vigenereDecrypt(result, key);
                console.log(`Encrypted Text: ${result}`);
                console.log(`Decrypted Text: ${decrypted}`);
                readline.close();
            });
        } else if (method.toLowerCase() === "nato") {
            result = natoEncrypt(text);
            decrypted = natoDecrypt(result);
            console.log(`Encrypted Text: ${result}`);
            console.log(`Decrypted Text: ${decrypted}`);
        } else if (method.toLowerCase() === "morse") {
            result = morseEncrypt(text);
            decrypted = morseDecrypt(result);
            console.log(`Encrypted Text: ${result}`);
            console.log(`Decrypted Text: ${decrypted}`);
        } else {
            console.log("Invalid method selected.");
            readline.close();
        }
    });
});