<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductHistory;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ProductService
{
    private $model;
    private $historyModel;

    public function __construct(Product $model, ProductHistory $historyModel)
    {
        $this->model = $model ? $model : new Product();
        $this->historyModel = $historyModel ? $historyModel : new ProductHistory();
    }

    public function getAll(array $params): \Illuminate\Pagination\AbstractPaginator
    {
        return $this->model->getAll($params);
    }

    public function get(int $id): Product
    {
        return $this->model->get($id);
    }

    public function getProductHistory(int $id): \Illuminate\Pagination\AbstractPaginator
    {
        return $this->historyModel->getByProductId($id);
    }

    public function store(array $params): int
    {
        $productId = $this->model->store($params);
        $params['product_id'] = $productId;

        $this->historyModel->store($params);

        return $productId;
    }

    public function update($id, array $params)
    {
        $this->model->patch($id, $params);

        if (Arr::has($params, 'quantity')) {
            $params['product_id'] = $id;
            $this->historyModel->store($params);
        }
    }

    public function storeBatch(array $params): Collection
    {
        return collect($params['products'])
            ->map(function($params) {
                return $this->store($params);
            });
    }

    public function updateBatch(array $params)
    {
        collect($params['products'])
            ->map(function ($params) {
                $this->update($params['id'], $params);
            });
    }
}
