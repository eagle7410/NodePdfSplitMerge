const fs = require('node:fs/promises')
const path = require('node:path')
const PDFDocument = require('pdf-lib').PDFDocument;
const {fileExist, fileSize} = require('./hfs');

class SplitFile {
    IsRoot
    DirStore
    OriginName
    TargetName
    LogShift
    MaxSizeMB
    StoreSave
    Pages

    #PdfDoc
    DirSave

    set originName(value) {
        this.OriginName = value
        this.TargetName = value.replaceAll(' ', '_')
    }

    set DirSave (value) {
        this.DirSave = value
    }

    get dirSave () {
        return path.join(this.StoreSave, this.DirSave)
    }
    get fileExt ()  {
        return path.extname(this.TargetName)
    }

    async #initSplit() {
        if (this.IsRoot) {
            this.DirSave = this.TargetName.replace( this.fileExt, '');
    
            if (! await fileExist(this.dirSave))
                await fs.mkdir(this.dirSave)

        }
        
        const PdfData = await fs.readFile(path.join(this.DirStore, this.OriginName))

        this.#PdfDoc = await PDFDocument.load(PdfData)
    }

    async split() {
        await this.#initSplit()
        
        const len = this.#PdfDoc.getPages().length;
        const countFull = ~~(len / this.Pages)
        const last = len - (countFull * this.Pages)

        let start, end, countPages = 0;

        while (countPages < (countFull)) {
            start = countPages * this.Pages;
            end = start + this.Pages
            
            await this.savePages(start, end, countPages)
            countPages++
        }

        if (last > 0) {
            await this.savePages(end, end + last, countPages)            
        }

    }
    
    async savePages(start, end, part) {

        this.log(`Try get part ${part}: start ${start} -> end ${end}`)

        let partSave = this.fileSave(part)
        const subDocument = await PDFDocument.create();
        
        let i;
        for (i = start; i< end; ++i) {
            const [copiedPage] = await subDocument.copyPages(this.#PdfDoc, [i])

            subDocument.addPage(copiedPage);
        }
        const pdfBytes = await subDocument.save();
        await fs.writeFile(partSave, pdfBytes);

        this.log(`Save ${partSave}`)

        let sizeMB = await fileSize(partSave)

        if (sizeMB >= this.MaxSizeMB) {

            let file = new SplitFile

            file.IsRoot      = false
            file.LogShift    = this.LogShift + '--'
            file.MaxSizeMB   = this.MaxSizeMB
            file.Pages       = ~~(this.Pages / 2)

            file.originName  = this.fileName(part)

            file.StoreSave   = this.StoreSave
            file.DirSave     = this.DirSave + ''
            file.DirStore    = this.dirSave 

            await file.split()

            await fs.unlink(partSave)
        }
        
    }
    
    fileName(part) {
        return this.TargetName.replace( this.fileExt, '') + '-'  + part + this.fileExt
    }

    fileSave(part) {
        return path.join(this.dirSave, this.fileName(part))
    }

    log(mess, type ='Info') {
        console.log(`${this.LogShift}[${type}] ${mess}`)
    }
}

module.exports = SplitFile

