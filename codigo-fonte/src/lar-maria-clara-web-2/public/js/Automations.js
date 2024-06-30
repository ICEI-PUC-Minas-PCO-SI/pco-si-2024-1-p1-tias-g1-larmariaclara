function randStr(len) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let str = '';

    for (let i = 0; i < len; i++) {
        const randIdx = Math.floor(Math.random() * chars.length);
        str += chars.charAt(randIdx);
    }

    return str;
  }

function randEmail() {
    const username = randStr(8);
    const domain = randStr(5) + '.com';
    return `${username}@${domain}`;
}

function randFutureDate() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
    const year = futureDate.getFullYear();
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const day = futureDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function processInputs() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach((input) => {
        if (input.type === 'text') {
            input.value = randStr(8);
        } else if (input.type === 'email') {
            input.value = randEmail();
        } else if (input.type === 'date') {
            input.value = randFutureDate();
        } else if (input.type === 'select-one') {
            const options = input.options;
            const randIdx = Math.floor(Math.random() * options.length);
            input.selectedIndex = randIdx;
        }
    });
}

function com(m){
    console.log(m)
}
