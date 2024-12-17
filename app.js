const axios = require('axios');

async function getdata(data) {
    const response = await axios.post('https://localhost:5000/api/auth/register', data);
    return response.data;
}
async function getdatas(data) {

    const response = await axios.post('https://localhost:5000/api/auth/login', data);
    return response.data;

}

const baseUrl = 'https://localhost:5000/api/product';

async function createProduct(data) {
    const response = await axios.post(`${baseUrl}/create`, data);
    return response.data;
};

async function updateProduct(id, data) {
    const response = await axios.put(`${baseUrl}/update/${id}`, data);
    return response.data;
};

async function deleteProduct(id) {
    const response = await axios.delete(`${baseUrl}/remove/${id}`);
    return response.data;
};


const getProductone = async (id) => {
    const response = await axios.get(`${baseUrl}/find/${id}`);
    return response.data;
};
async function getProductsByName(name) {

    const response = await axios.get(`${baseUrl}/find`, {
        params: { name: name }
    });
    return {
        success: true,
        message: 'Products filtered successfully',
        data: response.data.data
    };

}



module.exports = { getdata, getdatas, createProduct, getProductone, getProductsByName, updateProduct, deleteProduct };

