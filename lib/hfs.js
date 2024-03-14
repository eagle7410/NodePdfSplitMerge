const fs = require('node:fs/promises')
const {ByteInMB} = require('./constant')
const SizeIn = {
  MB : 'MB',
  KM : 'KB',

}

const fileSize = async (storePath, sizeIn = SizeIn.MB) => {
  let stat = await fs.stat(storePath)
  let size = stat.size

  switch (sizeIn) {
    case SizeIn.MB: 
      size = size / ByteInMB
      break;
  }

  return size


}

const fileExist = async (f) => {
    try {
        await fs.stat(f);
        return true;
      } catch {
        return false;
      }
}

module.exports = {
    SizeIn,
    fileExist,
    fileSize,
}