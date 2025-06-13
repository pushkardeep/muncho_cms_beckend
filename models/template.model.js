import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    home: {
      sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
    },
  },
  { timestamps: true }
);

export const templateModel = mongoose.model("Template", templateSchema);
