class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

      this.query = this.query.find({ ...keyword });
      return this;
  }
  filter() {
    const querycopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => {
      delete querycopy[key];
    });

    let querystr = JSON.stringify(querycopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => 
      (`$${key}`)
    );

    // querystr = JSON.parse(querystr);
    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;

// apifeature is a custom class we are creating. we create a new object of this class in (get all products) controller. we create object in L.H.S (apiFeature). object is created with new keyword and a constructor which take arguments
// query & queryStr. query is a database query we pass, product.find and store in query variable via constructor. querystr we store req.query, it has keyword which we retrieve later
// in search() we create const keyword and store quertyStr in it. We assign name property which further has conditions regex,options which helps in finding required data from data base.
// later this.query which has value as product.find is later modified to product.find().find({}...keyword}). it creates a query object , code hasnt run yet to fetch data from data base
// In get product controller, await apifeatue.query is run which is equal to product.find().find({}...keyword}) as apifeature here is an object and .query we are accessing
// this.query and this.queryStr are properties of the ApiFeatures class. They are equivalent to variables, but since they are inside a class, we call them properties or instance variables. They hold data related to each instance of the class.

// So, this.query and this.queryStr are not "both variables or objects". They are variables that can refer to objects. The specific type of object they refer to (or if they refer to a primitive instead of an object) depends on what values you pass in when you create an instance of the ApiFeatures class.

// The distinction is that "instance variable" refers to the role that this.query and this.queryStr play within the class, while "object" refers to the type of value that these instance variables are expected to hold.

// Variable Name	             Variable Type	                   Expected Value Type
// this.query	             Instance Variable	                   Mongoose Query Object
// this.queryStr	             Instance Variable	                    JavaScript Object

// In JavaScript, the bracket notation [] is another way to access properties of an object. It's equivalent to the dot notation (.), but the key difference is that the bracket notation allows you to use variable keys and keys that are not valid identifiers.
