import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
    static reviewDetails(body) {
        const allowedAttributes = ["id", "body", "createdAt", "user"]
        let serializedReview = {}
        body.user = UserSerializer.userDetailsForReviews(body.user)
        for (const attr of allowedAttributes) {
            serializedReview[attr] = body[attr]
        }
        return serializedReview
    }


}

export default ReviewSerializer