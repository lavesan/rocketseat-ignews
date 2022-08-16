import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'teste' },
        { id: 2, name: 'teste 2' },
        { id: 3, name: 'teste 3' },
    ];

    return response.json(users);
}