#!/bin/bash
echo Enter the path of your folder?
read folder
echo What should be zip file name?
read name
sudo zip -r ${name}.zip ${folder} -x "${folder}/node_modules/*"
sed -i "/filepath=/c\var filepath='../$name.zip'" ./gwork/app.js
sed -i "/filename=/c\var filename='$name.zip'" ./gwork/app.js

cd ./gwork && node app.js && cd ..
