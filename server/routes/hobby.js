let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
// Connect to our hobby model
let hobby = require('../model/hobby');

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}


// GET route for displaying the data from DB --> Read Operation
router.get('/',async(req,res,next)=>{
    try{
        const hobbyList = await hobby.find();
        res.render('hobby/list',{
            title:'Hobbies',
            hobbyList:hobbyList,

        })
    }
    catch(err)
    {
        console.log(err);
        res.render('hobby/list',
            {
                error:'Error on the Server'
            }
        )
    }
});
// GET route for displaying the Add Page --> Create Operation
router.get('/add',async(req,res,next)=>{
    try
    {
        res.render('hobby/add',{
            title:'Add Hobby'
        });
    }
    catch(err)
    {
        console.log(err);
        res.render('hobby/list',
            {
                error:'Error on the Server'
            }
        )
    }
})
// POST route for processing the Add Page --> Create Operation
router.post('/add',async(req,res,next)=>{
    try
    {
        // Create a new hobby object
        let newhobby = hobby({
            "hobbyname":req.body.hobbyname,
            "category":req.body.category,
            "description":req.body.description,
            "averagecost":req.body.averagecost,
            "interactiontype":req.body.interactiontype,
            "starsofjoyrating":req.body.starsofjoyrating })
        hobby.create(newhobby).then(()=>{
            res.redirect('/hobby')
        });
    }
     catch(err)
    {
        console.log(err);
        res.render('hobby/list',
            {
                error:'Error on the Server'
            }
        )
    }
})
// GET route for displaying the Edit Page --> Update Operation
router.get('/edit/:id',async(req,res,next)=>{
    try
    {
        // Get the id
        const id = req.params.id;
        const hobbyToEdit = await hobby.findById(id);
        res.render("hobby/edit", {
            displayName: req.user ? req.user.displayName : "",
            title: 'Edit Hobby',
            hobby: hobbyToEdit
        });
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})
// POST route for processing the Edit Page --> Update Operation
router.post('/edit/:id',async(req,res,next)=>{
    try{
        // Edit the data id
        let id = req.params.id;
        let updatehobby = hobby({
            "_id":id,
            "hobbyname":req.body.hobbyname,
            "category":req.body.category,
            "description":req.body.description,
            "averagecost":req.body.averagecost,
            "interactiontype":req.body.interactiontype,
            "starsofjoyrating":req.body.starsofjoyrating
        })
        hobby.findByIdAndUpdate(id,updatehobby).then(()=>{
            res.redirect("/hobby")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }

})
// GET route to perform Delete Operation
router.get('/delete/:id',async(req,res,next)=>{
    try{
        // Delete the data id
        let id = req.params.id;
        hobby.deleteOne({_id:id}).then(()=>{
            res.redirect("/hobby");
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
    
})
module.exports = router;
