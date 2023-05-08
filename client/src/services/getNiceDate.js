const getNiceDate = (timeStamp) => {
    const dateNormalized = new Date(timeStamp)
    const monthDay = dateNormalized.toLocaleString('en',{ month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })

    return monthDay
}

export default getNiceDate