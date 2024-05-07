import UserModel from "../../../../dataBase/models/user.model.js";
import { AppError } from "../../../Utiletis/AppError.js";
import ApiFeatures from "../../../Utiletis/apiFeatures.js";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";

//add to wichList
const addTowichList = handelError(async (req, res, next) => {
  let { product } = req.body;
  let updatedwichList = await UserModel.findOneAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: product },
    },
    req.body,
    { new: true }
  );
  updatedwichList && res.json({ message: "Done", updatedwichList });
  !updatedwichList && res.json({ message: "not found", updatedwichList });
});

//remove from wichList
const removeFromwichList = handelError(async (req, res, next) => {
  let { product } = req.body;
  let updatedwichList = await UserModel.findOneAndUpdate(
    req.user._id,
    {
      $pull: { wishList: product },
    },
    req.body,
    { new: true }
  );
  updatedwichList && res.json({ message: "Done", updatedwichList });
  !updatedwichList && res.json({ message: "not found", updatedwichList });
});

//get all from wichList
const getAllFromwichList = handelError(async (req, res, next) => {
  let updatedwichList = await UserModel.findOne({_id:req.user._id});
  updatedwichList && res.json({ message: "Done", updatedwichList:updatedwichList.wishList });
  !updatedwichList && res.json({ message: "not found", updatedwichList });
});

export { addTowichList, removeFromwichList, getAllFromwichList };
