const mongoose = require('mongoose');


function validateColor(val){
    if (val.indexOf('#') ==0){
        return true;
    }
    else{
        return false;
    }
}

const budgetSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    color:{
        type: String,
        min: 6,
        required: true,
        validate: [validateColor, 'Not a color']
        
      
    }
    
}, {collection: 'budget'})
module.exports = mongoose.model('Budget', budgetSchema);
