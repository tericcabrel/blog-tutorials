import { APIGatewayProxyHandler } from 'aws-lambda';
import { getTimeZones } from "@vvo/tzdb";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const handler: APIGatewayProxyHandler = async (event) => {
  const country = process.env.COUNTRY;

  const timeZone = getTimeZones().find((timeZone) => timeZone.countryName === country);

  if (!timeZone) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify({ message: "Timezone not found for this country!" })
    };
  }

  const dayjsUtc = dayjs(new Date());
  const zonedDate = dayjsUtc.tz(timeZone.name)
  const pattern = 'DD-MM-YYYY HH:mm:ss.SSS Z';
  const output = zonedDate.format(pattern);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({ time: output })
  };
};