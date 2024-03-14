const ACTIONS = {
	SPLIT : 'SPLIT',
	MERGE : 'MERGE',
}

const Coefficient = 1024
const ByteInKB = Coefficient
const ByteInMB = ByteInKB * Coefficient

module.exports = {
    ByteInMB,
    ByteInKB,
    ACTIONS,   
}