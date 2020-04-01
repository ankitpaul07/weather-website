const request=require('request');

const forecast=(latitude,longitude,callback)=>
{
    const url='https://api.darksky.net/forecast/f37640f8cb9106bce7ef06d1bbb1bc52/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si';
    request({ url , json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather service',undefined);
        }
        else if(body.error)
        {
            callback('Unable to find location',undefined);
        }
        else
        {
            callback(undefined,
                //  summary:body.daily.data[0].summary,
                //  temperature:body.currently.temperature,
                //  precip:body.currently.precipProbability,
                body.daily.data[0].summary+' It is '+body.currently.temperature+' degrees outside. '+body.currently.precipProbability*100+ ' percent chance of rain'
            );
        }
    })

}

module.exports=forecast;