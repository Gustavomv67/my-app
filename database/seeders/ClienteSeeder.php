<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClienteSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 30; $i++) {
            DB::table('clientes')->insert([
                'nome' => "Cliente Teste {$i}",
                'cpf' => sprintf('%011d', 10000000000 + $i),
                'email' => "cliente{$i}@exemplo.com",
                'telefone' => sprintf('3199999%04d', $i),
                'endereco' => "Rua Teste {$i}, Cidade, Estado",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
