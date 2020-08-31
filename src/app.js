class App extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {}
  }
  render() {
    return (
      <div className='bg-washed-blue'>
        <h1 className='tc'>Brewery Finder</h1>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));