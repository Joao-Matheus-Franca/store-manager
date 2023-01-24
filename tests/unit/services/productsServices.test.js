const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')

const app = require('../../../src/app');
const connection = require('../../../src/db/connection');
const productsModels = require('../../../src/models/productsModels');
const productsServices = require('../../../src/services/productsServices');

const { expect, use } = chai;

use(chaiHttp);

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

describe('Testando a camada Services do endpoint Products', function () {
  it('Testando a validação da consulta de todos os produtos no banco de dados', async function () {
    sinon.stub(productsModels, 'findAll').onFirstCall().resolves([mockProducts]).onSecondCall().resolves([]);

    const result_01 = await productsServices.validateAllProducts();

    expect(result_01.products).to.deep.equal(mockProducts);

    const result_02 = await productsServices.validateAllProducts();

    expect(result_02.type).to.equal('error');
  });

  it('Testando a validação da consulta de apenas um produtos no banco de dados', async function () { 
    sinon.stub(productsModels, 'findById').onFirstCall().resolves([[mockProducts[0]]]).onSecondCall().resolves([[]]);

    const result_01 = await productsServices.validateProduct(1);

    expect(result_01.product).to.deep.equal(mockProducts[0]);

    const result_02 = await productsServices.validateProduct(1);

    expect(result_02.type).to.equal('error');
  })

  afterEach(sinon.restore);
});