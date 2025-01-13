This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-arnext-app`](https://github.com/weavedb/arnext).

## Getting Started

[NodeJS](https://nodejs.org) version 20+. (If you haven't yet installed it, check out [this page](https://nodejs.org/en/download/package-manager) to find instructions for your OS).

First, run the development server:

```bash
yarn
# or
yarn --ignore-engines

# then
yarn dev
# or
yarn arweave
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## ArNext + shadcn Reference

https://ui.shadcn.com/docs/installation/next

https://tailwindcss.com/docs/guides/nextjs

```bash
npx create-arnext-app@latest next-shadcn

cd next-shadcn

yarn add tailwindcss postcss autoprefixer --dev

npx tailwindcss init -p
```

edit `tailwind.config.js`

create `/styles/globals.css`

add import in `/pages/_app.js`

```javascript
import "@/styles/globals.css"
```

init shadcn and run app

```bash
npx shadcn@latest init

yarn dev
```

