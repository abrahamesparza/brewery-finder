class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: [],
      query: '',
      display: false,
      searchBy: 'City' //default
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.findBreweries = this.findBreweries.bind(this);
  }

  // for making a GET request to the API endpoint
  findBreweries() {
    let { searchBy, query } = this.state;
    //determine if searchBy is city or zipcode to determine whether to make API request to the city endpoint or postal code endpoint
    if (searchBy === 'City' && query !== '') {
      fetch(`https://api.openbrewerydb.org/breweries?by_city=${query}`)
      .then(res => res.json())
      .then(brews => {
        console.log('data', brews);
        this.setState({
          breweries: brews
        })
      })
      .catch(err => console.error('Errot in GET', err))
    }
    else if (searchBy === 'Zipcode' && query !== '') {
      fetch(`https://api.openbrewerydb.org/breweries?by_postal=${Number(query)}`)
      .then(res => res.json())
      .then(brews => {
        console.log('data', brews);
        this.setState({
          breweries: brews
        })
      })
      .catch(err => console.error('Errot in GET', err))
    }
  }

  handleChange(e) {
    console.log('e', e.target.value);
    this.setState({
      query: e.target.value
    })
  }

  handleClick(e) {
    //updates query search to Zipcode or to City (default)
    this.setState({
      searchBy: e.target.value
    });
    this.findBreweries();
  }

  render() {
    let { query, searchBy, breweries} = this.state;
    return (
      <div className='pa3 bg-moon-gray'>
        <h1 className='tc f1'>Brewery Finder</h1>
        <Search change={this.handleChange} click={this.handleClick} search={this.findBreweries}/>
        <BreweryList brews={breweries}/>
      </div>
    )
  }
}
/* ----------------------------------------------------------------------- */
//search function
const Search = props => {
  let options = ['City', 'Zipcode']
  return (
    <div className='mh7 cover'>
    <input type='text' className='w-60 tc' placeholder='Search by city or zipcode' onChange={props.change}/>
      <select className='w-10 tc ml1' onChange={props.click} >
        {options.map((op, i) => {
          {/* console.log('i',i) */}
        return (
          <option value={op} key={i}>{op}</option>
        )})}
      </select>
      <input type='button' className='ph3 w-10 tc ml1' value='Search' onClick={props.search}/>
    </div>
  )
}

/* ----------------------------------------------------------------------- */
//list breweries function
const BreweryList = props => {
  return (
    <div className='fl w-100 pa2 mt5'>
      {props.brews.map((brew, i) => (
        <Brewery key={i} id={brew.id} name={brew.name} phone={brew.phone} street={brew.street} website={brew.website_url}/>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------------- */
const Brewery = props => {
  return (
    <div className='tc dt-row-m br2 pa2 ma2 grow bg-dark-gray'>
      <ul className='list'>
        <a className='link underline-hover near-white' key={props.id} target='_blank' href={props.website}>
          <li className='f3 mh5 grow' key={props.id}>{props.name}</li>
        </a>
      </ul>
      <div className='tc'>
        <p className='tc f4 near-white'>{props.phone}</p>
        <p className='tc f4 near-white'>{props.street}</p>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('app'));
