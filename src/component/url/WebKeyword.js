import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import SearchState from '../../context/search/SearchContext'
import AuthContext from '../../context/auth/AuthContext'


const WebKeyword = () => {
    const {token} = useContext(AuthContext)

    const {webkeywords} = useContext(SearchState)
    return (
        <div className="website">
            <div className="web_keyword__list">
                <div className="keywordList__heading">
                    <h3>Gerelateerde Keywords</h3>
                </div>
                {
                    token ? (
                        <ul>
                            {
                                webkeywords ? webkeywords.map((value,index) => {
                                    return <li key={index}>{value}</li>
                                }) : []
                            }
                        </ul>
                    ) : (
                        <ul>
                            {
                                webkeywords ? webkeywords.slice(0,11).map((value,index) => {
                                    return <li key={index}>{value}</li>
                                }) : []
                            }
                            <li className="sign_in__load"><Link to="/sign-in"> <span>Log in</span> Om meer te laden </Link>  </li>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default WebKeyword
