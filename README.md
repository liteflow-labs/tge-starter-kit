# TGE Starter Kit

## Purpose

The TGE Starter Kit is a boilerplate project designed to help businesses launch their own Token Generation Event (TGE). It includes a Next.js frontend with TypeScript, Tailwind CSS, and React Query, as well as a Liteflow SDK backend to manage quests and leaderboards.

## Features

- **Display TGE information:** Display all information related to the TGE, including the start date, end date, total supply, and token price.
- **Purchase token:** Allow users to purchase tokens using a wallet connection.

## Setup

Follow these steps to set up the project:

### Clone the repository:

```bash
git clone https://github.com/liteflow-labs/tge-starter-kit.git
cd tge-starter-kit
```

### Install dependencies:

```bash
npm install
```

### Run the development server:

```bash
npm run dev
```

### Build the application:

```bash
npm run build
```

### Start the production server:

```bash
npm start
```

## Configuration

The project uses environment variables to configure the frontend and backend. Create a `.env.local` file in the root of the project and add the following variables:

```bash
# Create your project ID on https://reown.com/
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=

# Create your Liteflow API key on https://dashboard.liteflow.com/developers
NEXT_PUBLIC_LITEFLOW_API_KEY=

# Chain ID of the TGE contract created on https://dashboard.liteflow.com/tokens/tges/create
NEXT_PUBLIC_TGE_CHAIN_ID=

# Address of the TGE contract created on https://dashboard.liteflow.com/tokens/tges/create
NEXT_PUBLIC_TGE_CONTRACT_ADDRESS=
```

The UI is built with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/), so you can customize the styles by editing the `tailwind.config.js` file and by importing components from the `shadcn/ui` library.

The application uses [Wagmi](https://wagmi.sh/) and [RainbowKit](https://www.rainbowkit.com/) for wallet connection.

## Deployment

The project is designed to be deployed to Vercel. You can deploy the project by connecting your GitHub repository to Vercel and configuring the environment variables in the Vercel dashboard.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/liteflow-labs/tge-starter-kit)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
