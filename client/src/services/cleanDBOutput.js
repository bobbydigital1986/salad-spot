const cleanDBOutput = formInput => {
    Object.keys(formInput).forEach(field => {
        if(!formInput[field]) {
            formInput[field] = ""
        }
    })
    return formInput
}

export default cleanDBOutput