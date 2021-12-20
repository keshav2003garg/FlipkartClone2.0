class productFiltration {
    constructor(products, query) {
        this.products = products;
        this.query = query;
    };

    search() {
        const keyword = this.query.keyword ? {
            name: {
                $regex: this.query.keyword,
                $options: "i",
            }
        } : {};
        this.products = this.products.find({ ...keyword });
        return this;
    };

    filter() {
        const queryCopy = { ...this.query };
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach((key) => { delete queryCopy[key] });
        let query = JSON.stringify(queryCopy);
        query = query.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.products = this.products.find(JSON.parse(query));
        return this;
    };

    pagination(resultPerPage){
        const currentPage = Number(this.query.page) || 1;
        const skip = resultPerPage*(currentPage-1);

        this.products = this.products.limit(resultPerPage).skip(skip);
        
        return this;
    }
}

module.exports = productFiltration;