import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			artist: null,
			pages: null,
		}
	}

search() {
    console.log('this.state', this.state);        
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';    
    const WIKI_URL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=' + this.state.query + '&redirects=true&exlimit=1&origin=*';
    var accessToken = 'BQCk35wqP_jHXVfW5Mkxj5xDMRwsDB2DZP55SNizA-y9ufn03gtXi2cDSRFMHub_JS0Uv1ltjA8t4V77NdcslcJONnRWMVeh6_eRz6sI_tlW9EXjhQKKXpjoFEpjYNJVP6PKqok-LZtRwM2RIoU_voMJffFLcRnHBvqV&refresh_token=AQAZfm-J1NPjI2EcNHGKFmve7PdlOReDwqrTXAyR10sConkIR1uuIk0Ds3cmtnvp3DkoxYFai4YSOCnNEOqf5oI3d54mDX9_uwoY5FjMvdAEUavYK7mXbjS9bdvKosZEAxU'
    
    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions )
      .then(response => response.json())
      .then(json => {
 		 const artist = json.artists.items[0];
 		 console.log('artist', artist);
 		 this.setState({artist});

 	var myOptions2 = {
 		method: 'GET',
 		headers: { 
 			'API-User-Agent': 'liveramp/1.0' 
 		},
 			mode: 'cors',
 		 	cache: 'default'
 		 };

 	fetch(WIKI_URL, myOptions2 )


 		 .then(response => response.json())
 		 .then(json => {
 		 	console.log('extracts', json);
 		 	const { pages } = json;
 		 	this.setState({pages});
 		 })

      })

	console.log('FETCH_URL', FETCH_URL);

  }

	render() {
		return (
			<div className="App">
				<div className="App-title">iArtist</div>
				<FormGroup>
					<InputGroup>
						<FormControl
							type="text"
							placeholder="Search for an artist"
							value={this.state.query}
							onChange={event => this.setState({query: event.target.value})}
							onKeyPress={event => {
								if (event.key === 'Enter') {
									this.search()
								}
							}}
						/>
						<InputGroup.Addon onClick={() => this.search()}>
							<Glyphicon glyph="search"></Glyphicon>
						</InputGroup.Addon>
					</InputGroup>	
				</FormGroup>
				{
					this.state.artist != null
					? <div>
						<Profile 
							artist={this.state.artist}
					 	 />
					  </div>
					: <div></div>
				}
			</div>
		)
	}
}

export default App;