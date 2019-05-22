import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
//import FormControl from '@material-ui/core/FormControl';
//import Typography from '@material-ui/core/Typography';
//import InputLabel from '@material-ui/core/InputLabel';
//import Input from '@material-ui/core/Input';
//import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
//import Checkbox from '@material-ui/core/Checkbox';
//import ListItemText from '@material-ui/core/ListItemText';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import moviesData from '../../common/movieData';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            movieName: "",
            upcomingMovies: [],
            releasedMovies: []
            
        }
    }

    componentWillMount() {
        // Get upcoming movies
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                that.setState({
                    upcomingMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhr.open("GET", this.baseUrl + "status=PUBLISHED");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

       
        // Get released movies
        let dataReleased = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });
        xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(dataReleased);
    }
    movieClickHandler = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header heading="Demo data Testing app "/>

                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>
                <GridList cols={5} className={classes.gridListUpcomingMovies} >
                    {moviesData.map(movie => (
                        <GridListTile key={"upcoming" + movie.id}>
                            <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>
               

                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                            {moviesData.map(movie => (
                                <GridListTile onClick={() => this.movieClickHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                                    <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    </div>
                    </div>
                    
                    )
                }

                
}
export default withStyles(styles)(Home);