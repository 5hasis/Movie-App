import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { Row, Button } from 'antd';
import MainImage from '../LandingPage/Sections/MainImage'
import MoviInfo from './Sections/MovieInfo'
import Favorite from './Sections/Favorite'
import GridCards from '../commons/GridCards';


function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [LoadingForMovie, setLoadingForMovie] = useState(true)

    useEffect(() => {
        console.log(props.match)

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
                setLoadingForMovie(false)
            })


        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                setCasts(response.cast)
            })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }


    return (
        <div>
            {/* Header */}
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                :
                <div>loading...</div>
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MoviInfo movie={Movie}/>

                <br />
                {/* Actors Grid*/}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                { ActorToggle && 
                    <Row gutter={[16, 16]} >

                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}

                    </Row>
                }
            </div>

        </div>
    )
}

export default MovieDetail
