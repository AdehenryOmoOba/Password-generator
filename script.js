const lightTxt = document.querySelector(".light-txt");
const copyBtn = document.querySelector(".password button");
const switchInput = document.querySelector(".switch-input");
const content = document.querySelector(".content");
const body = document.querySelector("body");
const waves = document.querySelectorAll(".waves .shape-fill");
const form = document.querySelector(".pass-form");
const passwordField = document.getElementById("password-field");
const passGenBtn = document.querySelector(".input-submit");
const contactBtn = document.querySelector(".contact-us a");
const xterRange = document.getElementById("xter-range");
const xterNumber = document.getElementById("xter-number");
const uppercaseInput = document.getElementById("uppercase");
const numbersInput = document.getElementById("numbers");
const symbolInput = document.getElementById("symbol");

//                                      Night mode switch //

switchInput.addEventListener("change", () => {
  if (lightTxt.textContent === "OFF") {
    lightTxt.textContent = "ON";
    body.style.background = "#ff4500";
    contactBtn.style.color = "#fff";
    waves.forEach((wave) => {
      wave.style.fill = "#ff0000";
    });
  } else {
    lightTxt.textContent = "OFF";
    body.style.background = "var(--bg-linear-gradient)";
    contactBtn.style.color = "#ff0000";
    waves.forEach((wave) => {
      wave.style.fill = "#c8c8f3";
    });
  }
});

// //                                Password Generator                  //

function syncNumberAndXterCount(event) {
  const value = event.target.value;
  xterRange.value = value;
  xterNumber.value = value;
}

xterNumber.addEventListener("input", syncNumberAndXterCount);
xterRange.addEventListener("input", syncNumberAndXterCount);

function arrayGenerator(low, high) {
  let myArray = [];
  for (i = low; i <= high; i++) {
    myArray.push(i);
  }
  return myArray;
}

const upperCaseCharCodesArray = arrayGenerator(65, 90);
const lowerCaseCharCodesArray = arrayGenerator(97, 122);
const numberCharCodesArray = arrayGenerator(48, 57);
const symbolCharCodesArray = arrayGenerator(33, 47)
  .concat(arrayGenerator(58, 64))
  .concat(arrayGenerator(91, 96))
  .concat(arrayGenerator(123, 126));

function generatePassword(
  passwordLength,
  includeSymbol,
  includeNUmbers,
  includeUppercase
) {
  let charCodes = lowerCaseCharCodesArray;
  if (includeUppercase) {
    charCodes = charCodes.concat(upperCaseCharCodesArray);
  }
  if (includeNUmbers) {
    charCodes = charCodes.concat(numberCharCodesArray);
  }
  if (includeSymbol) {
    charCodes = charCodes.concat(symbolCharCodesArray);
  }

  let passwordCharaters = [];
  for (i = 0; i < passwordLength; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharaters.push(String.fromCharCode(characterCode));
  }
  return passwordCharaters.join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const passwordLength = xterNumber.value;
  const includeSymbol = symbolInput.checked;
  const includeNUmbers = numbersInput.checked;
  const includeUppercase = uppercaseInput.checked;
  const password = generatePassword(
    passwordLength,
    includeSymbol,
    includeNUmbers,
    includeUppercase
  );

  passwordField.value = password;
});

// Copy Button //

copyBtn.addEventListener("click", () => {
  passwordField.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
});
