//@desc Register new user
//@route GET/api/users
//@access public
const registerUser = (req,res)=>{
    res.json({message : 'Register User'})
}
//@desc Login user
//@route GET/api/users/login
//@access public
const loginUser = (req,res)=>{
    res.json({message : 'Login User'})
}
//@desc Get user data
//@route GET/api/users/me
//@access public
const getMe = (req,res)=>{
    res.json({message : 'User data display'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe

}