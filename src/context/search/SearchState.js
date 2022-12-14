import React, {useReducer} from 'react'
import axios from 'axios'
import SearchContext from './SearchContext'
import SearchReducer from './SearchReducer'

const SearchState = props => {
    const InitState = {
        loading: false,
        searched: false,
        type_keyword: false,
        keywords: [], // A| keyword lijst
        pageused: [], // B|
        instakeywords: [], // C|
        webkeywords: [], // D| url keyword
        subdomain: [], // E| url domein
        report: {}
    }
    const [state, dispatch] = useReducer(SearchReducer, InitState)
    //-----------------------------------------------------------
    //KEYWORD |A|  keyword lijst request
    const setkeyword = async keyword => {
        try {
            setloading()
            const res = await axios.get(`https://seo-react-gyan.herokuapp.com/api/v1/keywords?keyword=${keyword}`)
            dispatch({
                type: 'MAIN_KEYWORDS',
                payload: res.data.result
            })
        } catch (err) {
            console.log(err)
        }

    }
    //KEYWORD |B|  pageused lijst request + connectie Heroku
    const setpagedused = async keyword => {
        try {
            setloading()
            const res = await axios.get(`https://seo-react-gyan.herokuapp.com/api/v1/pagesused?keyword=${keyword}`)
            dispatch({
                type: 'PAGE_USED',
                payload: res.data.result
            })
        } catch (err) {
            console.log(err)
        }

    }
    //KEYWORD |C|  instargram lijst request (werkt momenteel niet)
    const setinstergram = async keyword => {
        try {
            setloading()
            const res = await axios.get(`https://seo-react-gyan.herokuapp.com/api/v1/instagram?keyword=${keyword}`)
            dispatch({
                type: 'INSTA_KEYWORD',
                payload: res.data.result
            })
        } catch (err) {
            console.log(err)
        }
    }
    // KEYWORD ALGEHEEL
    const runkeywords = keyword => {
        setinstergram(keyword)
        setkeyword(keyword)
        setpagedused(keyword)

    }
    // _______________________
    // URL

    const sitereport = async domain => {
        setloading()

        try {
            const res = await axios.post(`https://seo-react-gyan.herokuapp.com/api/v1/report`,{domain:domain})
            dispatch({
                type: 'REPORT',
                payload: res.data.report
            })
        } catch (err) {
            console.log(err)
        }
    }

    const domainkeyword = async domain => {
        try {
            setloading()
            const res = await axios.get(`https://seo-react-gyan.herokuapp.com/api/v1/domainkeyword?domain=${domain}`)
            dispatch({
                type: 'DOMAIN_KEYWORD',
                payload: res.data.results
            })
        } catch (err) {
            console.log(err)
        }
    }

    const subdomains = async domain => {
        try {
            setloading()
            const res = await axios.get(`https://seo-react-gyan.herokuapp.com/api/v1/subdomains?domain=${domain}`)
            dispatch({
                type: 'SUBDOMAINS',
                payload: res.data.results
            })
        } catch (err) {
            console.log(err)
        }
    }

    const runalldomains = domain => {
        subdomains(domain)
        domainkeyword(domain)
        sitereport(domain)
   
        // console.log(domain)
    }


    // type
    const setType = (bool) => {
        dispatch({
            type: 'SET_TYPE',
            payload: bool
        })
    }

    // Gezocht
    const setsearched = () => {
        dispatch({
            type: 'SET_SEARCHED'
        })
    }
    // Laden
    const setloading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }
    //-----------------------------------------------------------
    return (
        <SearchContext.Provider value={{
            loading: state.loading,
            searched: state.searched,
            type_keyword: state.type_keyword,
            keywords:state.keywords,
            pageused: state.pageused,
            instakeywords: state.instakeywords,
            webkeywords: state.webkeywords,
            subdomain: state.subdomain,
            report: state.report,
            setloading,
            setsearched,
            setType,
            runkeywords,
            runalldomains
        }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchState
