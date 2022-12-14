const fs = require('fs')
const { google } = require('googleapis')

const GOOGLE_API_FOLDER_ID = 'FOLDER ID'
var filepath='../pillar.zip'
var filename='pillar.zip'
async function uploadFile(){
    try{
        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const driveService = google.drive({
            version: 'v3',
            auth
        })

        const fileMetaData = {
            'name': filename,
            'parents': [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'application/zip',
            body: fs.createReadStream(filepath)
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        
        return response.data.id

    }catch(err){
        console.log('Upload file error', err)
    }
}

uploadFile().then(data => {
    console.log(data)
    a="https://drive.google.com/uc?export=view&id="+data
    console.log(a)
    
})
