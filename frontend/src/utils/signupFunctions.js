//validates the email to be for example "example@example.com"
export function validateEmail(email) {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

//checks if the string contains uppercase and lowercase characters
export function containsUppercaseAndLowercase(str) {
    return Boolean(str.match(/[A-Z]/)&&str.match(/[a-z]/))
}

//checks if the string contains special characters
export function containsSpecialCharacter(str) {
    const specialChars = `[!#&*$]`
    for(let specialChar of specialChars) {
        if(str.includes(specialChar)) {
            return true
        }
    }
    return false
}
