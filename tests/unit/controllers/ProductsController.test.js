const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')
const sinonChai = require('sinon-chai');

const app = require('../../../src/app');
const connection = require('../../../src/db/connection');
const productsModels = require('../../../src/models/productsModels');
const productsServices = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController');

const { expect, use } = chai;

use(sinonChai);

const mockProducts = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  }
];

describe('Testando a camada Controller do endpoint Products', function () {
  it('Testando a requisição da consulta de todos os produtos no banco de dados', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsServices, 'validateAllProducts')
      .resolves({ products: mockProducts });
    
    await productsController.listProducts(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProducts);
  });

  it('Testando a requisição da consulta de apenas um produtos no banco de dados', async function () { 
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsServices, 'validateProduct').onFirstCall()
      .resolves({ products: mockProducts }).onSecondCall()
      .resolves({ type: 'error', message: 'Product not found' });
    
    await productsController.listOneProduct(req, res)

    expect(res.status).to.have.been.calledWith(200);

    await productsController.listOneProduct(req, res)

    expect(res.status).to.have.been.calledWith(404);
  })

  afterEach(sinon.restore);
});