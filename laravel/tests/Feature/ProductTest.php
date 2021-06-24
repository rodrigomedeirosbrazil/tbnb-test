<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_should_store_new_product()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Name',
            'price' => 123.45,
            'quantity' => 6,
        ]);

        $response->assertStatus(201);
    }

    /** @test */
    public function it_should_store_new_product_batch()
    {
        $products = [
            'products' => [
                [
                    'name' => 'Test Name',
                    'price' => 123.45,
                    'quantity' => 6,
                ],
                [
                    'name' => 'Test Name 2',
                    'price' => 234.56,
                    'quantity' => 8,
                ]
            ]
        ];
        $response = $this->postJson('/api/products/batch', $products);
        $response->assertStatus(201);
    }

    /** @test */
    public function it_should_error_return_invalid_name_product_data_to_store()
    {
        $response = $this->postJson('/api/products', [
            'price' => 123.45,
            'quantity' => 66,
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function it_should_error_return_invalid_price_product_data_to_store()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Name',
            'price' => 123.45,
            'quantity' => 0,
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function it_should_error_return_invalid_quantity_product_data_to_store()
    {
        $response = $this->postJson('/api/products', [
            'price' => 123.45,
            'quantity' => -1,
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function it_should_update_product()
    {
        $product = Product::factory()->create();

        $productUpdateData = [
            'name' => 'Test Name',
            'price' => '123.45',
            'quantity' => '66',
        ];

        $response = $this->patchJson('/api/products/' . $product->id , $productUpdateData);

        $response->assertStatus(204);

        $productUpdated = Product::find(1);

        $this->assertEquals($productUpdated->name, $productUpdateData['name']);
    }

    /** @test */
    public function it_should_return_error_update_product_not_exists()
    {
        Product::factory()->create();

        $productUpdateData = [
            'name' => 'Test Name',
            'price' => '123.45',
            'quantity' => '66',
        ];

        $response = $this->patchJson('/api/products/10', $productUpdateData);

        $response->assertStatus(404);
    }

    /** @test */
    public function it_should_get_all_products_with_pagination()
    {
        Product::factory()->count(20)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200);
        $response->assertJsonCount(15, 'data');
    }

    /** @test */
    public function it_should_get_product()
    {
        $product = Product::factory()->create();
        $response = $this->getJson('/api/products/' .  $product->id);

        $response->assertStatus(200);
        $response->assertJsonFragment([ 'name' => $product->name]);
    }

    /** @test */
    public function it_should_get_error_product_not_exists()
    {
        Product::factory()->create();
        $response = $this->getJson('/api/products/10');

        $response->assertStatus(404);
    }

    /** @test */
    public function it_should_get_all_product_history_with_pagination()
    {
        $productData = [
            'name' => 'Test Name',
            'price' => '123.45',
            'quantity' => '6',
        ];

        $response = $this->postJson('/api/products', $productData);

        $response->assertStatus(201);

        $response2 = $this->getJson('/api/products/1/history');

        $response2->assertStatus(200);
        $response2->assertJsonPath('data.0.quantity', $productData['quantity']);
    }

}
