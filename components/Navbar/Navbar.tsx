import {
  createStyles,
  Navbar,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Title,
  Avatar,
  UnstyledButtonProps,
  ScrollArea,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBulb, IconNotebook, IconPlus, IconSelector } from '@tabler/icons';
import Link from 'next/link';

const useUserButtonStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    },

    '& > div': {
      gap: 0,
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, subtitle, icon, ...others }: UserButtonProps) {
  const { classes } = useUserButtonStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {subtitle}
          </Text>
        </div>

        <Avatar src={image} radius="xl" />
      </Group>
    </UnstyledButton>
  );
}

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
  },

  section: {
    marginBottom: theme.spacing.md,
  },

  logoSection: {
    height: 'var(--mantine-header-height)',

    '& h1': {
      fontSize: '1.5rem',
    },
  },

  userSection: {
    marginBottom: 0,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
  },

  sinopes: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  sinopesHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  sinopeLink: {
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.md,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: IconBulb, label: 'Notications', to: '/notifications' },
  { icon: IconNotebook, label: 'Drafts', to: '/drafts', notifications: 2 },
];

const sinopes = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
  { emoji: '👍', label: 'Salesa' },
  { emoji: '🚚', label: 'Deliveriesa' },
  { emoji: '💸', label: 'Discountsa' },
  { emoji: '💰', label: 'Profitsa' },
  { emoji: '✨', label: 'Reportsa' },
  { emoji: '🛒', label: 'Ordersa' },
  { emoji: '📅', label: 'Eventsa' },
  { emoji: '🙈', label: 'Debtsa' },
  { emoji: '💁‍♀️', label: 'Customersa' },
];

export function AppNavbar() {
  const { classes, cx } = useStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <span />;
  }

  const mainLinks = links.map((link) => (
    <Link href={link.to} passHref key={link.to}>
      <UnstyledButton key={link.label} component="a" className={classes.mainLink}>
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </div>
        {link.notifications && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    </Link>
  ));

  const sinopeLinks = sinopes.map((sinope) => (
    <Link
      href={`/sinope/${sinope.label.toLowerCase()}`}
      onClick={(event) => event.preventDefault()}
      key={sinope.label}
      passHref
    >
      <a className={classes.sinopeLink}>
        <span style={{ marginRight: 9, fontSize: 16 }}>{sinope.emoji}</span> {sinope.label}
      </a>
    </Link>
  ));

  return (
    <Navbar withBorder={false} height="100%" width={{ sm: 260 }} p={0} className={classes.navbar}>
      <Navbar.Section className={cx(classes.section, classes.logoSection)}>
        <Link passHref href="/">
          <a>
            <Title m="md" order={1} sx={{ color: 'initial' }}>
              Asopus
            </Title>
          </a>
        </Link>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      <Group className={classes.sinopesHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Sinopes
        </Text>
        <Tooltip withinPortal label="Create sinope" withArrow position="right">
          <ActionIcon variant="default" size={18}>
            <IconPlus size={12} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Navbar.Section grow component={ScrollArea} className={classes.section}>
        <div className={classes.sinopes}>{sinopeLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.userSection}>
        <UserButton
          image="https://avatars.githubusercontent.com/u/37307107?s=400&u=9781624b4af15eba4e5bcc84c34e7dcfab114ff4&v=4"
          name="Muhammed Ali CAN"
          subtitle="canpacis@gmail.com"
          icon={<IconSelector size={14} stroke={1.5} />}
        />
      </Navbar.Section>
    </Navbar>
  );
}
