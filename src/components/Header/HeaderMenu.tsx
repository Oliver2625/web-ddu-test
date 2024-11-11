import { Menu, Group, Center, Burger, Container, Button  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown  } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';

const links = [
  { link: '/', label: 'Forside' },
  { link: '/rules', label: 'Regler' },
  { link: '/contact', label: 'Kontakt' },
  {
    link: '#1',
    label: 'Ansøgnigner',
    links: [
      { link: '/whitelist', label: 'Whitelist' },
    ],
  },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className='hover:bg-neutral-600 hover:bg-opacity-25 px-3 py-[0.1rem] rounded'
              onClick={(event) => event.preventDefault()}
            >
              <Center className='gap-2'>
                <span>{link.label}</span>
                <IconChevronDown size="1rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className='hover:bg-neutral-600 hover:bg-opacity-25 text-center px-3 py-[0.1rem] rounded'
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <div className='border-b border-neutral-600'>
      <Container size="md">
        <div className={classes.inner}>
            <img src="src\assets\logo.png" className='w-14 h-14' />
          <Group gap={40} visibleFrom="sm">
            {items}
          </Group>
          <Button variant="light" radius="xs">Login</Button>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
      </div>
    </header>
  );
}