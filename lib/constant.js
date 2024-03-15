const ACTIONS = {
	SPLIT : 'SPLIT',
	MERGE : 'MERGE',
}

const Coefficient = 1024
const ByteInKB = Coefficient
const ByteInMB = ByteInKB * Coefficient
const DirMerge = 'Merge'
const DirMergeResult = 'Ready'

module.exports = {
    DirMergeResult,
    DirMerge,
    ByteInMB,
    ByteInKB,
    ACTIONS,   
}