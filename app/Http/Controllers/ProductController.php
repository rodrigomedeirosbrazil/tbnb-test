<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreBatchRequest;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateBatchRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\HistoryResource;
use App\Http\Resources\ProductResource;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request, ProductService $service)
    {
        $products = $service->getAll($request->all());
        $productsJson = ProductResource::collection($products)->response()->getData(true);
        return response()->json($productsJson, 200);
    }

    public function show(string $id, ProductService $service)
    {
        $product = $service->get((int) $id);
        $productJson = new ProductResource($product);
        return response()->json($productJson, 200);
    }

    public function getProductHistory(string $id, ProductService $service)
    {
        $histories = $service->getProductHistory((int) $id);
        $historiesJson = HistoryResource::collection($histories)->response()->getData(true);
        return response()->json($historiesJson, 200);
    }

    public function store(ProductStoreRequest $request, ProductService $service)
    {
        DB::beginTransaction();
        $productId = $service->store($request->all());
        DB::commit();
        return response()->json(['id' => $productId ], 201);
    }

    public function update(string $id, ProductUpdateRequest $request, ProductService $service)
    {
        DB::beginTransaction();
        $service->update((int) $id, $request->all());
        DB::commit();
        return response('', 204);
    }

    public function storeBatch(ProductStoreBatchRequest $request, ProductService $service)
    {
        DB::beginTransaction();
        $productIds = $service->storeBatch($request->all());
        DB::commit();
        return response()->json(['ids' => $productIds], 201);
    }

    public function updateBatch(ProductUpdateBatchRequest $request, ProductService $service)
    {
        DB::beginTransaction();
        $service->updateBatch($request->all());
        DB::commit();
        return response('', 204);
    }
}
