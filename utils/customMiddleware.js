exports.validateSuperadmin = (req, res, next) => {
  if(req.user.role === 'Superadmin'){
    next()
  }else{
    res.status(401).send('You dont have permission to access this page')
  }
}