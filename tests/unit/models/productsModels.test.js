const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')

const app = require('../../../src/app');
const connection = require('../../../src/db/connection');
const productsModels = require('../../../src/models/productsModels');

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

describe('Testando a camada Models do endpoint Products', function () {
  it('Testando a consulta a todos os produtos no banco de dados', async function () { 
    sinon.stub(connection, 'execute').resolves([mockProducts]);

    const [result] = await productsModels.findAll();

    expect(result.length).to.equal(3);
  })

  it('Testando a consulta de apenas um produto no banco de dados', async function () { 
    sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);

    const [[result]] = await productsModels.findById(1);

    expect(result).to.deep.equal(mockProducts[0]);
  })

  afterEach(sinon.restore);
});