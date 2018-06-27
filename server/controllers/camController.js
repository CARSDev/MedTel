
module.exports = function addCamEndpointsTo(app) {
  app.get("/employee", getEmployee)
}

function getEmployee(req, res) {
  // console.log('backend hit')
  req.db.get_employee_info([req.user.employee_id])
    .then(info => {
      res.status(200).send(info);
    })
    .catch(() => {
      res.status(500).send();
    });
};
