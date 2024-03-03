let msg = '"name" is required';
let status = 400;
if(err.message == msg){
   
    res.status(status).send({
        errors:[
            {
                field : "name",
                msg
            }
        ]
    })

}else if  (err.message =='"email" is required' ){
    msg = '"email" is required'
    res.status(status).send({
        errors:[
            {
                field : "email",
                msg
            }
        ]
    });
}else if (err.message == '"password" is required' ){
    msg = '"password" is required'
    res.status(400).send({
        errors:[
            {
                field : "password",
                msg
            }
        ]
    })
}
else{
    status = 500;
    msg = "Server error"
    res.status(status).send(msg);
}