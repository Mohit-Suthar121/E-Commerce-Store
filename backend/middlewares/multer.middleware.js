import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req,file,callback)=>{
    
    if(file.mimetype.startsWith('image/')){
        callback(null,true)
    }
    else{
        callback(new Error("Invalid file type. Only JPEG, PNG, and WebP images are allowed!"),false);
    }

}


export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 3 * 1024 * 1024 
    }


})





