# React + Vite

This is a personal project to demonstrate a client server app set up using

1. React for Client
1. React Router for Client side routing
1. Express for Server APIs
1. Nodemon to develop iteratively
1. Lerna to support a monorpeo
1. Jenkins pipeline to deploy to Azure VM

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


### Prerequisites
 - VM on azure - with port 8080 (Jenkins), 3000 (server), 5173(client) open
 - Jenkins installed
 - NodeJS install and using v18 latest.
 - NPM installed compatible with Node

### Connecting to machine
Assuming you have the key
ssh -i /Users/bdelahunty/.ssh/vm1_key.pem azureuser@4.180.13.24

### Logging into Jenkins GUI
bdelahunty / ******