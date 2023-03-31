document.addEventListener("DOMContentLoaded", () => {
    const lengthSlider = document.getElementById("length") as HTMLInputElement;
    const lengthValue = document.getElementById("lengthValue") as HTMLElement;
    const uppercaseCheckbox = document.getElementById("uppercase") as HTMLInputElement;
    const lowercaseCheckbox = document.getElementById("lowercase") as HTMLInputElement;
    const numbersCheckbox = document.getElementById("numbers") as HTMLInputElement;
    const symbolsCheckbox = document.getElementById("symbols") as HTMLInputElement;
    const generateButton = document.getElementById("generate") as HTMLButtonElement;
    const passwordOutput = document.getElementById("password") as HTMLInputElement;
  
    lengthSlider.addEventListener("input", () => {
      lengthValue.innerText = lengthSlider.value;
    });
  
    generateButton.addEventListener("click", () => {
      const length = parseInt(lengthSlider.value);
      const includeUppercase = uppercaseCheckbox.checked;
      const includeLowercase = lowercaseCheckbox.checked;
      const includeNumbers = numbersCheckbox.checked;
      const includeSymbols = symbolsCheckbox.checked;
  
      passwordOutput.value = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    });
  
    function generatePassword(length: number, includeUppercase: boolean, includeLowercase: boolean, includeNumbers: boolean, includeSymbols: boolean): string {
      const characterTypes: string[] = [];
  
      if (includeUppercase) characterTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      if (includeLowercase) characterTypes.push("abcdefghijklmnopqrstuvwxyz");
      if (includeNumbers) characterTypes.push("0123456789");
      if (includeSymbols) characterTypes.push("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~");
  
      let password = "";
  
      for (let i = 0; i < length; i++) {
        const typeIndex = secureRandomNumber(0, characterTypes.length - 1);
        const charset = characterTypes[typeIndex];
        const charIndex = secureRandomNumber(0, charset.length - 1);
        password += charset[charIndex];
      }
  
      return password;
    }
  
    function secureRandomNumber(min: number, max: number): number {
      const range = max - min + 1;
      const randomBytes = new Uint8Array(1);
      const maxExclusive = 256 - (256 % range);
  
      let randomNumber: number;
      do {
        crypto.getRandomValues(randomBytes);
        randomNumber = randomBytes[0];
      } while (randomNumber >= maxExclusive);
  
      return min + (randomNumber % range);
    }
  });
  