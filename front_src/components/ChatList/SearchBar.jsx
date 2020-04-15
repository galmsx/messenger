import React from 'react';
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="headind_srch">
        <div className="srch_bar">
          <div className="stylish-input-group">
            <input type="text" className="search-bar" placeholder="Search" onChange={this.props.onS} value={this.props.search}/>
            <span className="input-group-addon">
              <button type="button">
                <i className="fa fa-search" aria-hidden="true" />
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
