import '@mantine/core/styles.css';
import {MantineProvider, ActionIcon, useMantineColorScheme} from '@mantine/core';
import { HeaderMenu } from './components/Header/HeaderMenu';
import { IconSun, IconMoon } from '@tabler/icons-react';
import HeroPlayerStats from './components/Hero/HeroPlayerStats';

function App() {

  return (
    <MantineProvider>
      <SwitchMode />
      <HeaderMenu />
      <HeroPlayerStats />
    </MantineProvider>
  )
}

function SwitchMode() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='absolute px-1 py-[0.4rem]'>
      <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'light' ? (
        <IconMoon stroke={1.5} />
      ) : (
        <IconSun stroke={1.5} />
      )}
    </ActionIcon>
    </div>
  );
}

export default App
