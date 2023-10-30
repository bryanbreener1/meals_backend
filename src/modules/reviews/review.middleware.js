import { AppError } from "../../errors/appError.js";
import { ReviewService } from "./review.service.js";

const reviewService = new ReviewService();

export const reviewExist = async(req, res, next) => {
    const { id } = req.params;
    const review = await reviewService.findOneReview(id)
    if (!review) {
        return next(new AppError(`review with id id not found`))
    }
    req.review = review
    next()
}



