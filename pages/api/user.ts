import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'util/session';
import { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  isLoggedIn: boolean;
  id: string;
  email: string;
  username: string;
  name: string;
  verified: boolean;
  avatar: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({
      isLoggedIn: false,
      id: '',
      email: '',
      username: '',
      name: '',
      verified: false,
      avatar: '',
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
