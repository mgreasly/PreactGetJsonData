import { h, Component, cloneElement } from 'preact';
import axios from 'axios';

export default class GetJsonData extends Component {
	constructor(props) {
		super(props);
		this.state = { data: null };
		this.fetchdata = this.fetchdata.bind(this);
	}

	componentDidMount() { this.fetchdata(); }
	componentWillUpdate(nextProps, nextState) { if (nextProps.url != this.props.url) this.fetchdata(); }

	fetchdata() {
		if (!this.props.url) return;
		axios.get(this.props.url).then(r => { this.setState({ data: r.data }); })
	}

	render() {
		if (this.props.children && this.props.url) {
			const children = this.props.children.map(function(child) { return cloneElement(child, {data: this.state.data}); }, this);
			return <div>{children}</div>
		}
		return null;
	}
}
