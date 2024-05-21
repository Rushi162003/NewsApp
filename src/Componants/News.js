import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState()
    const [totalResults, setTotalResults] = useState()
    // document.title = `${capital(props.category)} - NewsMonkey`;


    const capital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    const updateNews = async () => {
        props.setProgres(30);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true)

        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgres(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgres(100);

    }
    useEffect(() => {
        updateNews();
    }, []);

    const handalPreClick = async () => {

        setPage(page - 1)
        updateNews();

    }

    const handalNextClick = async () => {

        setPage(page + 1)
        updateNews();

    }
    const fetchMoreData = async () => {
        setPage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
       
    };
 
    // const { articles } = state;
    if (!articles) {
        return (
            <div className="container my-3">
                <h2>Data Not Found...</h2>
            </div>
        );
    };

    return (
        <>
            <h1 className='text-center'>MonkeyNews - Top {capital(props.category)} Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className="row">
                        {articles.map((element) => (
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
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;