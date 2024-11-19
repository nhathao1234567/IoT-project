module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        ngaynhan: String,
        gionhan: String,
        nhietdo: String,
        doam: String,
        ph: String,
        vitri: String
      },
      { timestamps: true }
    );

    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const CamBien = mongoose.model("cambien", schema);

    return CamBien;
  };