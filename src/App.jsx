import { StyledEngineProvider } from "@mui/material/styles"
import api from "./config.json"
import axios from "axios"
import "./App.css"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useRef, useState } from "react"

function App() {
    const [ranks, setRanks] = useState([])
    const [details, setDetails] = useState({})
    const [prices, setPrices] = useState([])
    const [collection, setCollection] = useState("")
    const [id, setId] = useState("")
    const ranksTable = useRef()
    const pricesTable = useRef()
    const detailsTable = useRef()

    const getRanks = async () => {
        const options = {
            method: "GET",
            url: `https://api.traitsniper.com/v1/collections/${collection}/ranks?page=1&limit=10000`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                accept: "*/*",
                "x-ts-api-key": "bf5f1969-44e7-4db8-85d4-3d8508f6a1f4",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive"
            }
        }
        try {
            const res = await axios.request(options)
            setRanks(res.data.ranks)
            pricesTable.current.style.display = "none"
            detailsTable.current.style.display = "none"
            ranksTable.current.style.display = "block"
        } catch (err) {
            console.error(err)
        }
    }

    const getPrices = async () => {
        const options = {
            method: "GET",
            url: `https://api.traitsniper.com/v1/collections/${collection}/prices?page=1&limit=200`,
            headers: {
                accept: "application/json",
                "x-ts-api-key": api.key
            }
        }
        try {
            const res = await axios.request(options)
            setPrices(res.data.prices)
            ranksTable.current.style.display = "none"
            detailsTable.current.style.display = "none"
            pricesTable.current.style.display = "block"
        } catch (err) {
            console.error(err)
        }
    }

    const getDetails = async () => {
        const options = {
            method: "GET",
            url: `https://api.traitsniper.com/v1/collections/${collection}/nfts/${id}`,
            headers: {
                accept: "application/json",
                "x-ts-api-key": api.key
            }
        }
        try {
            const res = await axios.request(options)
            setDetails(res.data.data)
            pricesTable.current.style.display = "none"
            ranksTable.current.style.display = "none"
            detailsTable.current.style.display = "block"
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="App">
            <StyledEngineProvider injectFirst>
                <p>
                    Enter Below the address of a particular collection/contract
                    and click on get ranks or get prices to get prices and
                    rarity data for its NFTs. In order to know about the details
                    of a particular NFT enter its ID in addition to collection
                    address and click on get details
                </p>
                <form>
                    <input
                        type="text"
                        placeholder="Enter collection/contract Address"
                        onChange={(e) => {
                            setCollection(e.target.value)
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Enter Token ID"
                        onChange={(e) => {
                            setId(e.target.value)
                        }}
                    />
                </form>
                <div className="data">
                    <button className="api-btn" onClick={getRanks}>
                        Get Ranks
                    </button>
                    <TableContainer
                        component={Paper}
                        sx={{
                            marginLeft: "15vw",
                            width: "70vw",
                            display: "none"
                        }}
                        ref={ranksTable}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">
                                        Rarity Rank
                                    </TableCell>
                                    <TableCell align="right">
                                        Rarity Score
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ranks.map((row) => (
                                    <TableRow
                                        key={row.token_id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.token_id}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.rarity_rank}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.rarity_score}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <button className="api-btn" onClick={getPrices}>
                        Get Prices
                    </button>
                    <TableContainer
                        component={Paper}
                        sx={{
                            marginLeft: "15vw",
                            width: "70vw",
                            display: "none"
                        }}
                        ref={pricesTable}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">
                                        Currency
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prices.map((row) => (
                                    <TableRow
                                        key={row.token_id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.token_id}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.opensea_price}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.opensea_currency}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <button className="api-btn" onClick={getDetails}>
                        Get Details
                    </button>
                    <TableContainer
                        component={Paper}
                        sx={{
                            marginLeft: "15vw",
                            width: "70vw",
                            overflowX: "auto",
                            display: "none"
                        }}
                        ref={detailsTable}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">
                                        Image URL
                                    </TableCell>
                                    <TableCell align="right">
                                        Rarity Score
                                    </TableCell>
                                    <TableCell align="right">
                                        Rarity Rank
                                    </TableCell>
                                    <TableCell align="right">
                                        Opensea URL
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {details.image}
                                    </TableCell>
                                    <TableCell align="right">
                                        {details.rarity_score}
                                    </TableCell>
                                    <TableCell align="right">
                                        {details.rarity_rank}
                                    </TableCell>
                                    <TableCell align="right">
                                        {details.opensea_url}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </StyledEngineProvider>
        </div>
    )
}

export default App
