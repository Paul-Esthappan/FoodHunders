const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require("../models/userSchema");

//@dec POST new data
//@route POST /api/signup
//@acess public
const postCreateDetails = async (req, res) => {
  try {
   
    const { username, email, password, phonenumber, dob, gender, country, image } = req.body;
    const isExistUser = await user.findOne({ email });

    if (!username || !email || !phonenumber || !dob || !gender || !country) {
      res.status(400);
      throw new Error("All fields are required");
    } else if (isExistUser) {
      res.status(400).send("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userdetails = new user({
        username,
        email,
        phonenumber,
        dob,
        gender,
        country,
        image,
        password: hashedPassword,
      });

      await userdetails.save();

 
      return res.status(200).send("User Registered. Please login to continue");
    }
  } catch (error) {
    console.error("Error occurred", error);
    res.status(400).send("Error occurred: " + error.message);
  }
};



//@dec POST new data
//@route POST /api/signin
//@acess public


const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const userdata = await user.findOne({ email });

    if (!userdata) {
      return res.status(401).send("Email or Username is invalid");
    }

    const isPasswordValid = await bcrypt.compare(password, userdata.password);
    console.log("userdatapsw-",userdata.password,"pswws",password,"ispswalid",isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).send("Password is invalid");
    }

    // Exclude password from the user data before sending the response
    const userWithoutPassword = {
      _id: userdata._id,
      username: userdata.username,
      email: userdata.email,
      phonenumber: userdata.phonenumber,
      dob: userdata.dob,
      gender: userdata.gender,
      country: userdata.country,
      image: userdata.image,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
      console.error("JWT secret key not found");
      return res.status(500).send("Internal Server Error");
    }

    jwt.sign(userWithoutPassword, JWT_SECRET_KEY, { expiresIn: 186400 }, (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        res.status(500).send("Internal Server Error");
      } else {
        // Send the token in the response
        res.status(200).json({ user: userWithoutPassword, token });
        console.log(userWithoutPassword);
      }
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).send("Internal Server Error");
  }
};


//@dec POST new data
//@route POST /api/google
//@acess public

const googleAuth = async (req, res, next) => {
  try {
    const userdata = await user.findOne({ email: req.body.email });
    if (userdata) {
      const userWithoutPassword = {
        _id: userdata._id,
        username: userdata.username,
        email: userdata.email,
        phonenumber: userdata.phonenumber,
        dob: userdata.dob,
        gender: userdata.gender,
        country: userdata.country,
        image: userdata.image,
      };
    }
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (userdata) {
      if (!JWT_SECRET_KEY) {
      console.error("JWT secret key not found");
      return res.status(500).send("Internal Server Error");
    }

    jwt.sign(userWithoutPassword, JWT_SECRET_KEY, { expiresIn: 86400 }, (err, token) => {
  if (err) {
    console.error("Error signing JWT:", err);
    res.status(500).send("Internal Server Error");
  } else {
    // Send the token in the response
    res.status(200).json({ user: userWithoutPassword, token });
    console.log(userWithoutPassword);
  }
});
    }
    else {
      const newuser = new user({
        ...req.body,fromGoogle:true
      })
      const savedUser = await newuser.save()
      const userWithoutPassword = {
      username: savedUser.username,
      email: savedUser.email,
      phonenumber: savedUser.phonenumber,
      dob: savedUser.dob,
      gender: savedUser.gender,
      country: savedUser.country,
      image: savedUser.image,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (newuser) {
      if (!JWT_SECRET_KEY) {
      console.error("JWT secret key not found");
      return res.status(500).send("Internal Server Error");
    }

    jwt.sign(userWithoutPassword, JWT_SECRET_KEY, { expiresIn: 86400 }, (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        res.status(500).send("Internal Server Error");
      } else {
        // Send the token in the response
        res.status(200).json({ user: userWithoutPassword, token });
        console.log(userWithoutPassword);
      }
    });
    }
    }
  } catch (error) {
    next(error)
  }
}
    
module.exports = {  postCreateDetails, loginuser, googleAuth }