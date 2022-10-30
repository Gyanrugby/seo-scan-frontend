// Geinstalleerde packages voor functionaliteiten
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import SearchState from '../../context/search/SearchContext'
import AuthContext from '../../context/auth/AuthContext'

// Connectie maken met de auth token
const UsedPages = () => {
    const {token} = useContext(AuthContext)

    const {pageused} = useContext(SearchState)

    return (
        <div className="keyword_used__pages">
            <div className="keyword_used_pages__list">
                <div className="keywordList__heading">
                    <h3>Pagina's die gebruik maken van dit keyword</h3>
                </div>
                {
                    token ? (
                        <ul>
                            {
                                pageused ? pageused.map((value,index) => {
                                    return <li key={index}><a target="blank" href={`https://${value}`}>{value}</a></li>
                                }) : []
                            }
                        </ul>
                    ):(
                        <ul>
                            {
                                pageused ? pageused.slice(0,4).map((value,index) => {
                                    return <li key={index}><a target="blank" href={`https://${value}`}>{value}</a></li>
                                }) : []
                            }
                            <li className="sign_in__load"><Link to="/sign-in"> <span>Log in </span> Om meer te laden </Link>  </li>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default UsedPages
