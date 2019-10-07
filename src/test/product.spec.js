const product = require('../routes/product.js');
const productModel = require('../models/product');
const mockingoose = require('mockingoose').default;

describe("getProducts", () => {
  it("is a function", () => {
    expect(typeof product.getProducts).toBe("function");
  });
  /*it("it should be return the list products or not", () => {
    let  ok = false;
    jest.mockingoose(productModel.prototype, "find")
      .mockImplementationOnce(() => ok = true)
    product.getProducts({}, {})
    expect(ok).toBe(true);
  }); */
});

describe('test mongoose product model', () => {
  it('should return the doc with find', () => {
    const docsArg = [{
      name: 'coffe',
      price: 25,
      category: ['Drinks'],
      description: 'Hot-coffee'
    }]

    mockingoose(productModel).toReturn(docsArg, 'find');
    let statusArg;
    let docsResp;
    let res = {
      status: (arg) => {
        statusArg = arg
        return {
          send: (arg) => {
            docsResp = arg
          }
        }
      }
    }
    return product.getProducts({}, res).then( docs => {
      console.log(statusArg)
      console.log(docsResp)
      expect(docsResp.products.length).toBe(1)
    });
  });

  
});