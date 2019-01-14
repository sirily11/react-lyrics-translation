export default class Pagination {

    constructor(items, itemPerPage){
        this.items = items
        this.itemPerPage = itemPerPage
        this.currentPage = 0
        this.totalPage = Math.ceil(items.length / itemPerPage)
    }

    getTotalNumOfPage(){
        return this.totalPage
    }

    getCurrentPageNum(){
        return this.currentPage
    }

    getCurrentPage(){
        let item = this.items.slice(this.currentPage, this.currentPage + this.itemPerPage)
        return item
    }

    next(){
        this.currentPage = Math.min(this.currentPage + 1, this.totalPage -  1)
        return this.currentPage
    }

    prev(){
        this.currentPage = Math.max(this.currentPage -1, 0)
        return this.currentPage
    }

}