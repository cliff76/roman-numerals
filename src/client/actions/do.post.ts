export async function doPost(value: string) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 5000)
    })
}