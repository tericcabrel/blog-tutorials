import { APIGatewayProxyHandler } from 'aws-lambda';
import { getTimeZones } from "@vvo/tzdb";
import { utcToZonedTime, format } from 'date-fns-tz';

export const handler: APIGatewayProxyHandler = async (event) => {
  const country = 'United States'

  const timeZone = getTimeZones().find((timeZone) => timeZone.countryName === country);

  if (!timeZone) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify({ message: "Timezone not found for this country!" })
    };
  }

  const zonedDate = utcToZonedTime(new Date(), timeZone.name)
  const pattern = 'dd-MM-yyyy HH:mm:ss.SSS \'GMT\' XXX (z)'
  const output = format(zonedDate, pattern, { timeZone: timeZone.name })

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({ time: output })
  };
};
