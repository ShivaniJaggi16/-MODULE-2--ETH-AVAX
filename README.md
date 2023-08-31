After cloning GitHub, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i

2. Open two additional terminals in your VS code.

3. In the second terminal, type: npx hardhat node

4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js (Note: You can also verify the address of deployment in the contractAddress variable in index.js file)

5. Back in the first terminal, type npm run dev to launch the frontend.

After this, the project will be running on your local host, typically at `http://localhost:3000/`.

