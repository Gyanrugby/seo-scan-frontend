// Alle packages voor functionaliteiten
import React, { useContext} from 'react'
import {Link} from 'react-router-dom'
import SearchState from '../../context/search/SearchContext'

import AuthContext from '../../context/auth/AuthContext'
// Momenteel niet werkend gekregen omdat je ook met auth moet inloggen op instagram
// Het opzetten van de instagram scrapping
const Instakeyword = () => {
    const {instakeywords} = useContext(SearchState)
    const {token} = useContext(AuthContext)
    return (
        <div className="keyword__instagram">
            <div className="keyword_instargram__list">
                <div className="keywordList__heading">
                    <h3>Instagram gerelateerd</h3>
                </div>
                {   
                    token ? (
                        <ul>
                            {
                                instakeywords ? instakeywords.map((value, index) => {
                                    return <li key={index}>{value}</li>
                                }) : []
                            }
                        </ul>
                    ) :(
                        <ul>
                            {
                                instakeywords ? instakeywords.slice(0, 6).map((value, index) => {
                                    return <li key={index}>{value}</li>
                                }) : []
                            }
                            <li className="sign_in__load"><Link to="/sign-in"> <span>Log in </span> om meer te zien </Link>  </li>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default Instakeyword
