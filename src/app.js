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
  }

  componentDidMount() {
    this.findBreweries()
  }

  // for making a GET request to the API endpoint
  findBreweries() {
    let { searchBy, query } = this.state;
    //determine if searchBy is city or zipcode to determine whether to make API request to the city endpoint or postal code endpoint
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
    })
    this.findBreweries();
  }

  render() {
    let { query, searchBy } = this.state;
    console.log(query);
    console.log(searchBy);

    return (
      <div className='bg-washed-blue'>
        <h1 className='tc'>Brewery Finder</h1>
        <Search change={this.handleChange} click={this.handleClick}/>
      </div>
    )
  }
}

//search function
const Search = props => {
  let options = ['City', 'Zip Code']
  return (
    <div className='mh7'>
    <input type='text' className='w-80 tc' placeholder='Search by city or zipcode' onChange={props.change}/>
      <select className='w-20 tc' onChange={props.click} >
        {options.map((op, i) => {
          {/* console.log('i',i) */}
        return (
          <option value={op} key={i}>{op}</option>
        )})}
      </select>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('app'));