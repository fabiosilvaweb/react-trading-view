import axios from 'axios';

interface GetKlinesApiRequest {
  symbol: string
  interval: string
}

const getKlinesApi = async ({ symbol,interval }: GetKlinesApiRequest) => {
  const response = await axios.get(`http://localhost:3333/klines?symbol=${symbol}&interval=${interval}`);

  return response?.data
}

export default getKlinesApi