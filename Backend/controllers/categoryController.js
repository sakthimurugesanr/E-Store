import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";


const createCategory =asyncHandler(async(req,res)=>{

    try {
        const {name} =req.body;
        if(!name){
            return res.json({error:"category name is required"});

        }

        const existingUser = await Category.findOne({name});
        if(existingUser){
            return res.json({error:"category already exists"})
        }
        const category = await Category({name}).save()
        res.json(category)
   } catch (error) {    
        console.log(error)
        return res.status(400).json(error);
        
        
    }
})

const updateByID = asyncHandler(async(req,res)=>{


    try {
        const {name} = req.body;
        const {categoryId} = req.params;

        const category = await Category.findOne({_id:categoryId})
        

        if(!category){
            res.status(404).json({error:"category not found"})
        }


        category.name = name ;

           const updatedCategory = await category.save();
            res.status(200).json(updatedCategory)  
            

        }
         catch (error) {
        console.log(error)
         res.status(500).json({error:"Inernel server error"});
        
    }
})

const deleteByID= asyncHandler(async(req,res)=>{

    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId)    

        res.status(200).json(removed);
    } catch (error) {
        console.log(error)
         res.status(400).json({error:"Inernel server error"});
        
    }

})

const listCategories =asyncHandler(async(req,res)=>{
    try {
            const all = await Category.find({});
           res.json(all);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
        
    }

})
const readCategory = asyncHandler(async(req,res)=>{

    try {
        const category = await Category.findById({_id:req.params.id});
        
        res.json(category);

        
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message)
        
        
    }
})
export {createCategory,updateByID,deleteByID,listCategories,readCategory}