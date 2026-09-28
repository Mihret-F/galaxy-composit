import { createRequire } from 'node:module';
import type { Request, Response } from 'express';

const require = createRequire(import.meta.url);
const { handleVercelRequest } = require('../../dist/server.cjs') as {
  handleVercelRequest: (req: Request, res: Response) => Promise<unknown>;
};

export default handleVercelRequest;
