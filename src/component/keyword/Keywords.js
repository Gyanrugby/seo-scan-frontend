// Alle packages voor functionaliteiten
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import SearchState from '../../context/search/SearchContext'
import AuthContext from '../../context/auth/AuthContext'

// Opzetten keywords
const Keywords = () => {
    const {token} = useContext(AuthContext)
    const {keywords} = useContext(SearchState)
    return (
        <>
            <div className="keywords">
                <div className="keyword__list">
                    <div className="keywordList__heading">
                        <h3>Gerelateerde Keywords</h3>
                    </div>
                    {
                        token ? (
                            <ul>
                                {
                                    keywords ? keywords.map((value,index) => {
                                        return <li key={index}>{value}</li>
                                    }) : []
                                }
                            </ul>
                        ): (
                            <ul>
                                {
                                    keywords ? keywords.slice(0, 11).map((value,index) => {
                                        return <li key={index}>{value}</li>
                                    }) : []
                                }
                                <li className="sign_in__load"><Link to="/sign-in"> <span>Log in</span> Om meer te laden </Link>  </li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Keywords
