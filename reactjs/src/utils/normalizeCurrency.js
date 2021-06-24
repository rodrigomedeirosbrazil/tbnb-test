const normalizeCurrency = viewValueParam => {
    let viewValue = String(viewValueParam);

    if (viewValue.length <= 3) {
        viewValue = '00' + viewValue;
    }

    let value = viewValue;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})$/, '.$1');
    let plainNumber = value.replace(/^(0)(\d)/g, '$2');

    return plainNumber;
}

export default normalizeCurrency