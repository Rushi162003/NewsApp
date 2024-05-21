import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capital(this.props.category)} - NewsMonkey`;
    }
    async updateNews() {
        this.props.setProgres(30);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true });

        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgres(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgres(100);

    }
    async componentDidMount() {
        this.updateNews();

    }
    handalPreClick = async () => {

        this.setState({ page: this.state.page - 1 })
        this.updateNews();

    }

    handalNextClick = async () => {
        console.log("Next")

        this.setState({ page: this.state.page + 1 })
        this.updateNews();

    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    };
    render() {
        // return (
        //   <div className="container my-3">
        //     <h2>MonkeyNews - Top Heading</h2>
        //     <div className="row">
        //       {this.state.articles.map((element) => (
        //         <div className="col-md-4" key={element.url}>
        //           <NewsItem
        //             title={element.title}
        //             description={element.description}
        //             imageUrl={element.urlToImage}
        //             newsUrl={element.url}
        //           />
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // );
        const { articles } = this.state;

        // Check if articles is undefined or null
        if (!articles) {
            return (
                <div className="container my-3">
                    <h2>Loading...</h2>
                </div>
            );
        }

        return (
            <>
                <h1 className='text-center'>MonkeyNews - Top {this.capital(this.props.category)} Headlines
                </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className="row">
                            {this.state.articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title}
                                        description={element.description}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }

}


export default News;