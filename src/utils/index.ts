import supabase from "../config/supabase";

function generateUsername(name: string, surname: string) {
    const username = `${name.toLowerCase()}_${surname.toLowerCase()}`;
    return username;
}

function textTruncate(text: string, length: number) {
    return text.length > length ? text.slice(0, length) + '...' : text;
}


function previewImage(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("No file provided"));
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", () => reject(reader.error));
        reader.readAsDataURL(file);
    });
}

function toText(text: string | number | boolean | object) {
    return String(text)
}

async function changeToImageAdress({table, image}: {table: string, image: {id: string, path: string, fullPath: string} | any}) {
    const { data } = await supabase.storage.from(table).getPublicUrl(image.path)
    return data.publicUrl
}


export { generateUsername, textTruncate, previewImage, toText, changeToImageAdress }