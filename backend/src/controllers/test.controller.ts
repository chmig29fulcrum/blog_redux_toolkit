import catchAsync from "../utils/catchAsync";

export const getTest = catchAsync(async (req, res, next) => {
  console.log(req.body);

  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      data: '"Hello World!!!"',
    },
  });
});
