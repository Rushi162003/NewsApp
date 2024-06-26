import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgres(10);
        // const url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        const url = ` https://www.googleapis.com/blogger/v3/blogs/2399953?key=AIzaSyAZLMijZWtRpEgEQNC0i0rlhYn7M3GqQUA`;

        setLoading(true);

        const data = await fetch(url);
        props.setProgres(30);
        const parsedData = await data.json();
        props.setProgres(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgres(100);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        document.title = `${capital(props.category)} - NewsMonkey`;
        updateNews();
    }, []);


    const fetchMoreData = async () => {
        const newPage = page + 1;
        setPage(newPage);

        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${newPage}&pageSize=${props.pageSize}`;
        const url = `https://www.googleapis.com/blogger/v3/blogs/2399953?key=AIzaSyAZLMijZWtRpEgEQNC0i0rlhYn7M3GqQUA`;
        // setPage(page+1) 
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

    return (
        <>
            <h1 className='text-center' style={{ marginTop: '70px' }}>MonkeyNews - Top {capital(props.category)} Headlines</h1>
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
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : ""}
                                    newsUrl={element.url ? element.url : ""}
                                    author={element.author ? element.author : ""}
                                    date={element.publishedAt ? element.publishedAt : ""}
                                    source={element.source.name ? element.source.name : ""}
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
    apiKey: PropTypes.string.isRequired,
    setProgres: PropTypes.func.isRequired
}

export default News;
