const fs = require('fs')
const { google } = require('googleapis')

const GOOGLE_API_FOLDER_ID = '1sqB8xb2pGpYqI9fJbaSJbCrq_oZKZLpM'
var filepath='../bitbu.zip'
var filename='bitbu.zip'
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
