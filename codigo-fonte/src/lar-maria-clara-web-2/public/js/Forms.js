

function inputsFromObject(obj, prefix) {
    const inputs = document.querySelectorAll('input, textarea, select');

    for (const key in obj) {
        const inputName = `${prefix}${capitalize(key)}`;
        const inputElement = Array.from(inputs).find(input => input.name === inputName && input.type != 'file');

        if (inputElement) {
            inputElement.value = obj[key];
        }

        // --
    }
}
