export const writeOutput = (message) => {
    // this.setState({ output: [...this.state.output, message]});
};

export const generateMask = (cardLast4) => cardLast4.padStart(16, '*');
//
//     // const last4Digits = cardNumber.slice(-4);
//
//     return cardLast4.padStart(16, '*');
// };

export const callCreateChargeAPI = async (response) => {
    const source = response.token;
    const card = response.card;

    writeOutput(`Charging Card '${generateMask(card.last4)}' for $25.00...`);

    // const source = this.state.showUserInfo ? this.state.customerId : this.state.token;
    const data = JSON.stringify({ source: source });

    const chargeResponse = await fetch('/api/createCharge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });

    const resp = await chargeResponse.json();
    if (chargeResponse.status !== 200) {
        throw Error(resp.message);
    }
    this.writeOutput(`Payment Success, Confirmation # is - ${resp.id}`);
    return resp;
};

export const GetCardType = (number) => {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
};