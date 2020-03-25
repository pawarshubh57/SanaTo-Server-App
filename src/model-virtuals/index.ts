
const projectMasterVirtuals = {
    path: "ProjectMaster",
    value: {
        from: "ProjectMaster",
        localField: "ProjectId",
        foreignField: "_id",
        as: "ProjectMaster",
        ref: "ProjectMaster",
        autopopulate: true,
        justOne: true
    },
    // fields: [""],
    unWind: true
};

const fileMasterVirtuals = {
    path: "FileMaster",
    value: {
        from: "FileMaster",
        localField: "FileId",
        foreignField: "_id",
        as: "FileMaster", 
        ref: "FileMaster",
        autopopulate: true,
        justOne: true
    },
    // fields: [""],
    unWind: true,
    fields: ["_id", "FileId", "ProjectId", "FileTypeMasterId", "FileName", "FileNameWithoutExt", "WorkFlowStatus", "ProjectMaster", "FileTypeExtensionMaster"]
};

export {
    projectMasterVirtuals,
    fileMasterVirtuals,
};