import { useState, useEffect } from 'react';
import { Badge } from '@mantine/core';

export default function HeroPlayerStats() {
    const Images = ['/hero2.png', '/image.png', '/image2.png', '/nightgta.png']
    const [currentImage, setCurrentImage] = useState(0);
    const [serverStatus, setServerStatus] = useState({
        hostname: '',
        online: false,
        players: { count: 0, slots: 128 },
    });

  useEffect(() => {
    async function fetchServerStatus() {
        try {
            const response = await fetch('https://fivemapigo-production.up.railway.app/l957mj');
            const data = await response.json();
            setServerStatus({
                hostname: data.hostname,
                online: data.online,
                players: { count: data.players.count, slots: data.slots },
            });
        } catch (error) {
            console.error('Failed to fetch server status or update bot:', error);
        }
    }

    fetchServerStatus();
    }, []);

    useEffect(() => {
        // Opdater baggrundsbilledet hvert 5. sekund
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % Images.length);
        }, 5000); // Skift hvert 5. sekund

        return () => clearInterval(interval); // Ryd op når komponenten unmountes
    }, [Images.length]);

  return (
    <div className='flex justify-center w-full h-[30rem] bg-cover bg-center self-center duration-300' style={{ backgroundImage: `url(${Images[currentImage]})` }} >
      <div className='flex justify-center flex-col gap-y-2 text-center'>
        <img src="src/assets/logo.png" className='h-20 w-20 box-border self-center' alt="Server Logo" />
        <div className='text-center text-white mx-[30%]'>
            <p>Stedet hvor fantasier bliver til virkelighed, og hvor fællesskabet er i fokus. Vi er i fuld gang
            med at skabe en unik RP-oplevelse, og vi glæder os til at dele den med dig! 🚀</p>
        </div>
        <div className='flex justify-center'>
            <Badge variant="light" color={serverStatus.online ? 'green' : 'red'}>
            {serverStatus.online ? 'SERVEREN ER ONLINE' : 'SERVEREN ER OFFLINE'}
            </Badge>
        </div>
        <span className='font-bold text-white text-sm'>
        Spillere: {serverStatus.players.count}/{serverStatus.players.slots}
        </span>
      </div>
    </div>
  );
}
