const httpError = (res, err,mgs) =>{
    console.log(err,mgs);
    res.status(err);
    res.send({error:mgs});
}
module.exports = {httpError}