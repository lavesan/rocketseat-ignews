import * as Prismic from '@prismicio/client';

export function getPrismicClient() {
    const prismic = new Prismic.Client(
        process.env.PRISMIC_ENDPOINT,
        {
            accessToken: process.env.PRISMIC_API_TOKEN,
        }
    );

    return prismic;
}
