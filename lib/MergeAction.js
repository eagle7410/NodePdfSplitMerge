const PDFDocument = require('pdf-lib').PDFDocument
const fs = require('node:fs/promises')
const path = require('node:path')
const {DirMerge, DirMergeResult} = require('./constant')

class MergeAction {
    #PdfDoc
    LogShift
    CountPage
    PathLoad
    PathResult

    constructor (env) {
        this.env = env
    }

    async #init() {
        this.#PdfDoc = await PDFDocument.create()
        this.CountPage = 0;
        this.PathLoad    = path.join(this.env.WorkDir, DirMerge) 
        this.PathResult  = path.join(this.env.WorkDir, DirMergeResult, this.env.params.FileName) 
    }

    async doit() {

        this.LogShift = '--';

        this.log('Run doit')

        await this.#init()

        this.LogShift = '----';

        for (const filename of await fs.readdir(this.PathLoad)) {
            this.log('Process file: ' + filename)
            await this.addFile(filename)
        }
        this.LogShift = '--';

        this.log('Save result to ' + this.PathResult)

        await fs.writeFile(this.PathResult, await this.#PdfDoc.save());
        
        this.log('Done doit')
    }

    async addFile(fileName) {
        const pathFile = path.join(this.PathLoad, fileName)
        const PdfPart = await PDFDocument.load( await fs.readFile(pathFile) )

        for (let i = 0; i < PdfPart.getPages().length; i++) {
            const [copiedPage] = await this.#PdfDoc.copyPages(PdfPart, [i])

            this.#PdfDoc.addPage(copiedPage);
        }
    }

    log(mess, type ='Info') {
        console.log(`${this.LogShift}[${type}] ${mess}`)
    }
}

module.exports = MergeAction