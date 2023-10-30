import { catchAsync } from "../../errors/catchAsync.js";
import { validatePartialReview, validateReview } from "./review.schema.js";
import { ReviewService } from "./review.service.js";

const reviewService = new ReviewService();

export const findAllReview = catchAsync(async (req, res, next) => {
  const reviews = await reviewService.findAllReview();
  return res.json(reviews);
});

export const createReview = catchAsync(async (req, res, next) => {
  const { hasError, errorMesages, reviewData } = validateReview(req.body);
  if (hasError) {
    return res.status(422).json({
      status: "error",
      messages: errorMesages,
    });
  }
  const review = await reviewService.createReview(reviewData);
  return res.status(201).json(review);
});

export const findOneReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  return res.status(200).json(review);
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { hasError, errorMesages, reviewData } = validatePartialReview(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: "error",
      messages: errorMesages,
    });
  }
  const reviewUpdated = await reviewService.updateReview(review, reviewData);
  return res.status(200).json(reviewUpdated);
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  await reviewService.deleteReview(review);
  res.status(204).json(null);
});
