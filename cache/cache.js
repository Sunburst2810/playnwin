'use strict';

class Cache {

    constructor() {
      this.bids = {}
      // get all the data from mongo
    }

    addBid(id, bidData) {
      if ( id in this.bids) {
          this.bids[id].push(bidData)
      }
      else {
        this.bids[id] = []
        this.bids[id].push(bidData)
      }
    }

    getBids(id) {
        return this.bids[id]
    } 

    updateBid() {

    }

    removeBid() {

    }

}

module.exports = new Cache()