import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Products = lazy(() => import('./pages/Product/Products'));
const ProductNew = lazy(() => import('./pages/Product/New'));
const ProductEdit = lazy(() => import('./pages/Product/Edit'));

export default function Routes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/" exact component={Products} />
                    <Route path="/products/new" exact component={ProductNew} />
                    <Route path="/products/:id" component={ProductEdit} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}
