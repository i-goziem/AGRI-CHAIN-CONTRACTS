// async function connectWallet() {
//   if (window.ethereum) {
//       try {
//           // Request account access if needed
//           const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//           console.log("Connected account:", accounts[0]);
//       } catch (error) {
//           console.error("User denied account access");
//       }
//   } else {
//       alert("Please install MetaMask!");
//   }
// }

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  /* ABI from your compiled contract */
];

const contract = new web3.eth.Contract(abi, contractAddress);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#farmer .cta-button")
    .addEventListener("click", addProduct);
  document
    .querySelector("#consumer .cta-button")
    .addEventListener("click", loadProducts);
});

async function addProduct() {
  const name = prompt("Enter product name:");
  const origin = prompt("Enter product origin:");

  const accounts = await web3.eth.getAccounts();
  await contract.methods.addProduct(name, origin).send({ from: accounts[0] });

  alert("Product added successfully!");
}

async function loadProducts() {
  const productCount = await contract.methods.productCount().call();
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  for (let i = 1; i <= productCount; i++) {
    const product = await contract.methods.getProduct(i).call();
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `<p>Product ID: ${product.id}</p>
                                <p>Name: ${product.name}</p>
                                <p>Origin: ${product.origin}</p>
                                <p>Timestamp: ${new Date(
                                  product.timestamp * 1000
                                ).toLocaleString()}</p>`;
    productList.appendChild(productDiv);
  }
}
