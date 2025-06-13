// Models
import { SectionModel } from "../../models/section.model.js";
import { templateModel } from "../../models/template.model.js";

// ---------------------------------- Template Controllers -------------------------------------

// ---------------------------------- Get Template ---------------------------------------------
export const getTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Template not found!",
      });
    }

    const template = await templateModel
      .findById(id)
      .populate("home.sections")
      .lean()
      .exec();

    if (!template) {
      return res.status(400).json({
        success: false,
        message: "Template not found!",
      });
    }

    return res.status(200).json({
      success: true,
      template,
    });
  } catch (error) {
    console.error("Error getting template:", error.message || error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

// ---------------------------------- Create Template ------------------------------------------
export const createTemplate = async (req, res) => {
  try {
    const { sections } = req.body;

    if (!sections || sections.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Number of sections must be greater than 0",
      });
    }

    const template = await templateModel.create({});
    if (!template) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while creating template",
      });
    }

    const sectionIds = await Promise.all(
      sections.map(async ({ _id, type, data }) => {
        const section = await SectionModel.create({
          type,
          data,
          template: _id,
        });
        return section._id;
      })
    );

    template.home.sections.push(...sectionIds);
    await template.save();

    return res.status(200).json({
      success: true,
      message: "Website created successfully",
    });
  } catch (error) {
    console.error("Error creating template:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

// ---------------------------------- Update Template ------------------------------------------
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { sectionsNewData, orderedSectionsIds } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Template id not valid!",
      });
    }

    if (orderedSectionsIds && orderedSectionsIds.length > 0) {
      await templateModel.findByIdAndUpdate(id, {
        $set: {
          "home.sections": orderedSectionsIds,
        },
      });
    }

    if (!sectionsNewData || sectionsNewData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "New data is invalid!",
      });
    }

    const filteredSectionData = sectionsNewData.filter(
      (el) => el && el._id && el.data
    );

    const bulkOps = filteredSectionData.map((el) => ({
      updateOne: {
        filter: { _id: el._id },
        update: { data: el.data },
        runValidators: true,
      },
    }));

    if (bulkOps.length > 0) {
      await SectionModel.bulkWrite(bulkOps);
    }

    return res.status(200).json({
      success: true,
      message: "Template updated successfully!",
    });
  } catch (error) {
    console.error("Error in updating template:", error.message || error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
