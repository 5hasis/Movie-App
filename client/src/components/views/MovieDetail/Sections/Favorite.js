import React, { useEffect,useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const moiveId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)

    useEffect(() => {

        let variables= {
            userFrom : userFrom,
            movieId : moiveId
        }
        
        Axios.post('/api/favorite/favoriteNumber',variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                }else{
                    alert('정보를 가져오는데 실패 했습니다')
                }
            })
    }, [])

    return (
        <div>
            <Button> {FavoriteNumber}  </Button>
        </div>
    )
}

export default Favorite
