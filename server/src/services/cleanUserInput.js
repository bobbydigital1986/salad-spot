const cleanUserInput = formInput => {
    Object.keys(formInput).forEach(field => {
        if(formInput[field] === "") {
            formInput[field] = null
        }
    })
    return formInput
}

export default cleanUserInput