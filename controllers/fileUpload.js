const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localFileUpload -> handler function

exports.localFileUpload = async (req,res) => {
    try{

        // fetch file  from request

        const file = req.files.file;
        console.log("File is here" , file);

        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH ->" , path)

        // add path to the move function
        file.mv(path , (err) => {
            console.log(err);
        });

        // create a successful response
        res.json({
            success:true,
            message:"Local file Upload Successfully",
        });

    }catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    colsole.log("temp file path". file.tempFilePath);
    
    if(quality){
        options.quality = quality;
    }
    
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options );
}

// image upload ka handler

exports.imageUpload = async (req,res) => {
    try{
        //data fetch 
        const {name , tags , email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg","jpeg","png","txt"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type : ", fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // file format supported hai

        const response = await uploadFileToCloudinary(file,"myDummyFolder");
        console.log(response);
        console.log(response.secure_url);

        // db me entry save krni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uploaded Successfully",
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Somthing went wrong'
        })
    }
}

// video upload ka handler

exports.videoUpload = async (req,res) => {
    try {
        // data fetch
        const {name , tags , email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;

        //Validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type : ", fileType);
  
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

                // file format supported hai
        const response = await uploadFileToCloudinary(file,"myDummyFolder");
        console.log(response);

          // db me entry save krni hai

          const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        // response send 
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video Uploaded Successfully",
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}

// imageSizeReducer

exports.imageSizeReducer = async (req,res) => {
    try{
        //data fetch 
        const {name , tags , email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg","jpeg","png","txt"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type : ", fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // file format supported hai

        const response = await uploadFileToCloudinary(file,"myDummyFolder",30);
        console.log(response);
        console.log(response.secure_url);

        // db me entry save krni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uploaded Successfully",
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Somthing went wrong'
        })
    }
}