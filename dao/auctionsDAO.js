let auctions

export default class AuctionsDAO {
    static async injectDB(conn){
        if(auctions){
            return
        }
        try{
            auctions = await conn.db(process.env.Auction_NS).collection("Descripton")
        } catch (e) {
            console.error("Unable to establish a connection handle in AuctionsDAO:${e}",
            )
        }
    }
    static async getAuctions ({
        filters= null,
        page = 0,
        auctionsPerPage = 20,
    } = {}){
        let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("Phone_Number" in filters) {
        query = { "Phone_Number": { $eq: filters["Phone_Number"] } }
      } else if ("Address" in filters) {
        query = { "address": { $eq: filters["Address"] } }
      }
    }
        let cursor

        try {
            cursor = await auctions
            .find(query)
        } catch (e) {
            console.error('Unable to issue find command,${e}')
            return {AuctionList:[],totalNumResults:0}
        }

        const displayCursor = cursor.limit(auctionsPerPage).skip(auctionsPerPage * page)

        try{
        const auctionsList = await displayCursor.toArray()
        const totalNumAuction = page === 0 ? await auctions.countDocuments(query):0

        return { auctionsList:[],totalNumResults:totalNumAuction}
        }catch (e) {
            console.error('Unable to convert cursor to array or problem counting documents,${e}',
            )
            return {auctionsList:[],totalNumResults:0}
    }
    }
}