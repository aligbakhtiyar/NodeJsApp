const mongoose = require("mongoose");

const basicFeeInfoSchema = new mongoose.Schema({
  programName: { type: String, required: true, unique: true },
  semesterFee: { type: Number, required: true },
  examFeePerSem: { type: Number, required: true },
  totalSemesters: { type: Number, required: true },
  totalProgramFee: { type: Number, required: true },
});

const grantOptionSchema = new mongoose.Schema({
  grantName: { type: String, required: true },
  grantRate: { type: Number, required: true },
  totalFeeWithGrant: { type: Number, required: true },
  semesterFeeWithGrant: { type: Number, required: true },
});

const grantCombinationSchema = new mongoose.Schema({
  mainGrant: { type: String, required: true },
  mainGrantRate: { type: Number, required: true },
  additionalGrant: { type: String, required: true },
  additionalGrantRate: { type: Number, required: true },
  totalFeeWithGrants: { type: Number, required: true },
});

const emiOptionSchema = new mongoose.Schema({
  tenureMonths: { type: Number, required: true },
  description: { type: String, required: true },
  emiType: { type: String, enum: ["NO_COST_EMI", "PROPELLD_EMI"], required: true },
  interestRate: { type: Number, required: true },
  emiAmount: { type: Number, required: true },
  totalPayable: { type: Number, required: true },
});

const feeSchema = new mongoose.Schema({
  basicFeeInfo: { type: basicFeeInfoSchema, required: true },
  grantOptions: [grantOptionSchema],
  grantCombinations: [grantCombinationSchema],
  emiOptions: [emiOptionSchema],
});

module.exports = mongoose.model("Fee", feeSchema);
