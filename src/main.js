import "./css/index.css"
import IMask from "imask"

//Setter to card expiration default date
document.querySelector(".cc-expiration .value").innerHTML = `${
  new Date().getMonth() > 10
    ? new Date().getMonth()
    : `0${new Date().getMonth()}`
}/${(new Date().getFullYear() + 10) % 100}`

//Card Colors
const ccBgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

//Card Logo
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

//Card CVC / Security Code
const securityCode = document.querySelector(".input-wrapper #security-code")
const securityCodePattern = {
  mask: "0000",
}
//document.querySelector(".cc-security .value").innerHTML =
const securityCodeMasked = IMask(securityCode, securityCodePattern)

//Card Name
const ownerName = document.querySelector(".input-wrapper #card-holder")
const ownerNamePattern = {
  mask: "**************************",
}
const ownerNameMasked = IMask(ownerName, ownerNamePattern)

//Card Expire Date
const expireDate = document.querySelector(".input-wrapper #expiration-date")
const expireDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: new Date().getFullYear() % 100,
      to: (new Date().getFullYear() + 10) % 100,
    },
  },
}
const espireDateMasked = IMask(expireDate, expireDatePattern)

//Function to set Card
function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#C69347", "#DF6F29"],
    nubank: ["#8219B4", "#BF35E1"],
    default: ["black", "gray"],
  }
  ccBgColor1.setAttribute("fill", colors[type][0])
  ccBgColor2.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `/cc-${type}.svg`)
}

//Global to set card
globalThis.setCardType = setCardType

//Card Number
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^19\d{0,14}/,
      cardType: "nubank",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    setCardType(foundMask.cardType)
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão Adicionado!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

let cardHolder = document.querySelector("#card-holder")
let cardNumbers = document.querySelector("#card-number")
let expireNumber = document.querySelector("#expiration-date")
let cvcNumber = document.querySelector("#security-code")

cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerHTML =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

//Card Number Changer
cardNumbers.addEventListener("input", () => {
  const ccNumber = document.querySelector(".cc-info .cc-number")
  ccNumber.innerHTML =
    cardNumbers.value.length === 0 ? "1234 5678 9012 3456" : cardNumbers.value
})

//Expire Date Changer
expireNumber.addEventListener("input", () => {
  const ccExpire = document.querySelector(".cc-expiration .value")
  ccExpire.innerHTML =
    expireNumber.value.length === 0
      ? `${
          new Date().getMonth() > 10
            ? new Date().getMonth()
            : `0${new Date().getMonth()}`
        }/${(new Date().getFullYear() + 10) % 100}`
      : expireNumber.value
})

//CVC Number Changer
cvcNumber.addEventListener("input", () => {
  const ccCvc = document.querySelector(".cc-security .value")
  ccCvc.innerHTML = cvcNumber.value.length === 0 ? "123" : cvcNumber.value
})
