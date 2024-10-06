nato_dict = {
    'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot', 
    'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett', 'K': 'Kilo', 'L': 'Lima', 
    'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 
    'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 
    'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu', ' ': ' '
}
reverse_nato_dict = {v: k for k, v in nato_dict.items()}

morse_dict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
    'Y': '-.--', 'Z': '--..', ' ': ' / ', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
    '9': '----.', '0': '-----'
}
reverse_morse_dict = {v: k for k, v in morse_dict.items()}

def caesar_encrypt(text, shift=3):
    result = ''
    for char in text.upper():
        if char.isalpha():
            result += chr((ord(char) - 65 + shift) % 26 + 65)
        else:
            result += char
    return result

def caesar_decrypt(text, shift=3):
    result = ''
    for char in text.upper():
        if char.isalpha():
            result += chr((ord(char) - 65 - shift) % 26 + 65)
        else:
            result += char
    return result

def vigenere_encrypt(text, key="KEY"):
    result = ''
    key = key.upper()
    key_index = 0
    for char in text.upper():
        if char.isalpha():
            shift = ord(key[key_index % len(key)]) - 65
            result += chr((ord(char) - 65 + shift) % 26 + 65)
            key_index += 1
        else:
            result += char
    return result

def vigenere_decrypt(text, key="KEY"):
    result = ''
    key = key.upper()
    key_index = 0
    for char in text.upper():
        if char.isalpha():
            shift = ord(key[key_index % len(key)]) - 65
            result += chr((ord(char) - 65 - shift) % 26 + 65)
            key_index += 1
        else:
            result += char
    return result

def nato_encrypt(text):
    result = ' '.join(nato_dict.get(char, char) for char in text.upper())
    return result

def nato_decrypt(text):
    result = ''.join(reverse_nato_dict.get(word, ' ') for word in text.split(' '))
    return result

def morse_encrypt(text):
    result = ' '.join(morse_dict.get(char, '') for char in text.upper())
    return result

def morse_decrypt(text):
    result = ''.join(reverse_morse_dict.get(code, ' ') for code in text.split(' '))
    return result

def main():
    print("INFORMATION ASSURANCE AND SECURITY 2")
    print("Encrypt and decrypt the text using Caesar, Vigenere, NATO, and Morse code.")
    
    text = input("Enter text to encrypt/decrypt: ")
    method = input("Select encryption method (Caesar, Vigenere, NATO, Morse): ")

    if method.lower() == "caesar":
        caesar_result = caesar_encrypt(text)
        caesar_decrypted = caesar_decrypt(caesar_result)
        print(f"Encrypted Text: {caesar_result}")
        print(f"Decrypted Text: {caesar_decrypted}")

    elif method.lower() == "vigenere":
        key = input("Enter Vigenere key: ")
        vigenere_result = vigenere_encrypt(text, key)
        vigenere_decrypted = vigenere_decrypt(vigenere_result, key)
        print(f"Encrypted Text: {vigenere_result}")
        print(f"Decrypted Text: {vigenere_decrypted}")

    elif method.lower() == "nato":
        nato_result = nato_encrypt(text)
        nato_decrypted = nato_decrypt(nato_result)
        print(f"Encrypted Text: {nato_result}")
        print(f"Decrypted Text: {nato_decrypted}")

    elif method.lower() == "morse":
        morse_result = morse_encrypt(text)
        morse_decrypted = morse_decrypt(morse_result)
        print(f"Encrypted Text: {morse_result}")
        print(f"Decrypted Text: {morse_decrypted}")

    else:
        print("Invalid method selected.")

if __name__ == "__main__":
    main()