import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LazyLoading = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const itemsPerPage = 5;
    const [loading, setLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(true);
    const [noMoreItems, setNoMoreItems] = useState(false);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
                setTimeout(() => {
                    setShowLoading(false);
                }, 1500);
            });
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            setVisibleProducts(products.slice(0, itemsPerPage));
        }
    }, [products]);

    const loadMoreItems = () => {
        setShowLoading(true);
        setTimeout(() => {
            const currentCount = visibleProducts.length;
            const nextItems = products.slice(currentCount, currentCount + itemsPerPage);

            if (nextItems.length === 0) {
                setNoMoreItems(true); // No more items to load
            } else {
                setVisibleProducts([...visibleProducts, ...nextItems]);
                setShowLoading(false);
            }
        }, 1000);
    };

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (!showLoading && !noMoreItems && scrollTop + windowHeight >= scrollHeight - 100) {
            loadMoreItems();
        } else if (noMoreItems) {
            setShowLoading(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visibleProducts, showLoading, noMoreItems]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Product Listing</h1>
            <div className="row">
                {visibleProducts.map((product) => (
                    <div className="col-md-12 mb-4" key={product.id}>
                        <div className="card product-card">
                            <div className="row no-gutters">
                                <div className="col-md-3">
                                    <div className="image-container">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="card-img img-fluid rounded"
                                            style={{ maxHeight: '200px', aspectRatio: '2/3', objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">
                                            {product.description.slice(0, 80)}{' '}
                                            <span className="text-primary">Read More...</span>
                                        </p>
                                        <p className="card-text">Price: ${product.price}</p>
                                        <p className="card-text">Category: {product.category}</p>
                                        <p className="card-text">
                                            Rating: {product.rating.rate} ({product.rating.count} reviews)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showLoading && (
                <div className="text-center mt-3">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}
            {noMoreItems && (
                <div className="text-center mt-3">
                    <p>No more items to load.</p>
                </div>
            )}
        </div>
    );
};

export default LazyLoading;
