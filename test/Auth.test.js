const nock = require('nock');
const { expect } = require('chai');
const { getdata, getdatas } = require('../app');

describe('Register and Login API Mocking', () => {
  afterEach(() => {
    nock.cleanAll(); 
  });

  it('should mock a user registration', async () => {

    const mockUrl = 'https://localhost:5000/api/auth';


    nock(mockUrl)
      .post('/register', { name: 'pavi02', email: 'pavi2002@gmail.com', password: '02' })
      .reply(201, { success: true, message: 'User registered successfully' });


    const result = await getdata({ name: 'pavi02', email: 'pavi2002@gmail.com', password: '02' });


    expect(result).to.deep.equal({ success: true, message: 'User registered successfully' });
  });
  it('should mock a  user registration and  user name is incorrect ', async () => {

    const mockUrl = 'https://localhost:5000/api/auth';


    nock(mockUrl)
      .post('/register', { name: 'test', email: 'pavi2002@gmail.com', password: '02' })
      .reply(201, { success: false, message: 'user name is incorrect' });


    const result = await getdata({ name: 'test', email: 'pavi2002@gmail.com', password: '02' });


    expect(result).to.deep.equal({ success: false, message: 'user name is incorrect' });
  });
  it('should mock a   user registration and user email is incorrect ', async () => {

    const mockUrl = 'https://localhost:5000/api/auth';


    nock(mockUrl)
      .post('/register', { name: 'pavi02', email: 'pavi20@gmail.com', password: '02' })
      .reply(201, { success: false, message: 'user email is incorrect' });


    const result = await getdata({ name: 'pavi02', email: 'pavi20@gmail.com', password: '02' });


    expect(result).to.deep.equal({ success: false, message: 'user email is incorrect' });
  });

  it('should mock a  user registration and  user passowrd is incorrect ', async () => {

    const mockUrl = 'https://localhost:5000/api/auth';


    nock(mockUrl)
      .post('/register', { name: 'pavi02', email: 'pavi2002@gmail.com', password: '0' })
      .reply(201, { success: false, message: 'user password is incorrect' });


    const result = await getdata({ name: 'pavi02', email: 'pavi2002@gmail.com', password: '0' });

    expect(result).to.deep.equal({ success: false, message: 'user password is incorrect' });
  });

  it('should mock a user login', async () => {

    const mockUrl = 'https://localhost:5000/api/auth';

    //
    nock(mockUrl)
      .post('/login', { name: 'pavi02', password: '02' })
      .reply(200, { success: true, message: 'Login successful', token: 'mocked_jwt_token' });

    const result = await getdatas({ name: 'pavi02', password: '02' });
    expect(result).to.deep.equal({
      success: true,
      message: 'Login successful',
      token: 'mocked_jwt_token'
    });
  });
  it('should mock a  user login and  user name is incorrect', async () => {

    const mockUrl = 'https://localhost:5000/api/auth';

    //
    nock(mockUrl)
      .post('/login', { name: 'test', password: '02' })
      .reply(200, { success: false, message: 'name is incorrect' });

    const result = await getdatas({ name: 'test', password: '02' });
    expect(result).to.deep.equal({
      success: false,
      message: 'name is incorrect'
    });
  });
  it('should mock a user login and user password is incorrect', async () => {

    const mockUrl = 'https://localhost:5000/api/auth';

    //
    nock(mockUrl)
      .post('/login', { name: 'pavi02', password: '0' })
      .reply(200, { success: false, message: 'user password is incorrect'});

    const result = await getdatas({ name: 'pavi02', password: '0' });
    expect(result).to.deep.equal({
      success: false,
      message: 'user password is incorrect'
    });
  });
});


