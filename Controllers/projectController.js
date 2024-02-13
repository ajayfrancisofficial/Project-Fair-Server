const projects=require('../Models/projectModel')

//add project
exports.addProject=async(req,res)=>{
    console.log("inside add project api");
    const userId=req.payload
    console.log(userId); 
    const {title,languages,overview,github,website}=req.body
    const projectImage=req.file.filename
    try{
            const existingProject=await projects.findOne({github})
            if(existingProject){
                res.status(406).json("Project repository already exists!!! Please upload another")
            }
            else{
                //emtering into db
                const newProject=new projects({
                    title,languages,overview,github,website,projectImage,userId
                })
                await newProject.save()
                res.status(200).json(newProject)
            }
    }
    catch(err){
        res.status(401).json(err)
    }
    
}

//get home project(3 projects that should be displayed everytime)
exports.getHomeProject=async (req,res)=>{
    try{
        const homeProjects=await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

//get all projects
exports.getAllProject=async (req,res)=>{
    const searchKey=req.query.search
    const query={
        languages:{
            $regex:searchKey,$options:"i"
        }
    }
    try{
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

//get user projects
exports.getUserProject=async (req,res)=>{
    const userId=req.payload
    try{
        const userProjects=await projects.find({userId})
        res.status(200).json(userProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

//edit project
exports.editProject=async(req,res)=>{
    console.log("inside edit project");
    const {pid}=req.params
    const userId=req.payload
    const {title,languages,overview,github,website,projectImage}=req.body
    const uploadImage=req.file?req.file.filename:projectImage
    try{
        const updatedProject=await projects.findByIdAndUpdate({_id:pid},{
            title,languages,overview,github,website,projectImage:uploadImage,userId
        },{new:true})                // to save in mongoose
        await updatedProject.save()     //to save in db
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }
}

//remove project
exports.removeProject=async(req,res)=>{
    console.log("inside remove project");
    const {pid}=req.params
    try{
        const projectDetails=await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    }
    catch(err){
        res.status(401).json(err)
    }

}