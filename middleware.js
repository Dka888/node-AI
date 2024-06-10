export const identifyData = (req, res, next) => {
    const {url, textLong } = req.body;
    
    if(!url) {
      return res.status(400).send('Please send an URL')
    }

    if(Number(textLong) < 3) {
        return res.status(400).send('Returning text should have least 3 sentences!')
    }

    if(Number(textLong) > 15) {
        return res.status(400).send('Returning text should have maximum 15 sentences!')
    }

    next();
}