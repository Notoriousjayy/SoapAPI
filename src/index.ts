import soapRequest from 'easy-soap-request';
import fs from 'fs';
import xml2js from 'xml2js';
import { transform, prettyPrint } from 'camaro';

const url =
    'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso';

const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: '', // this is optional. required for http 1.1
};

const xml = fs.readFileSync('../test/request.xml', 'utf-8');

const template = [
    'soap:Envelope/soap:Body/m:ListOfContinentsByNameResponse/m:ListOfContinentsByNameResult/m:tContinent',
    {
        sName: 'm:sName',
    },
];

// usage of module
(async () => {
    const { response } = await soapRequest({
        url: url,
        headers: sampleHeaders,
        xml: xml,
        timeout: 1000,
    }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    const json = JSON.stringify(body, null, 4);
    const result = await transform(body, template);
    console.log(result);
})();
