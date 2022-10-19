# Catena-X Portal Shared UI Components

Contains the shared UI components that are used to build the Catena-X Portal Frontend.
Get an overview about the available components here

https://portal.dev.demo.catena-x.net/_storybook/

To use components in your own project follow this guide.
First create a new react app and add dependencies for the library and Material UI.
We are using yarn and TypeScript, if you prefer npm/npx or JavaScript use those.

	yarn create react-app sample-shared-components --template typescript
	cd sample-shared-components
	yarn add cx-portal-shared-components @mui/icons-material @mui/material


Start the development server

	yarn start


Edit `src/index.tsx` and wrap the `App` with the CX `SharedThemeProvider` context

	import React from 'react';
	import ReactDOM from 'react-dom/client';
	import App from './App';
	import { SharedThemeProvider } from 'cx-portal-shared-components';
	import './index.css';

	ReactDOM.createRoot(
	  document.getElementById('root') as HTMLElement
	).render(
	  <React.StrictMode>
	      <SharedThemeProvider>
		  <App />
	      </SharedThemeProvider>
	  </React.StrictMode>
	)


Edit `src/index.css` and replace the content with this stylings

	header {
	  width: 200px;
	}

	main {
	  padding: 200px;
	}


Open `App.tsx` and replace the code with this example

	import { Button, Logo, Typography } from "cx-portal-shared-components";

	const App = () => 
	    <>
		<header>
		    <Logo/>
		</header>
		<main>
		    <Typography variant="h1">My Application</Typography>
		    <Typography sx={{ margin: '40px 0'}}>
			This is a template demonstrating the use of the Catena-X Shared Components.
		    </Typography>
		    <Button onClick={() => { alert('clicked') }}>Click me</Button>
		</main>
	    </>

	export default App;


