const mongoose = require('mongoose')
const mongodbPassword = "QjquRiTy4Wl54c6k"
const dbURL = `mongodb+srv://FoodHunders:${mongodbPassword}@foodhunds.fnuzimy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbURL).then(() => {
    console.log('Database Connected');
}).catch((error) => {
    console.log("error occured",error)
})