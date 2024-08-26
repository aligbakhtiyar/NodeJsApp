const mongoose = require('mongoose');

const onlineSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  bannerImage: {
    imageLG: { type: String, required: true },
    imageSM: { type: String, required: true }
  },
  details: { type: String, required: true },
  curriculum: {
    courseCategories: [
      {
        count: { type: Number, required: true },
        name: { type: String, required: true }
      }
    ]
  },
  semesters: [
    {
      semester: { type: Number, required: true },
      courses: [
        {
          code: { type: String, required: true },
          name: { type: String, required: true },
          note: { type: String }
        }
      ]
    }
  ],
  graduates: [
    {
      image: { type: String, required: true },
      name: { type: String, required: true },
      batch: { type: String, required: true },
      companyLogo: { type: String, required: true },
      salary: { type: String, required: true }
    }
  ],
  achievers: [
    {
      image: { type: String, required: true },
      name: { type: String, required: true },
      position: { type: String, required: true },
      company: { type: String, required: true },
      program: { type: String, required: true }
    }
  ],
  studentsTalk: [
    {
      name: { type: String, required: true },
      course: { type: String, required: true },
      batch: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true }
    }
  ]
});

async function getOnlineModel(dbName) {
  const connection = await require("../db/conn")(dbName);
  return connection.model("Online", onlineSchema);
}

module.exports = getOnlineModel;
