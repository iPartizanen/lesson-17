use dfilippenko;

const getDataPage = (size = 20, page = 0) => {
  const result = [];
  
  const cursorCustomers = db.customers.find({}, { name: true } ).limit(size).skip(page*size);

  while (cursorCustomers.hasNext()) {

    const { _id, name } = cursorCustomers.next();

    const cursorOrders = db.orders.aggregate([
      { $match: { customerId: {$eq: _id } } },
      { $group : { _id : '$product', total: {$sum : '$count'} } }]);

    result.push({
      fName: name.first,
      lName: name.last,
      orders: cursorOrders.toArray()
    });
  }
  return result;
}

const pageSize = 5;
let page = 0;
let pageData = [];

do {
  pageData = getDataPage(pageSize, page++);
  pageData.forEach((customer) => { print(tojson(customer)) });
} while (pageData.length);
