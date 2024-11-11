// HeaderMenu.tsx
import { Menu, Group, Center, Container, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';
import Logo from '/logo.png';
import { Link } from 'react-router-dom';

const links = [
  { link: '/', label: 'Forside' },
  { link: '/rules', label: 'Regler' }, // Link to rules
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
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component={Link} to={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <span className='hover:bg-neutral-600 hover:bg-opacity-25 px-3 py-[0.1rem] rounded text-base font-semibold'>
              <Center className='gap-2'>
                <span>{link.label}</span>
                <IconChevronDown size="1rem" stroke={1.5} />
              </Center>
            </span>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className='hover:bg-neutral-600 hover:bg-opacity-25 text-center px-3 py-[0.1rem] rounded text-base font-semibold'
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <div className='border-b border-neutral-600'>
        <Container size="md">
          <div className={classes.inner}>
            <img src={Logo} className='w-14 h-14' />
            <Group gap={40} visibleFrom="sm">
              {items}
            </Group>
            <Button variant="light" radius="xs">Login</Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
