"use strict";
class FahrenheitToCelsius {
    Convert(temperature) {
        return (temperature - 32) * 5 / 9;
    }
}
class CelsiusToFahrenheit {
    Convert(temperature) {
        return (temperature * 9 / 5) + 32;
    }
}
function Convert(temperature, method) {
    return method.Convert(temperature);
}
let f = Convert(100, new CelsiusToFahrenheit());
console.log(`100 C = ${f} F`);
let c = Convert(100, new FahrenheitToCelsius());
console.log(`100 F = ${c} C`);
