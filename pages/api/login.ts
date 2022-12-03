import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'util/session';
import { backendClient } from 'util/backend';
import type { User } from './user';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;

  try {
    const authData = await backendClient.collection('users').authWithPassword(username, password);

    const user = {

      isLoggedIn: true,
      id: authData.record.id,
      email: authData.record.email,
      username: authData.record.username,
      name: authData.record.name,
      verified: authData.record.verfied,
      avatar: authData.record.avatar,
    } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
