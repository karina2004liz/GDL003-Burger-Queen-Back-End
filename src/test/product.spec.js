const product = require('../routes/product.js');
const productModel = require('../models/product').Model;
const mockingoose = require('mockingoose').default;

describe("getProducts", () => {
  it("is a function", () => {
    expect(typeof product.getProducts).toBe("function");
  });
});

describe('test mongoose product model', () => {
  it('should return the doc with find', () => {
    const docsArg = [{
      name: 'coffe',
      price: 25,
      category: ['Drinks']
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

describe("getProductId", () => {
  it("is a function", () => {
    expect(typeof product.getProductId).toBe("function");
  });
});

describe("postProduct", () => {
  it("is a function", () => {
    expect(typeof product.postProduct).toBe("function");
  });
});

describe("putProduct", () => {
  it("is a function", () => {
    expect(typeof product.putProduct).toBe("function");
  });
});

describe("deleteProduct", () => {
  it("is a function", () => {
    expect(typeof product.deleteProduct).toBe("function");
  });
});