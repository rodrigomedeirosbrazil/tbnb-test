<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::post('/batch', [ProductController::class, 'storeBatch']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::get('/{id}/history', [ProductController::class, 'getProductHistory']);
    Route::post('/', [ProductController::class, 'store']);
    Route::patch('/batch', [ProductController::class, 'updateBatch']);
    Route::patch('/{id}', [ProductController::class, 'update']);
});

