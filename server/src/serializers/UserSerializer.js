class UserSerializer {
    static userDetailsForReviews(user) {
        const allowedAttributes = ["id", "username"]
        let serializedUser = {}
        for (const attr of allowedAttributes) {
            serializedUser[attr] = user[attr]
        }
        return serializedUser
    }
}

export default UserSerializer