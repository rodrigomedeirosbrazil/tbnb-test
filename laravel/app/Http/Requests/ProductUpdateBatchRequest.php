<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateBatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'products' => ['required', 'array'],
            'products.*.id' => ['required', 'exists:products,id'],
            'products.*.name' => ['nullable', 'string', 'max:150'],
            'products.*.price' => ['nullable', 'numeric', 'gt:0'],
            'products.*.quantity' => ['nullable', 'numeric', 'gt:0'],
        ];
    }
}
