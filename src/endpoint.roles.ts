import { Roles } from "./auth/role.decorator";

//TRAILER
const allTrailer = ['user','admin']
const getTrailer = ['user','admin']
const allTrailersWithSubprojectId = ['user','admin']
const assetsFromTrailer = ['user','admin']
const addTrailer = ['user','admin']
const deleteTrailer = ['admin']
const updateTrailer = ['user','admin']
const addAssetsToTrailer = ['user','admin']
const removeAssetFromTrailer = ['user','admin']

//SUBPROJECT
const allSubproject = ['user','admin']
const getSubproject = ['user','admin']
const addSubproject = ['user','admin']
const assetsFromSubproject = ['user','admin']
const trailersFromSubproject = ['user','admin']
const deleteSubproject = ['admin']
const updateSubproject = ['user','admin']
const addAssetsToSubproject =['user','admin']
const deleteAssetFromSubproject = ['user','admin']
const csvReaderOud = ['admin']
const uploadFile = ['user','admin']

//USERS
const allUsers = ['admin']
const giveAdmin = ['admin']

//PROJECT
const allProject = ['user','admin']
const getProject = ['user','admin']
const delProject = ['admin']
const updateProject = ['user','admin']
const addProject = ['user','admin']

//ASSET
const allAssets = ['user','admin']
const allAssetsNoContent = ['user','admin']
const getAsset = ['user','admin']
const updateAsset = ['user','admin']
const addAsset = ['user','admin']
const deleteAsset = ['admin']

export default{
    allTrailer,
    getTrailer,
    allTrailersWithSubprojectId,
    assetsFromTrailer,
    addTrailer,
    deleteTrailer,
    updateTrailer,
    addAssetsToTrailer,
    removeAssetFromTrailer,

    allUsers,
    giveAdmin,

    allProject,
    getProject,
    delProject,
    updateProject,
    addProject,

    allAssets,
    allAssetsNoContent,
    getAsset,
    updateAsset,
    addAsset,
    deleteAsset,

    allSubproject,
    getSubproject,
    addSubproject,
    assetsFromSubproject,
    trailersFromSubproject,
    deleteSubproject,
    updateSubproject,
    addAssetsToSubproject,
    deleteAssetFromSubproject,
    csvReaderOud,
    uploadFile

}