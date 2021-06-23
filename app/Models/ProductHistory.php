<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class ProductHistory extends Model
{

    protected $table = 'product_histories';

    protected $fillable = [
        'product_id',
        'quantity',
    ];

    public function history()
    {
        return $this->belongsTo(Product::class);
    }

    public function store(array $params): int
    {
        $history = $this->create($params);
        return $history->id;
    }

    public function getByProductId(int $productId): \Illuminate\Pagination\AbstractPaginator
    {
        return $this
            ->where('product_id', $productId)
            ->orderBy('created_at')
            ->simplePaginate();
    }

}
