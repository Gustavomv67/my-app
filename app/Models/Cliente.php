<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    /**
     * Nome da tabela associada a esta model.
     */
    protected $table = 'clientes';

    /**
     * Campos que podem ser preenchidos em massa.
     */
    protected $fillable = [
        'nome',
        'cpf',
        'email',
        'telefone',
        'endereco',
    ];

    /**
     * Conversões automáticas de atributos.
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
