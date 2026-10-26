<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ClienteController extends Controller
{
    // Listar, pesquisar e paginar clientes
    public function index(Request $request): Response
    {
        $busca = $request->string('busca')->trim()->toString();

        $clientes = Cliente::query()
            ->when($busca !== '', function ($query) use ($busca) {
                $query->where(function ($query) use ($busca) {
                    $query->where('nome', 'like', "%{$busca}%")
                        ->orWhere('cpf', 'like', "%{$busca}%");
                });
            })
            ->orderBy('nome')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('clientes/index', [
            'clientes' => $clientes,
            'filtros' => [
                'busca' => $busca,
            ],
        ]);
    }

    // Exibir formulário de cadastro
    public function create(): Response
    {
        return Inertia::render('clientes/create');
    }

    // Validar e salvar um novo cliente
    public function store(Request $request): RedirectResponse
    {
        $dados = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'cpf' => ['required', 'string', 'max:14', 'unique:clientes,cpf'],
            'email' => ['required', 'email', 'max:255', 'unique:clientes,email'],
            'telefone' => ['nullable', 'string', 'max:20'],
            'endereco' => ['nullable', 'string', 'max:255'],
        ]);

        Cliente::create($dados);

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Cliente cadastrado com sucesso.');
    }

    // Exibir os dados de um cliente
    public function show(Cliente $cliente): Response
    {
        return Inertia::render('clientes/show', [
            'cliente' => $cliente,
        ]);
    }

    // Exibir formulário de edição
    public function edit(Cliente $cliente): Response
    {
        return Inertia::render('clientes/edit', [
            'cliente' => $cliente,
        ]);
    }

    // Validar e atualizar um cliente
    public function update(Request $request, Cliente $cliente): RedirectResponse
    {
        $dados = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('clientes', 'email')->ignore($cliente->id),
            ],
            'telefone' => ['nullable', 'string', 'max:20'],
            'endereco' => ['nullable', 'string', 'max:255'],
        ]);

        $cliente->update($dados);

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Cliente atualizado com sucesso.');
    }

    // Excluir um cliente
    public function destroy(Cliente $cliente): RedirectResponse
    {
        $cliente->delete();

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Cliente excluído com sucesso.');
    }
}
