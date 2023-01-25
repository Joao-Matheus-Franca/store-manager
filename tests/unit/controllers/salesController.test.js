const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')
const sinonChai = require('sinon-chai');

const app = require('../../../src/app');
const connection = require('../../../src/db/connection');
const salesModels = require('../../../src/models/salesModels');
const salesServices = require('../../../src/services/salesServices');
const salesController = require('../../../src/controllers/salesController');

const { expect, use } = chai;

use(sinonChai);

const mockSales = [
  {
    saleId: 1,
    date: "2023-01-25T20:40:32.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2023-01-25T20:40:32.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2023-01-25T20:40:32.000Z",
    productId: 3,
    quantity: 15
  }
]

describe('Testando a camada Controller do endpoint Sales', function () {
  it('Testando a requisição da consulta de todas as vendas no banco de dados', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'listAllSales')
      .resolves(mockSales);
    
    await salesController.sendAllSales(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSales);
  });

  it('Testando a requisição da consulta de apenas uma venda no banco de dados', async function () { 
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'listOneSale').onFirstCall()
      .resolves({ sales: mockSales })
    
    await salesController.sendOneSale(req, res)

    expect(res.status).to.have.been.calledWith(200);
  })

    it('Testando a requisição da consulta de todas as vendas no banco de dados', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, 'validateSales').onFirstCall()
      .resolves({ type: 1 }).onSecondCall()
      .resolves({ type: 2});
    
    await salesController.sendNewSale(req, res)

    expect(res.status).to.have.been.calledWith(400);
    
    await salesController.sendNewSale(req, res)
      
    expect(res.status).to.have.been.calledWith(400);
    
  });

  afterEach(sinon.restore);
});