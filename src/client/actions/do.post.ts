export async function doPost(_:string) {
    return new Promise((resolve, _) => {
        setTimeout(resolve, 5000)
    })
}