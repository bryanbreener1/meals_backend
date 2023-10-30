import Review from "./review.model.js";

export class ReviewService {

  async findAllReview() {
    return await Review.findAll({
      where: {
        status: true,
      },
    })
  }

  async createReview(data) {
    return await Review.create(data)
  }

  async findOneReview(id) {
    return await Review.findOne({
      where: {
        id,
        status: true,
      },
    })
  }

  async updateReview(review, data) {
    return await review.update(data)
  }

  async deleteReview(review) {
    return await review.update({ status: false })
  }
  
}
