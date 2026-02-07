<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Studio extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'leader_name',
        'models_active',
        'doc_front',
        'doc_back',
        'country_code',
        'whatsapp',
    ];
}
