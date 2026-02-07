<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebcamModel extends Model
{
    protected $table = 'models';

    protected $fillable = [
        'real_name',
        'nick',
        'age',
        'country_code',
        'whatsapp',
        'email',
        'password',
        'selfie',
        'status',
    ];
}
