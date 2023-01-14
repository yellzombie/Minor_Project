import express from "express"
import AuctionsCtrl from "./auctions.controller.js "

const router = express.Router()

router.route("/").get(AuctionsCtrl.apiGetAuctions)

export default router 