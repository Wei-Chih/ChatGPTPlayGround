document.addEventListener("DOMContentLoaded", function () {
    var lengthSlider = document.getElementById("length");
    var lengthValue = document.getElementById("lengthValue");
    var uppercaseCheckbox = document.getElementById("uppercase");
    var lowercaseCheckbox = document.getElementById("lowercase");
    var numbersCheckbox = document.getElementById("numbers");
    var symbolsCheckbox = document.getElementById("symbols");
    var generateButton = document.getElementById("generate");
    var passwordOutput = document.getElementById("password");
    lengthSlider.addEventListener("input", function () {
        lengthValue.innerText = lengthSlider.value;
    });
    generateButton.addEventListener("click", function () {
        var length = parseInt(lengthSlider.value);
        var includeUppercase = uppercaseCheckbox.checked;
        var includeLowercase = lowercaseCheckbox.checked;
        var includeNumbers = numbersCheckbox.checked;
        var includeSymbols = symbolsCheckbox.checked;
        passwordOutput.value = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    });
    function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
        var characterTypes = [];
        if (includeUppercase)
            characterTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        if (includeLowercase)
            characterTypes.push("abcdefghijklmnopqrstuvwxyz");
        if (includeNumbers)
            characterTypes.push("0123456789");
        if (includeSymbols)
            characterTypes.push("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~");
        var password = "";
        for (var i = 0; i < length; i++) {
            var typeIndex = secureRandomNumber(0, characterTypes.length - 1);
            var charset = characterTypes[typeIndex];
            var charIndex = secureRandomNumber(0, charset.length - 1);
            password += charset[charIndex];
        }
        return password;
    }
    function secureRandomNumber(min, max) {
        var range = max - min + 1;
        var randomBytes = new Uint8Array(1);
        var maxExclusive = 256 - (256 % range);
        var randomNumber;
        do {
            crypto.getRandomValues(randomBytes);
            randomNumber = randomBytes[0];
        } while (randomNumber >= maxExclusive);
        return min + (randomNumber % range);
    }
});
