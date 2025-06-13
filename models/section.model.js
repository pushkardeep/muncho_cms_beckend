import mongoose from "mongoose";

// ---------------------------------- Base Section Schema ------------------------------------

const SectionBaseSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
  },
  { timestamps: true, discriminatorKey: "type" }
);

export const SectionModel = mongoose.model("Section", SectionBaseSchema);

// ----------------------------------------------------------------------------------------
// ---------------------------------- Extended Sections Schemas ---------------------------
// ---------------------------------- Nav Schema ------------------------------------------
const navbarSchema = SectionModel.discriminator(
  "Navbar",
  new mongoose.Schema({
    data: {
      logo: {
        src: { type: String, required: true },
        alt: { type: String }, // optional
      },
      links: {
        displayedLinks: [
          {
            lable: { type: String, required: true },
            link: { type: String, required: true },
          },
        ],
        menuLinks: [
          {
            lable: { type: String, required: true },
            link: { type: String, required: true },
          },
        ],
      },
    },
  })
);

// ---------------------------------- Hero Section Schema ------------------------------------
const heroSchema = SectionModel.discriminator(
  "Hero",
  new mongoose.Schema({
    data: {
      text: {
        title: { type: String, required: true },
        heroText: { type: String, require: true },
      },
      bg_image: {
        src: { type: String, required: true },
        alt: { type: String }, // optional
      },
    },
  })
);

// ---------------------------------- Gallery Section Schema ------------------------------------
const gallerySchema = SectionModel.discriminator(
  "Gallery",
  new mongoose.Schema({
    data: {
      headings: {
        heading: { type: String, required: true },
        subHeading: { type: String }, // optional
      },
      images: [
        {
          src: { type: String, required: true },
          alt: { type: String }, // optional
        },
      ],
    },
  })
);

// ---------------------------------- Catering Section Schema ------------------------------------
const cateringSchema = SectionModel.discriminator(
  "Catering",
  new mongoose.Schema({
    data: {
      text: {
        title: { type: String, required: true },
        description: { type: String }, // optional
      },
      images: {
        src: { type: String, required: true },
        alt: { type: String }, // optional
      },
    },
  })
);

// ---------------------------------- Dishes Section Schema ------------------------------------
const dishesSchema = SectionModel.discriminator(
  "Dishes",
  new mongoose.Schema({
    data: {
      heading: {
        title: { type: String, required: true },
        subtitle: { type: String }, // optional
      },
      dishes: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          image: {
            src: { type: String, required: true },
            alt: { type: String },
          },
        },
      ],
    },
  })
);

// ---------------------------------- Gift Card Section Schema ------------------------------------
const giftCardSchema = SectionModel.discriminator(
  "Gift_Card",
  new mongoose.Schema({
    data: {
      text: {
        title: { type: String, required: true },
        description: { type: String },
      },
      images: {
        src: { type: String, required: true },
        alt: { type: String }, // optional
      },
    },
  })
);

// ---------------------------------- Facts Section Schema ------------------------------------
const faqSchema = SectionModel.discriminator(
  "FAQ",
  new mongoose.Schema({
    data: {
      heading: {
        title: { type: String, required: true },
      },
      questions: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
    },
  })
);

// ---------------------------------- Location Section Schema ------------------------------------
const locationSchema = SectionModel.discriminator(
  "Location",
  new mongoose.Schema({
    data: {
      headings: {
        heading: { type: String, required: true },
      },
      locations: [
        {
          name: { type: String, required: true },
          city: { type: String, required: true },
          address: { type: String, required: true },
          phone: { type: String, required: true },
          email: { type: String, required: true },
          mapQuery: { type: String, required: true },
          longitude: { type: String, required: true },
          latitude: { type: String, required: true },
        },
      ],
    },
  })
);

// ---------------------------------- Footer Schema ------------------------------------
const footerSchema = SectionModel.discriminator(
  "Footer",
  new mongoose.Schema({
    data: {
      logo: {
        src: { type: String, required: true },
        alt: { type: String }, // optional
      },
      links: [
        {
          title: { type: String, required: true },
          link: { type: String, required: true },
        },
      ],
    },
  })
);

// ---------------------------------- Sections Schemas End -------------------------------------
// ---------------------------------------------------------------------------------------------
