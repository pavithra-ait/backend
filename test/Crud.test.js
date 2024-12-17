const nock = require('nock');
const { expect } = require('chai');
const { createProduct, getProductone, updateProduct, deleteProduct } = require('../app');

describe('CRUD Operations with Image Uploading', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    const mockUrl = 'https://localhost:5000/api/product';

    it('should mock product creation with image upload', async () => {
        const mockResponse = {
            success: true,
            message: 'Product created successfully',
            data: {
                id: '676115914b558bb5cb06cbdc',
                Name: 'top',
                Price: 2300,
                Image: 'upload/1734413297862-Screenshot (38).png'
            },
        };

        nock(mockUrl)
            .post('/create', {
                Name: 'top',
                Price: 2300,
                Image: 'upload/1734413297862-Screenshot (38).png',
            })
            .reply(201, mockResponse);

        const result = await createProduct({
            Name: 'top',
            Price: 2300,
            Image: 'upload/1734413297862-Screenshot (38).png',

        });

        expect(result).to.deep.equal(mockResponse);
    });
    it('should mock product creation with image upload and name is miss matching ', async () => {
        const mockResponse = {
            success: false,
            message: 'name is miss matching',
            data: {
                id: '676115914b558bb5cb06cbdc',
                Name: 'Sample Product',
                Price: 2300,
                Image: 'upload/1734413297862-Screenshot (38).png',
            },
        };

        nock(mockUrl)
            .post('/create', {
                Name: 'Sample Product',
                Price: 2300,
                Image: 'upload/1734413297862-Screenshot (38).png'
            })
            .reply(201, mockResponse);

        const result = await createProduct({
            Name: 'Sample Product',
            Price: 2300,
            Image: 'upload/1734413297862-Screenshot (38).png'
        });

        expect(result).to.deep.equal(mockResponse);
    });
    it('should mock product creation with image upload and Price is miss matching ', async () => {
        const mockResponse = {
            success: false,
            message: 'price is miss matching',
            data: {
                id: '676115914b558bb5cb06cbdc',
                Name: 'top',
                Price: 230,
                Image: 'upload/1734413297862-Screenshot (38).png',
            },
        };

        nock(mockUrl)
            .post('/create', {
                Name: 'top',
                Price: 230,
                Image: 'upload/1734413297862-Screenshot (38).png',
            })
            .reply(201, mockResponse);

        const result = await createProduct({
            Name: 'top',
            Price: 230,
            Image: 'upload/1734413297862-Screenshot (38).png',
        });

        expect(result).to.deep.equal(mockResponse);
    });
    it('should mock product creation with image upload and image path is incorrect ', async () => {
        const mockResponse = {
            success: false,
            message: 'Image path is miss matching',
            data: {
                id: '676115914b558bb5cb06cbdc',
                Name: 'top',
                Price: 2300,
                Image: 'upload/1734413297862-Screenshot.png',
            },
        };

        nock(mockUrl)
            .post('/create', {
                Name: 'top',
                Price: 2300,
                Image: 'upload/1734413297862-Screenshot.png',
            })
            .reply(201, mockResponse);

        const result = await createProduct({
            Name: 'top',
            Price: 2300,
            Image: 'upload/1734413297862-Screenshot.png',
        });

        expect(result).to.deep.equal(mockResponse);
    });

    it('should mock retrieving a product', async () => {
        const productId = '676115914b558bb5cb06cbdc';
        const mockResponse = {
            success: true,
            data: {
                id: productId,
                Name: 'top',
                Price: 2300,
                Image: 'upload/1734413297862-Screenshot (38).png',    
            },
        };

      
        nock(mockUrl, {
            reqheaders: {
                accept: 'application/json, text/plain, */*',
                'user-agent': /axios\/1\.7\.9/, 
                'accept-encoding': 'gzip, compress, deflate, br',
            },
        })
            .get(`/find/${productId}`) 
            .reply(200, mockResponse); 

        const result = await getProductone(productId);
        expect(result).to.deep.equal(mockResponse);
    });

    it('should mock updating a product with a new image', async () => {
        const productId = '676115914b558bb5cb06cbdc';
        const productUpdate = {
            Name: 'Updated Product',
            Price: 109.99,
            image: 'upload/1734413297862-Screenshot (39).png',
        };
        const mockResponse = {
            success: true,
            message: 'Product updated successfully',
        };
        nock(mockUrl, {
            reqheaders: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'user-agent': /axios\/1\.7\.9/,
            },
        })
            .put(`/update/${productId}`, productUpdate) 
            .reply(200, mockResponse); 
        const result = await updateProduct(productId, productUpdate);
        expect(result).to.deep.equal(mockResponse);
    });

    it('should mock deleting a product', async () => {
        const productId = '676115914b558bb5cb06cbdc';
        const mockResponse = {
            success: true,
            message: 'Product deleted successfully',
        };
        nock(mockUrl, {
            reqheaders: {
                accept: 'application/json, text/plain, */*',
                'user-agent': /axios\/1\.7\.9/,
                'accept-encoding': 'gzip, compress, deflate, br',
            },
        })
            .delete(`/remove/${productId}`) 
            .reply(200, mockResponse); 

        const result = await deleteProduct(productId);
        expect(result).to.deep.equal(mockResponse);
    });
});
