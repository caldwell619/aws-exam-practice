const fs = require('fs-extra')

const loadJson = async (originalFilePath, targetFilePath) => { 
  try { 
    const originalJson = await fs.readJson(originalFilePath)
    const jsonToBeMerged = await fs.readJson(targetFilePath)
    return {
      originalJson,
      jsonToBeMerged
    }
  } catch (err) { 
    console.error(err) 
  }
}
// path is the swagger property inside of the `paths` property
const mergeJson = (originalJson, jsonToBeMerged) => {
  const pathName = Object.keys(jsonToBeMerged)[0]
  const typeOfMethod = Object.keys(jsonToBeMerged[pathName])[0]
  const definitionName = Object.keys(jsonToBeMerged)[1]
  try {
    if(!originalJson.paths[pathName]){
      originalJson.paths[pathName] = {}
    }
    originalJson.paths[pathName][typeOfMethod] = jsonToBeMerged[pathName][typeOfMethod]
    if(definitionName){
      originalJson.definitions[definitionName] = jsonToBeMerged[definitionName]
    }
    return originalJson
  } catch(error){
    console.log('error', error)
    process.exit(1)
  }
}

const write = async (objectToWrite, writeToFilePath) =>{
  try {
    await fs.writeJson(writeToFilePath, objectToWrite)
  } catch (err) {
    console.error(err)
  }
}

exports.merge = async (originalFilePath, targetFilePath, writeToFilePath) => {
  try {
    const { originalJson, jsonToBeMerged } = await loadJson(originalFilePath, targetFilePath)
    const jsonToBeWritten = mergeJson(originalJson, jsonToBeMerged)
    write(jsonToBeWritten, writeToFilePath)
  } catch (error) {
    throw new Error('error inside of merge', error)
  }
}