const getNiceDate = (timestamp) => {
    const dateNormalized = new Date(timestamp)
    const monthDay = dateNormalized.toLocaleString('en',{month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' })
    return monthDay
}

export default getNiceDate