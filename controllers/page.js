exports.login = (req, res) => {
  res.render('login')
}

exports.gmDashboard = async (req, res) => {
  res.render('gmDashboard')
}

exports.playerDashboard = (req, res) => {
  res.render('playerDashboard')
}