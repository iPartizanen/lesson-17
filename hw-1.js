use dfilippenko;

const cursorCustomers = db.customers.find({}, { name: true } );

while (cursorCustomers.hasNext()) {

    const { _id, name } = cursorCustomers.next();

    const cursorOrders = db.orders.find({ customerId: _id }, { customerId: false, title: false } );

    const customer = {
      fName: name.first,
      lName: name.last,
      orders: cursorOrders.toArray()
    }

    print(tojson(customer));
}
