<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;

class Product extends Model
{
    use SoftDeletes;
    use ProductRelations;

    protected $fillable = [
        'name',
        'price',
        'quantity',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function getAll(array $params): \Illuminate\Pagination\AbstractPaginator
    {
        return $this->simplePaginate();
    }

    public function get(int $id): Product
    {
        return $this->findOrFail($id);
    }

    public function store(array $params): int
    {
        $product = $this->create($params);
        return $product->id;
    }

    public function patch(int $id, array $params)
    {
        $product = $this->findOrFail($id);
        $product->update($params);
    }
}
