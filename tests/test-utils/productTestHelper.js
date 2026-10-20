const fs = require('fs/promises');
const { create: createProduct, destroy } = require('../../products');
const { create: createOrder, destroy: destroyOrder } = require('../../orders');

const productTestHelper = {
  testProductIds: [],
  testOrderIds: [],

  async setupTestData() {
    console.log('Loading test products...');
    const data = await fs.readFile('data/full-products.json', 'utf-8');
    const testProducts = JSON.parse(data).slice(0, 10);

    for (const product of testProducts) {
      if (!product.price) {
        product.price = 25;
      }
      const createdProduct = await createProduct(product);
      this.testProductIds.push(createdProduct.id); // Store the created product's ID
    }
    console.log('Test products loaded successfully');
  },

  async cleanupTestData() {
    console.log('Cleaning up test products...');
    for (const productId of this.testProductIds) {
      await destroy(productId);
    }

    console.log('Cleaning up test orders...');
    for (const orderId of this.testOrderIds) {
      await destroyOrder(orderId);
    }

    console.log('Test products and orders cleaned up successfully');
    this.testProductIds = [];
    this.testOrderIds = [];
  },

  async createTestOrder() {
    if (this.testProductIds.length === 0) {
      throw new Error('No test products available. Run setupTestData() first.');
    }

    const products = this.testProductIds.slice(0, 2);

    // Create a new test order
    const orderData = {
      buyerEmail: `test${this.testOrderIds.length}@example.com`,
      products,
    };

    const createdOrder = await createOrder(orderData);
    this.testOrderIds.push(createdOrder.id); // Store the created order's ID
    return createdOrder;
  },

  async createTestOrders(count = 5) {
    const orders = [];
    for (let i = 0; i < count; i++) {
      const order = await this.createTestOrder();
      orders.push(order);
    }
    return orders;
  },
};

module.exports = productTestHelper;
