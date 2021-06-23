<?php

namespace App\Models;

trait ProductRelations
{
    public function history()
    {
        return $this->hasMany(ProductHistory::class);
    }
}
