This is a [Next.js](https://nextjs.org/) project i made for training.

## How to run

Set enviroment variables in .env.local file in the root of the project:

```bash
EMAIL_SERVER_USER= <Write you string here>
EMAIL_SERVER_PASSWORD= <Write you string here>
EMAIL_SERVER_HOST= <Write you string here>
EMAIL_SERVER_PORT= <Write you string here>
EMAIL_FROM= <Write you string here>

NEXTAUTH_SECRET=<Write_any_long_string>
NEXTAUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=<Write you string here>
GITHUB_CLIENT_SECRET=<Write you string here>

MONGODB_URI = <Write you string here>
```

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
