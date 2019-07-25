use dfilippenko;

const cursorCustomers = db.customers.find({}, { name: true } );

while (cursorCustomers.hasNext()) {

    const { _id, name } = cursorCustomers.next();

    const cursorOrders = db.orders.aggregate([
      { $match: { customerId: {$eq: _id } } },
      { $group : { _id : '$product', total: {$sum : '$count'} } }]);
  
    const customer = {
      fName: name.first,
      lName: name.last,
      orders: cursorOrders.toArray()
    };

    print(tojson(customer));
}
