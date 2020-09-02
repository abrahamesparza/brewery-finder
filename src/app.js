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

  componentDidMount() {
    // this.findBreweries()
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

  clearQuery() {
    let { query } = this.state;
    if (query === '') {
      this.setState({
        matched: []
      });
    }
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
    <input type='text' className='w-80 tc' placeholder='Search by city or zipcode' onChange={props.change}/>
      <select className='w-20 tc' onChange={props.click} >
        {options.map((op, i) => {
          {/* console.log('i',i) */}
        return (
          <option value={op} key={i}>{op}</option>
        )})}
      </select><br/>
      <input type='button' className='ph3' value='Search' onClick={props.search}/>
    </div>
  )
}

/* ----------------------------------------------------------------------- */
//list breweries function
const BreweryList = props => {
  return (
    <div className='fl w-100 pa2 mt5'>
      <ul className='list'>
        {props.brews.map(brewery => {
          return (
            <a className='link underline-hover washed-blue' key={brewery.id} target='_blank' href={brewery.website_url}>
              <li className='tc br1 bb b--near-white f2 mh5 grow' key={brewery.id}>{brewery.name}</li>
            </a>
          )
        })}
      </ul>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('app'));