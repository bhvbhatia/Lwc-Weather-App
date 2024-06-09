public class WeatherApiController {
    @AuraEnabled
    public static String getWeatherData(String city){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:WeatherApiNamedCred/current.json?q='+EncodingUtil.urlEncode(city,'UTF-8'));
        req.setMethod('GET');
        HttpResponse res = new HttpResponse();
        Http http = new Http();
        res = http.send(req);
        System.debug('data=> '+res.getBody());
        return res.getBody();
    }
}