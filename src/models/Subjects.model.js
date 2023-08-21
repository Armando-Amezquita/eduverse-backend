const { Schema, model } = require("mongoose");

const subjectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "courses" }],
    collegues: [{ type: Schema.Types.ObjectId, ref: "collegues" }],
    students: [{ type: Schema.Types.ObjectId, ref: "users" }],
    teachers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    status: { type: String, required: true, trim: true, default: "active" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports =  model("Subjects", subjectSchema);