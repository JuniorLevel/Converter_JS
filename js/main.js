import {
    dataValueRUR,
    dataValueRUR2,
    dataValueUSD,
    dataValueUSD2,
    dataValueEUR,
    dataValueEUR2,
    dataValueGBP,
    dataValueGBP2,
    input1,
    input2,
    inputAreaRateTo,
    inputAreaRateFrom
} from "./domElements.js";

const asyncGetCurrencies = async (url) => {
    const response = await fetch(url)
    return await response.json()
}

const result = await asyncGetCurrencies('https://www.cbr-xml-daily.ru/daily_json.js').then(data => data)

const ratesCurrencies = {}

ratesCurrencies.USD = result.Valute.USD.Value
ratesCurrencies.EUR = result.Valute.EUR.Value
ratesCurrencies.GBP = result.Valute.GBP.Value
ratesCurrencies.RUR = 1

const [USD,EUR,GBP,RUR] = Object.keys(ratesCurrencies)

function addOrrRemoveClassActive (dataValue1,dataValue2,dataValue3,dataValue4){
    dataValue1.classList.add('_active')
    dataValue2.classList.remove('_active')
    dataValue3.classList.remove('_active')
    dataValue4.classList.remove('_active')
}

function clearInputs () {
    input1.value = ''
    input2.value = ''
    inputAreaRateTo.innerHTML = ''
    inputAreaRateFrom.innerHTML = ''
}

function checkInput() {
    input2.value.length > 10 ? input2.style.fontSize = '35px' : input2.style.fontSize = '45px'
    input1.value.length === 0 ? input2.value = '' : 'error'
    input1.value = input1.value.replace(/[^0-9,.]/, '')
    input2.value = input2.value.replace(/[^0-9,.]/, '')
}

function sameCurrencyConversion(nameOfRate) {
    input1.oninput = function() {
        input2.value = input1.value
        checkInput()
    }
    inputAreaRateFrom.innerHTML = `1 ${nameOfRate} = 1`
    inputAreaRateTo.innerHTML = `1 ${nameOfRate} = 1`
}

function currencyConversion(rateCurrency1, nameOfRateCurrency1, rateCurrency2, nameOfRateCurrency2) {
    input1.oninput = function () {
        input2.value = ((parseFloat(input1.value) * rateCurrency1) / rateCurrency2).toFixed(4)
        inputAreaRateTo.innerHTML = `1 ${nameOfRateCurrency1} = ${(rateCurrency1 / rateCurrency2).toFixed(4)} ${nameOfRateCurrency2}`
        inputAreaRateFrom.innerHTML = `1 ${nameOfRateCurrency2} = ${(rateCurrency2 / rateCurrency1).toFixed(4)} ${nameOfRateCurrency1}`
        checkInput()
    }
}

clearInputs()

dataValueRUR.onclick = () => {
    addOrrRemoveClassActive(dataValueRUR, dataValueUSD, dataValueEUR, dataValueGBP)
    clearInputs()
    dataValueRUR.classList[1] && dataValueRUR2.classList[1] === '_active' ? sameCurrencyConversion(RUR) : RUR
    dataValueRUR.classList[1] && dataValueUSD2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.RUR, RUR, ratesCurrencies.USD, USD) : USD
    dataValueRUR.classList[1] && dataValueEUR2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.RUR, RUR, ratesCurrencies.EUR, EUR) : EUR
    dataValueRUR.classList[1] && dataValueGBP2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.RUR, RUR, ratesCurrencies.GBP, GBP) : GBP
}

dataValueRUR2.onclick = () => {
    addOrrRemoveClassActive(dataValueRUR2, dataValueUSD2, dataValueEUR2, dataValueGBP2)
    clearInputs()
    dataValueRUR2.classList[1] && dataValueRUR.classList[1] === '_active' ? sameCurrencyConversion(RUR) : RUR
    dataValueRUR2.classList[1] && dataValueUSD.classList[1] === '_active' ? currencyConversion(ratesCurrencies.USD, USD, ratesCurrencies.RUR, RUR) : USD || RUR
    dataValueRUR2.classList[1] && dataValueEUR.classList[1] === '_active' ? currencyConversion(ratesCurrencies.EUR, EUR, ratesCurrencies.RUR, RUR) : EUR || RUR
    dataValueRUR2.classList[1] && dataValueGBP.classList[1] === '_active' ? currencyConversion(ratesCurrencies.GBP, GBP, ratesCurrencies.RUR, RUR) : GBP || RUR
}

dataValueUSD.onclick = () => {
    addOrrRemoveClassActive(dataValueUSD, dataValueRUR, dataValueEUR, dataValueGBP)
    clearInputs()
    dataValueUSD.classList[1] && dataValueRUR2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.USD, USD, ratesCurrencies.RUR, RUR) : USD || RUR
    dataValueUSD.classList[1] && dataValueUSD2.classList[1] === '_active' ? sameCurrencyConversion(USD) : USD
    dataValueUSD.classList[1] && dataValueEUR2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.USD, USD, ratesCurrencies.EUR, EUR) : USD || EUR
    dataValueUSD.classList[1] && dataValueGBP2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.USD, USD, ratesCurrencies.GBP, GBP) : USD || GBP
}

