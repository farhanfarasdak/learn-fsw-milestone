exports.validateAdmin = (req, res, next) => {
  if(req.user.role === 'admin'){
    next()
  }else{
    res.status(401).send('You dont have permission to access this')
  }
}

exports.validateNormal = (req, res, next) => {
  if(req.user.role === 'normal'){
    next()
  }else{
    res.status(401).send('You dont have permission to access this')
  }
}