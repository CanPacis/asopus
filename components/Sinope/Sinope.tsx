import { Avatar, createStyles, Group, Title, Tooltip } from '@mantine/core';
import dynamic from 'next/dynamic';
import { Sidebar } from './Sidebar';

const NoSsrEditor = dynamic(() => import('./Editor'), { ssr: false });

const collaborators = [
  { name: 'Lorem', color: 'blue', avatar: 'https://i.pravatar.cc/300' },
  { name: 'Ipsum', color: 'blue', avatar: 'https://i.pravatar.cc/300' },
  { name: 'Dolor', color: 'blue', avatar: 'https://i.pravatar.cc/300' },
];

const useStyles = createStyles((theme) => ({
  container: {
    gap: 0,
    alignItems: 'start',
  },
  editorWrapper: {
    flex: 1,
    flexGrow: '1 !important' as unknown as number,
    height: '80vh',
  },
  motionMeta: {
    padding: theme.spacing.md,
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export interface SinopeProps {
  id: string;
}

export function Sinope(props: SinopeProps) {
  const { classes } = useStyles();

  return (
    <Group className={classes.container}>
      <Sidebar />
      <div className={classes.editorWrapper}>
        <div className={classes.motionMeta}>
          <Title order={2}>Motion 1</Title>

          <Avatar.Group spacing="xs">
            {collaborators.map((collaborator, i) => (
              <Tooltip key={i} label={collaborator.name}>
                <Avatar size="md" src={collaborator.avatar} radius="xl" />
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
        <NoSsrEditor id={props.id} />
      </div>
    </Group>
  );
}