dataValueUSD2.onclick = () => {
    addOrrRemoveClassActive(dataValueUSD2, dataValueRUR2, dataValueEUR2, dataValueGBP2)
    clearInputs()
    dataValueUSD2.classList[1] && dataValueRUR.classList[1] === '_active' ? currencyConversion(ratesCurrencies.RUR, RUR, ratesCurrencies.USD, USD) : USD || RUR
    dataValueUSD2.classList[1] && dataValueUSD.classList[1] === '_active' ? sameCurrencyConversion(USD) : USD
    dataValueUSD2.classList[1] && dataValueEUR.classList[1] === '_active' ? currencyConversion(ratesCurrencies.EUR, EUR, ratesCurrencies.USD, USD) : EUR || USD
    dataValueUSD2.classList[1] && dataValueGBP.classList[1] === '_active' ? currencyConversion(ratesCurrencies.GBP, GBP, ratesCurrencies.USD, USD) : GBP || USD
}

dataValueEUR.onclick = () => {
    addOrrRemoveClassActive(dataValueEUR, dataValueRUR, dataValueUSD, dataValueGBP)
    clearInputs()
    dataValueEUR.classList[1] && dataValueRUR2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.EUR, EUR, ratesCurrencies.RUR, RUR) : EUR || RUR
    dataValueEUR.classList[1] && dataValueUSD2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.EUR, EUR, ratesCurrencies.USD, USD) : EUR || USD
    dataValueEUR.classList[1] && dataValueEUR2.classList[1] === '_active' ? sameCurrencyConversion(EUR) : EUR
    dataValueEUR.classList[1] && dataValueGBP2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.EUR, EUR, ratesCurrencies.GBP, GBP) : EUR || GBP
}

dataValueEUR2.onclick = () => {
    addOrrRemoveClassActive(dataValueEUR2, dataValueRUR2, dataValueUSD2, dataValueGBP2)
    clearInputs()
    dataValueEUR2.classList[1] && dataValueEUR2.classList[1] === '_active' ? sameCurrencyConversion(EUR) : EUR
    dataValueEUR2.classList[1] && dataValueRUR.classList[1] === '_active' ? currencyConversion(ratesCurrencies.RUR, RUR, ratesCurrencies.EUR, EUR) : EUR || RUR
    dataValueEUR2.classList[1] && dataValueUSD.classList[1] === '_active' ? currencyConversion(ratesCurrencies.USD, USD, ratesCurrencies.EUR, EUR) : USD || EUR
    dataValueEUR2.classList[1] && dataValueGBP.classList[1] === '_active' ? currencyConversion(ratesCurrencies.GBP, GBP, ratesCurrencies.EUR, EUR) : GBP || EUR
}

dataValueGBP.onclick = () => {
    addOrrRemoveClassActive(dataValueGBP, dataValueRUR, dataValueUSD, dataValueEUR)
    clearInputs()
    dataValueGBP.classList[1] && dataValueRUR2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.GBP, GBP, ratesCurrencies.RUR, RUR) : GBP || RUR
    dataValueGBP.classList[1] && dataValueUSD2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.GBP, GBP, ratesCurrencies.USD, USD) : GBP || USD
    dataValueGBP.classList[1] && dataValueEUR2.classList[1] === '_active' ? currencyConversion(ratesCurrencies.GBP, GBP, ratesCurrencies.EUR, EUR) : GBP || EUR
    dataValueGBP.classList[1] && dataValueGBP2.classList[1] === '_active' ? sameCurrencyConversion(GBP) : GBP
}

dataValueGBP2.onclick = () => {
    addOrrRemoveClassActive(dataValueGBP2, dataValueRUR2, dataValueUSD2, dataValueEUR2)
    clearInputs()
    dataValueGBP2.classList[1] && dataValueRUR.classList[1] === '_active' ? currencyConversion(ratesCurrencies.RUR, RUR, ratesCurrencies.GBP, GBP) : GBP || RUR
    dataValueGBP2.classList[1] && dataValueUSD.classList[1] === '_active' ? currencyConversion(ratesCurrencies.USD, USD, ratesCurrencies.GBP, GBP) : USD || GBP
    dataValueGBP2.classList[1] && dataValueEUR.classList[1] === '_active' ? currencyConversion(ratesCurrencies.EUR, EUR, ratesCurrencies.GBP, GBP) : EUR || GBP
    dataValueGBP2.classList[1] && dataValueGBP.classList[1] === '_active' ? sameCurrencyConversion(GBP) : GBP
}


