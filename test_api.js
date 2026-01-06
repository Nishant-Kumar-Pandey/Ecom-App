import axios from 'axios';

async function test() {
    try {
        console.log("Testing http://localhost:3001/ ...");
        const response = await axios.get('http://localhost:3001/');
        console.log("Status:", response.status);
        console.log("Data:", response.data);

        console.log("\nTesting http://localhost:3001/api/products ...");
        const response2 = await axios.get('http://localhost:3001/api/products');
        console.log("Status:", response2.status);
    } catch (error) {
        console.error("Error Status:", error.response?.status);
        console.error("Error Data:", error.response?.data);
        console.error("Error Message:", error.message);
    }
}

test();
