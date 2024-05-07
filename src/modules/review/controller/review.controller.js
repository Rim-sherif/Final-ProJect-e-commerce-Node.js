import reviewModel from "../../../../dataBase/models/reviews.model.js";
import { AppError } from "../../../Utiletis/AppError.js";
import ApiFeatures from "../../../Utiletis/apiFeatures.js";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";

//add review
const addreview = handelError(async (req, res, next) => {
  req.body.user = req.user._id;
  let isReview = await reviewModel.findOne({
    user: req.user._id.toString(),
    product: req.body.product,
  });
  if (isReview) return next(new AppError("already have review", 409));
  let prereview = new reviewModel(req.body);
  let addedreview = await prereview.save();
  res.json({ message: "Added", addedreview });
});

//get all review
const getAllreview = handelError(async (req, res) => {
  let apifeatures = new ApiFeatures(reviewModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();
  let allreview = await reviewModel.find()

  res.json({ message: "Done", allreview });
});

//get all reviewby id
const getAllreviewById = handelError(async (req, res) => {
  let review = await reviewModel.findById(req.params.id);
  res.json({ message: "Done", review });
});

//update review
const updatereview = handelError(async (req, res, next) => {
  let { id } = req.params;
  let updatedreview = await reviewModel.findByIdAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { new: true }
  );
  updatedreview && res.json({ message: "Done", updatedreview });
  !updatedreview && res.json({ message: "not found", updatedreview });
});

//delete review
const deletereview = deleteOne(reviewModel);

export {
  addreview,
  getAllreview,
  getAllreviewById,
  updatereview,
  deletereview,
};
