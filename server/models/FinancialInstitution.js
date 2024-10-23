const mongoose = require("mongoose");

const financialInstitutionSchema = new mongoose.Schema({
  institutionName: {
    type: String,
    trim: true,
    required: true,
  },
  permissionLevel: {
    type: Int32,
    required: true,
    default: 1,
  },
});

const FinancialInstitution = mongoose.model(
  "FinancialInstitution",
  financialInstitutionSchema
);

module.exports = FinancialInstitution;
