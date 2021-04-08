(function() {
    const CHAR_CODES = {
        A: 65,
        Z: 90,
        Space: 32,
    };

    const CARD_TYPES = [
        {
            title: 'Master Card',
            rx: new RegExp('^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}'),
            icon: 'mastercard',
        },
        {
            title: 'American Express',
            rx: new RegExp('^3[47]\\d{0,13}'),
            icon: 'amex',
        },
        {
            title: 'Discover',
            rx: new RegExp('^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}'),
            icon: 'discover',
        },
        {
            title: 'Diners',
            rx: new RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}'),
            icon: 'diners',
        },
        {
            title: 'Maestro',
            rx: new RegExp('^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}'),
            icon: 'maestro',
        },
        {
            title: 'Visa',
            rx: new RegExp('^4\\d{0,15}'),
            icon: 'visa',
        }
    ]

    const setCardType = (cardNumber) => {
        let cardTypeEl = document.getElementById('card-type');
        cardTypeEl.removeAttribute('data-icon');

        CARD_TYPES.forEach(({ rx, title, icon }) => {
            if (rx.test(cardNumber)) {
                cardTypeEl.setAttribute('data-icon', icon);
            }
        });
    }

    const checkIsEngChar = (value) => {
        const upperCase = value.toUpperCase();

        return upperCase.charCodeAt(0) >= CHAR_CODES.A &&  upperCase.charCodeAt(0) <= CHAR_CODES.Z || upperCase.charCodeAt(0) === CHAR_CODES.Space;
    };

    const checkIsInteger = (value) => !Number.isNaN(Number.parseInt(value));

    window.onload = function() {
        let cardNumberInput = document.getElementById('card-number');
        let cardHolderInput = document.getElementById('card-holder');
        let expireDateInput = document.getElementById('expire-date');
        let cvvInput = document.getElementById('cvv');

        cardHolderInput.addEventListener('input', function(e) {
            let parsed = e.target.value.split('').filter(checkIsEngChar).join('');
            e.target.value = parsed.toUpperCase();
        });

        cardNumberInput.addEventListener('input', function(e) {
            let parsed = e.target.value.split('').filter(checkIsInteger).join('');
            let result = '';
            
            for (let i = 0; i < parsed.length; i++) {
                if (i > 15) {
                    break
                }
                if (i > 0 && i % 4 === 0) {
                    result += ' ';
                }

                result += parsed[i];
            }

            setCardType(result);
            e.target.value = result;
        });
    }
})();