import jwt from 'jsonwebtoken';

const middleWare=(req,res,next)=> {

    const token=req.headers.Authorization.split(" ")[1];
    let decodedData;
    try {
        if(token && token.length<500) {
            decodedData=jwt.verify(token,'secret');
            req.userId=decodedData?.id;
        }else {
            decodedData=jwt.decode(token);
            req.userId=decodedData.sub;
        }
        next();

    } catch (error) {
        console,log(error);
    }
}

export default middleWare;