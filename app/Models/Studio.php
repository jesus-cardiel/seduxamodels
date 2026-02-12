<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Studio extends Authenticatable
{
    use Notifiable;

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

    protected $hidden = [
        'password',
    ];

    public function models()
    {
        return $this->hasMany(WebcamModel::class);
    }
}
