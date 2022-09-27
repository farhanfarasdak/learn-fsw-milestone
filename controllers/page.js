// exports.adminDashboard = (req, res) => {  
//   console.log(req.user)
//   res.render('adminDashboard', { username: req.user.username })
// }

// exports.mainDashboard = (req, res) => {
//   console.log(req.user)
//   res.render('mainDashboard', { username: req.user.username })
// }

exports.login = (req, res) => {
  res.render('login')
}

exports.adminPage = (req, res) => {
  res.render('admin')
}