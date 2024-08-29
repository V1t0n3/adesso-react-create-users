import CONST from "./const"

const STRING = {
    userSuccessful: "User succesfully created",
    userError: "User not created due to an error. Please retry",
    connectionError: "Connection error or Unknown error. Please retry",
    nameRequired: "Name required",
    minName: `Name must be at least ${CONST.minCharName} chars`,
    maxName: `Name must be max ${CONST.maxCharName} chars`,
    genderRequired: "Gender required",
    statusRequired: "Status required",
    emailRequired: "Email required",
    emailInvalid: "Invalid email",
    emailUsed: "Email already in use",
    userFormButtonText: "Create User",
    userFormTitle: "Create new user"
}

export default STRING