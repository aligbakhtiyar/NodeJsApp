const Fee = require("../models/Fee");

// Helper to calculate EMI
const calculateEMI = (principal, rate, months) => {
  const monthlyRate = rate / 12 / 100;
  const emi =
    rate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
  return parseFloat(emi.toFixed(2));
};

// Create or Update Fee Data
const createOrUpdateFee = async (req, res) => {
  try {
    const {
      programName,
      semesterFee,
      examFeePerSem,
      totalSemesters,
      totalProgramFee,
    } = req.body;

    // Save base info
    const basicFeeInfo = {
      programName,
      semesterFee,
      examFeePerSem,
      totalSemesters,
      totalProgramFee,
    };

    // Calculate Grants
    const grantOptions = [
      {
        grantName: "SG 20%",
        grantRate: 0.2,
        totalFeeWithGrant: parseFloat((totalProgramFee * 0.8).toFixed(2)),
        semesterFeeWithGrant: parseFloat((semesterFee * 0.8).toFixed(2)),
      },
    ];

    const grantCombinations = [
      {
        mainGrant: "SG 20%",
        mainGrantRate: 0.2,
        additionalGrant: "LS Additional Grant",
        additionalGrantRate: 0.1,
        totalFeeWithGrants: parseFloat(
          (totalProgramFee * 0.8 * 0.9).toFixed(2)
        ),
      },
    ];

    // Define EMI Options
    const emiOptions = [
      {
        tenureMonths: 6,
        description: "6 months",
        emiType: "NO_COST_EMI",
        interestRate: 0.0,
        emiAmount: calculateEMI(totalProgramFee, 0, 6),
        totalPayable: totalProgramFee,
      },
      {
        tenureMonths: 6,
        description: "6 months",
        emiType: "PROPELLD_EMI",
        interestRate: 5.25,
        emiAmount: calculateEMI(totalProgramFee, 5.25, 6),
        totalPayable: parseFloat(
          (calculateEMI(totalProgramFee, 5.25, 6) * 6).toFixed(2)
        ),
      },
      {
        tenureMonths: 12,
        description: "1 year",
        emiType: "NO_COST_EMI",
        interestRate: 0.0,
        emiAmount: calculateEMI(totalProgramFee, 0, 12),
        totalPayable: totalProgramFee,
      },
      {
        tenureMonths: 12,
        description: "1 year",
        emiType: "PROPELLD_EMI",
        interestRate: 10.5,
        emiAmount: calculateEMI(totalProgramFee, 10.5, 12),
        totalPayable: parseFloat(
          (calculateEMI(totalProgramFee, 10.5, 12) * 12).toFixed(2)
        ),
      },
      {
        tenureMonths: 18,
        description: "1.5 years",
        emiType: "NO_COST_EMI",
        interestRate: 0.0,
        emiAmount: calculateEMI(totalProgramFee, 0, 18),
        totalPayable: totalProgramFee,
      },
      {
        tenureMonths: 24,
        description: "2 years",
        emiType: "NO_COST_EMI",
        interestRate: 0.0,
        emiAmount: calculateEMI(totalProgramFee, 0, 24),
        totalPayable: totalProgramFee,
      },
      {
        tenureMonths: 24,
        description: "2 years",
        emiType: "PROPELLD_EMI",
        interestRate: 21.0,
        emiAmount: calculateEMI(totalProgramFee, 21.0, 24),
        totalPayable: parseFloat(
          (calculateEMI(totalProgramFee, 21.0, 24) * 24).toFixed(2)
        ),
      },
    ];

    // Save or Update in DB
    const existing = await Fee.findOne({ "basicFeeInfo.programName": programName });

    if (existing) {
      existing.basicFeeInfo = basicFeeInfo;
      existing.grantOptions = grantOptions;
      existing.grantCombinations = grantCombinations;
      existing.emiOptions = emiOptions;
      await existing.save();
      res.status(200).json({ message: "Fee updated successfully", data: existing });
    } else {
      const newFee = await Fee.create({
        basicFeeInfo,
        grantOptions,
        grantCombinations,
        emiOptions,
      });
      res.status(201).json({ message: "Fee created successfully", data: newFee });
    }
  } catch (error) {
    console.error("Error creating/updating fee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Fee Details
const getFeeDetails = async (req, res) => {
  try {
    const programName = req.query.programName;
    const data = programName
      ? await Fee.findOne({ "basicFeeInfo.programName": programName })
      : await Fee.find();

    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching fee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createOrUpdateFee,
  getFeeDetails,
};
