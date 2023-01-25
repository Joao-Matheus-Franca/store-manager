const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')

const app = require('../../../src/app');
const connection = require('../../../src/db/connection');
const salesModels = require('../../../src/models/salesModels');
const salesServices = require('../../../src/services/salesServices');

const { expect, use } = chai;

use(chaiHttp);

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

describe('Testando a camada Services do endpoint Sales', function () {
  it('Testando a consulta a todas as vendas no banco de dados', async function () { 
    sinon.stub(salesModels, 'findAll').resolves([mockSales]);

    const result = await salesServices.listAllSales();

    expect(result.length).to.equal(3);
  })

  it('Testando a consulta de apenas uma venda no banco de dados', async function () { 
    sinon.stub(salesModels, 'findById').resolves([[]]);

    const result = await salesServices.listOneSale();

    expect(result.message).to.equal('Sale not found');
  })

  afterEach(sinon.restore);
});