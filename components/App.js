App = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		}
	},

	getGif: function(searchingText) {
		return new Promise(
			function(resolve, reject) {
				var url = 'http://api.giphy.com/v1/gifs/random?api_key=dGQx3BX8s4Ak8Q7nT2jajhl2qVbWpMVu&tag=' + searchingText;
				var xhr = new XMLHttpRequest();
				xhr.open('get', url);
				xhr.onload = function() {
					if (xhr.status === 200) {
						var data = JSON.parse(xhr.response).data;
						console.log(data);
						console.log(JSON.parse(xhr.response));
						var gif = {
							url: data.fixed_width_downsampled_url,
							sourceUrl: data.url
						};
						resolve(gif);
					} else {
						reject(new Error(xhr.statusText));
					}
				};
				xhr.send();
			}
		);
	},

	handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText)
      .then((gif) => {
        this.setState({
          loading: false,
          gif: gif,
          searchingText: searchingText
    	  });
      })
    },

	render: function() {

		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>GIF search engine!</h1>
				<p>Find a gif on <a href="http://giphy.com" target='new'>giphy</a>.
				Hit enter to load more :)</p>
				<Search onSearch={this.handleSearch} />
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});