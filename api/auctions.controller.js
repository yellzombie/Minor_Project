import AuctionsDAO from "../dao/auctionsDAO.js"

export default class AuctionsController {
  static async apiGetAuctions(req, res, next) {
    const auctionsPerPage = req.query.auctionsPerPage ? parseInt(req.query.auctionsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.Phone_Number) {
      filters.Phone_Number = req.query.Phone_Number
    } else if (req.query.Address) {
      filters.Address = req.query.Address
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { auctionsList, totalNumAuctions } = await AuctionsDAO.getAuctions({
      filters,
      page,
      auctionsPerPage,
    })

    let response = {
      auctions: auctionsList,
      page: page,
      filters: filters,
      entries_per_page: auctionsPerPage,
      total_results: totalNumAuctions,
    }
    res.json(response)
  }
}