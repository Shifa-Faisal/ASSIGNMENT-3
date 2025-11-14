let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
// connect to our hobby model
let Book = require('../model/book');
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
        const BookList = await Book.find();
        res.render('Hobbies/list',{
            title:'Hobbies',
            hobbyList:hobbyList,
            displayName: req.user?req.user.displayName:""
        })
    }
    catch(err)
    {
        console.log(err);
        res.render('Hobbies/list',
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
        res.render('Hobbies/add',{
            title:'Add Hobby',
            displayName: req.user?req.user.displayName:""
        });
    }
    catch(err)
    {
        console.log(err);
        res.render('Hobbies/list',
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
        let newBook = Book({
            "hobbyname":req.body.hobbyname,
            "category":req.body.category,
            "description":req.body.description,
            "averagecost":req.body.averagecost,
            "interactiontype":req.body.interactiontype
        })
        Book.create(newBook).then(()=>{
            res.redirect('/Hobbies')
        });
    }
     catch(err)
    {
        console.log(err);
        res.render('Hobbiess/list',
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
        const id = req.params.id;
        const hobbyToEdit = await Book.findById(id);
        res.render("Books/edit",
            {
                title: 'Edit Hobby',
                HobbyList: hobbyToEdit,
                displayName: req.user?req.user.displayName:""
            }
        )
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
        let id = req.params.id;
        let updateBook = Book({
            "_id":id,
            "hobbyname":req.body.hobbyname,
            "category":req.body.category,
            "description":req.body.description,
            "averagecost":req.body.averagecost,
            "interactiontype":req.body.interactiontype
        })
        Book.findByIdAndUpdate(id,updatehobby).then(()=>{
            res.redirect("/Hobbies")
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
        let id = req.params.id;
        hobby.deleteOne({_id:id}).then(()=>{
            res.redirect("/Hobbies")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
    
})
module.exports = router;