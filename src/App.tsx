import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import getKlinesApi from './services/api';
import useWebSocket  from 'react-use-websocket';

interface Candles {
  openTime: number, 
  open: string, 
  high: string, 
  low: string, 
  close: string
}

const App: React.FC = () => {
  const [candles, setCandles] = useState<Candles[]>([])
  
  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/BTCUSDT@kline_1m`, {
    onOpen: () => {
      console.log('Connected to App WS')
    },
    onMessage: (event) => {
      console.log('message =>', event, lastJsonMessage)
    },
    onError: (event) => { console.error(event); },
    shouldReconnect: () => true,
    reconnectInterval: 3000
  });

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async () => {
    const result = await getKlinesApi({
      symbol: 'BTCUSDT',
      interval: '1m'
    })

    if(result?.length > 0) {
      setCandles(result)
    }   
  }

  const series = candles?.map(candle => ({
    data: [{
      name: '',
      x: new Date(candle?.openTime),
      y: [
        parseFloat(candle?.open), 
        parseFloat(candle?.high), 
        parseFloat(candle?.low), 
        parseFloat(candle?.close)
      ]
    }]
  }))
    
  return (
    <div style={{ 
      display: 'flex', 
      width: '100%', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center'
    }}>
      <Chart series={series} />
    </div>
  )
}

export default App
