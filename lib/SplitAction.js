const path = require('node:path')
const fs = require('node:fs/promises')
const SplitFile = require('./SplitFile')

class SplitAction {
    constructor (env) {
        this.env = env
        this.logShift = "----"
    }

    async doit() {
        const DirSplit = path.join(this.env.WorkDir, 'Store')
        const DirSave  = path.join(this.env.WorkDir, 'Split')

        for ( let filename of await fs.readdir(DirSplit) ) {

            console.log(`${this.logShift}[Info] Try split ${filename}`);

            const file = new SplitFile

            file.IsRoot      = true
            file.DirStore    = DirSplit
            file.LogShift    = this.logShift + '--'
            file.MaxSizeMB   = this.env.params.MaxSizeMB
            file.Pages       = this.env.params.Pages
            file.StoreSave   = DirSave    
            file.originName  = filename

            await file.split()
        }

    }
}

module.exports = SplitAction