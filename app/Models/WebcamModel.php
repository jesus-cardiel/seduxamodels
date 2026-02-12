<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class WebcamModel extends Authenticatable
{
    use Notifiable;

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
        'studio_id',
    ];

    protected $hidden = [
        'password',
    ];

    public function studio()
    {
        return $this->belongsTo(Studio::class);
    }
}
