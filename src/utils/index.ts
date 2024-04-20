function generateUsername(name: string, surname: string){
    const username = `${name.toLowerCase()}_${surname.toLowerCase()}`;
    return username;
}
function textTruncate(text: string, length: number){
    return text.length > length ? text.slice(0, length) + '...' : text;
}


export { generateUsername,textTruncate }

