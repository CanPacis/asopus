import {
  ActionIcon,
  createStyles,
  Group,
  TextInput,
  TextInputProps,
  Tooltip,
  Text,
  useMantineTheme,
  ScrollArea,
  UnstyledButton,
  Avatar,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSearch, IconFilter, IconPlus, IconNotebook } from '@tabler/icons';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  sidebar: {
    width: 300,
    height: '100vh',
    marginTop: 'calc(var(--mantine-header-height, 0px) * -1)',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
    flexDirection: 'column',
    alignItems: 'start',
    gap: theme.spacing.md,
  },
  cta: {
    width: '100%',
    alignItems: 'center',
    padding: theme.spacing.md,
    paddingBottom: 4,
  },
  search: {
    maxWidth: 220,

    '& input': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },
  },
  motionsTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  motionList: {
    width: '100%',
    minHeight: 300,
    flex: 1,
  },
  motionListWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  motionLink: {
    display: 'flex',
    width: '100%',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.md,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,
    gap: theme.spacing.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.xs,
    },
  },
  motionLabel: {
    display: 'inline-block',
    width: 10,
    height: 10,
    pointerEvents: 'none',
    borderRadius: 10,
    backgroundColor: theme.colors.grape[5],
    aspectRatio: '1/1',
    marginTop: 4,
  },
  selectedMotion: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  red: {
    backgroundColor: theme.colors.red[5],
  },
  purple: {
    backgroundColor: theme.colors.grape[5],
  },
  teal: {
    backgroundColor: theme.colors.teal[5],
  },
  yellow: {
    backgroundColor: theme.colors.yellow[5],
  },
}));

function SidebarSearch(props: TextInputProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size={16} stroke={1.5} />}
      radius="xl"
      variant="filled"
      size="sm"
      rightSection={
        <ActionIcon size={28} radius="xl" color={theme.primaryColor} variant="subtle">
          <IconFilter size={16} stroke={1.5} />
        </ActionIcon>
      }
      placeholder="Search motions"
      rightSectionWidth={40}
      className={classes.search}
      {...props}
    />
  );
}
export interface Collaborator {
  name: string;
  avatar: string;
  color: string;
}

export interface MotionItem {
  id: string;
  title: string;
  excerpt: string;
  label: 'red' | 'purple' | 'teal' | 'yellow';
  modified?: Date;
  collaborators?: Collaborator[];
}

const motions: MotionItem[] = [
  {
    id: '1',
    title: 'Motion 1',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    label: 'red',
    modified: new Date(),
  },
  {
    id: '2',
    title: 'Motion 2',
    excerpt: 'Lorem ipsum dolor sit amet adipiscing elit.',
    label: 'purple',
  },
  {
    id: '3',
    title: 'Motion 3',
    excerpt: 'Lorem ipsum dolor sit amet, consec adipiscing elit.',
    label: 'teal',
    modified: new Date(),
  },
  {
    id: '4',
    title: 'Motion 1',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    label: 'red',
    collaborators: [
      { name: 'Lorem', color: 'blue', avatar: 'https://i.pravatar.cc/300' },
      { name: 'Ipsum', color: 'blue', avatar: 'https://i.pravatar.cc/300' },
      { name: 'Dolor', color: 'blue', avatar: 'https://i.pravatar.cc/300' },
    ],
  },
  {
    id: '5',
    title: 'Motion 2',
    excerpt: 'Lorem ipsum dolor sit amet adipiscing elit.',
    label: 'purple',
  },
  {
    id: '6',
    title: 'Motion 3',
    excerpt: 'Lorem ipsum dolor sit amet, consec adipiscing elit.',
    label: 'teal',
    modified: new Date(),
  },
  {
    id: '7',
    title: 'Motion 1',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    label: 'red',
    collaborators: [
      { name: 'Lorem', color: 'blue', avatar: 'https://i.pravatar.cc/300' },
      { name: 'Dolor', color: 'blue', avatar: 'https://i.pravatar.cc/300' },
    ],
  },
  {
    id: '8',
    title: 'Motion 2',
    excerpt: 'Lorem ipsum dolor sit amet adipiscing elit.',
    label: 'purple',
  },
  {
    id: '9',
    title: 'Motion 3',
    excerpt: 'Lorem ipsum dolor sit amet, consec adipiscing elit.',
    label: 'teal',
  },
];

export function Sidebar() {
  const { classes, cx } = useStyles();
  const [selectedMotion, setSelectedMotion] = useState<string | null>(null);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <span />;
  }

  const motionLinks = motions.map((motion) => (
    <UnstyledButton
      onClick={() => setSelectedMotion(motion.id)}
      key={motion.id}
      className={cx(classes.motionLink, motion.id === selectedMotion ? classes.selectedMotion : '')}
    >
      <span className={cx(classes.motionLabel, classes[motion.label])} />
      <div>
        <div>
          <Text>{motion.title}</Text>
          <Text color="dimmed">{motion.excerpt}</Text>
        </div>
        {motion.modified && (
          <Text color={theme.primaryColor}>Last edited {motion.modified.toLocaleDateString()}</Text>
        )}
        {motion.collaborators && motion.collaborators.length > 0 && (
          <Avatar.Group spacing="xs">
            {motion.collaborators.map((collaborator, i) => (
              <Tooltip key={i} label={collaborator.name}>
                <Avatar size="sm" src={collaborator.avatar} radius="xl" />
              </Tooltip>
            ))}
          </Avatar.Group>
        )}
      </div>
    </UnstyledButton>
  ));

  return (
    <Group className={classes.sidebar}>
      <Group className={classes.cta}>
        <SidebarSearch />
        <Tooltip label="Create motion" position="bottom">
          <ActionIcon radius="xl" size={32} variant="filled" color={theme.primaryColor}>
            <IconPlus size={16} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Text className={classes.motionsTitle} size="sm" weight={500}>
        <IconNotebook stroke={1.5} />
        Motions
      </Text>
      <Group className={classes.motionList}>
        <ScrollArea sx={{ height: '100%', width: '100%' }}>
          <div className={classes.motionListWrapper}>{motionLinks}</div>
        </ScrollArea>
      </Group>
    </Group>
  );
}
