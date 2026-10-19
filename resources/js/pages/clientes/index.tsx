import { Head, router } from "@inertiajs/react";
import { useState, type FormEvent } from "react";
import {
    LayoutDashboard,
    UsersRound,
    ChartColumn,
    Settings,
    Search,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal,
    UserRound,
    ArrowUpRight,
    Database,
    X,
} from "lucide-react";

interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    email: string | null;
    telefone: string | null;
    endereco: string | null;
}

interface LinkPaginacao {
    url: string | null;
    label: string;
    active: boolean;
}

interface ClientesPaginados {
    data: Cliente[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: LinkPaginacao[];
}

interface Props {
    clientes: ClientesPaginados;
    filtros: {
        busca: string;
    };
}

function iniciais(nome: string): string {
    return nome
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join("")
        .toUpperCase();
}

function formatarCpf(cpf: string): string {
    const numeros = cpf.replace(/\D/g, "");

    if (numeros.length !== 11) {
        return cpf;
    }

    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default function Index({ clientes, filtros }: Props) {
    const [busca, setBusca] = useState(filtros.busca);

    function pesquisar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.get(
            "/clientes",
            { busca: busca.trim() },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function limparBusca() {
        setBusca("");

        router.get(
            "/clientes",
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    const linksPaginas = clientes.links.slice(1, -1);
    const linkAnterior = clientes.links[0];
    const linkProximo = clientes.links[clientes.links.length - 1];

    return (
        <>
            <Head title="Clientes" />

            <div className="min-h-screen bg-[#f6f7fb] text-slate-800">
                <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
                    <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-7">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                            <Database size={21} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-slate-900">
                                Atlas
                            </h2>
                            <p className="text-xs text-slate-400">
                                Gestão de clientes
                            </p>
                        </div>
                    </div>

                    <div className="px-4 pt-8">
                        <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                            Menu principal
                        </p>

                        <nav className="space-y-1">
                            <a
                                href="/dashboard"
                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                                <LayoutDashboard size={19} />
                                Visão geral
                            </a>

                            <a
                                href="/clientes"
                                aria-current="page"
                                className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700"
                            >
                                <UsersRound size={19} />
                                Clientes
                                <span className="ml-auto rounded-md bg-indigo-100 px-2 py-0.5 text-xs">
                                    {clientes.total}
                                </span>
                            </a>

                            <a
                                href="/relatorios"
                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                                <ChartColumn size={19} />
                                Relatórios
                            </a>
                        </nav>
                    </div>

                    <div className="mt-auto p-4">
                        <div className="mb-4 border-t border-slate-100" />

                        <a
                            href="/settings"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                            <Settings size={19} />
                            Configurações
                        </a>

                        <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                                GV
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                    Minha conta
                                </p>
                                <p className="text-xs text-slate-500">
                                    Administrador
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="min-w-0 lg:pl-64">
                    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8 lg:px-10">
                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Atlas / Gestão
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-700">
                                Área administrativa
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="hidden text-sm text-slate-500 sm:block">
                                Painel de controle
                            </span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                                <UserRound size={19} />
                            </div>
                        </div>
                    </header>

                    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
                        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-600 uppercase">
                                    <span className="h-2 w-2 rounded-full bg-indigo-600" />
                                    Gestão de dados
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Clientes
                                </h1>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                                    Gerencie os cadastros e consulte as
                                    informações da sua base de clientes.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm sm:self-auto">
                                <UsersRound
                                    size={18}
                                    className="text-indigo-600"
                                />
                                <span>Base de clientes</span>
                            </div>
                        </div>

                        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-500">
                                        Total de clientes
                                    </span>
                                    <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                                        <UsersRound size={20} />
                                    </div>
                                </div>

                                <div className="mt-5 flex items-end justify-between">
                                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                                        {clientes.total}
                                    </p>
                                    <span className="mb-1 text-xs text-slate-400">
                                        Registros
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-500">
                                        Nesta página
                                    </span>
                                    <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                                        <Database size={20} />
                                    </div>
                                </div>

                                <div className="mt-5 flex items-end justify-between">
                                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                                        {clientes.data.length}
                                    </p>
                                    <span className="mb-1 text-xs text-slate-400">
                                        De {clientes.per_page} por página
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-500">
                                        Páginas disponíveis
                                    </span>
                                    <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                                        <ChartColumn size={20} />
                                    </div>
                                </div>

                                <div className="mt-5 flex items-end justify-between">
                                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                                        {clientes.last_page}
                                    </p>
                                    <span className="mb-1 text-xs text-slate-400">
                                        Página {clientes.current_page} de{" "}
                                        {clientes.last_page}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-7">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        Todos os clientes
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Consulte e encontre os registros
                                        cadastrados.
                                    </p>
                                </div>

                                <span className="w-fit rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                    {clientes.total}{" "}
                                    {clientes.total === 1
                                        ? "registro"
                                        : "registros"}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:px-7">
                                <form
                                    onSubmit={pesquisar}
                                    className="flex min-w-0 flex-1 gap-2"
                                >
                                    <div className="relative min-w-0 flex-1">
                                        <Search
                                            size={18}
                                            className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="search"
                                            value={busca}
                                            onChange={(event) =>
                                                setBusca(event.target.value)
                                            }
                                            placeholder="Buscar por nome ou CPF..."
                                            aria-label="Buscar clientes por nome ou CPF"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-10 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                        />

                                        {busca && (
                                            <button
                                                type="button"
                                                onClick={limparBusca}
                                                aria-label="Limpar pesquisa"
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                            >
                                                <X size={17} />
                                            </button>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100"
                                    >
                                        <Search size={16} />
                                        <span className="hidden sm:inline">
                                            Buscar
                                        </span>
                                    </button>
                                </form>

                                <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-500">
                                    <SlidersHorizontal size={17} />
                                    <span>
                                        {filtros.busca
                                            ? "Filtro ativo"
                                            : "Todos os registros"}
                                    </span>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-white">
                                            <th className="px-7 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                                Cliente
                                            </th>
                                            <th className="px-5 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                                CPF
                                            </th>
                                            <th className="px-5 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                                E-mail
                                            </th>
                                            <th className="px-5 py-4 text-right text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                                Cadastro
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {clientes.data.length > 0 ? (
                                            clientes.data.map(
                                                (cliente, index) => (
                                                    <tr
                                                        key={cliente.id}
                                                        className="transition hover:bg-indigo-50/30"
                                                    >
                                                        <td className="px-7 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                                                                        index %
                                                                            4 ===
                                                                        0
                                                                            ? "bg-violet-100 text-violet-700"
                                                                            : index %
                                                                                    4 ===
                                                                                1
                                                                              ? "bg-sky-100 text-sky-700"
                                                                              : index %
                                                                                      4 ===
                                                                                  2
                                                                                ? "bg-emerald-100 text-emerald-700"
                                                                                : "bg-amber-100 text-amber-700"
                                                                    }`}
                                                                >
                                                                    {iniciais(
                                                                        cliente.nome,
                                                                    )}
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <p className="max-w-[220px] truncate text-sm font-semibold text-slate-800">
                                                                        {
                                                                            cliente.nome
                                                                        }
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-slate-400">
                                                                        ID #
                                                                        {
                                                                            cliente.id
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <span className="font-mono text-xs text-slate-600">
                                                                {formatarCpf(
                                                                    cliente.cpf,
                                                                )}
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <span
                                                                title={
                                                                    cliente.email ??
                                                                    ""
                                                                }
                                                                className="block max-w-[220px] truncate text-sm text-slate-600"
                                                            >
                                                                {cliente.email ??
                                                                    "Não informado"}
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4 text-right">
                                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                                                                <ArrowUpRight
                                                                    size={14}
                                                                />
                                                                Cadastrado
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-6 py-20 text-center"
                                                >
                                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                                        <Search size={25} />
                                                    </div>
                                                    <p className="font-semibold text-slate-800">
                                                        Nenhum cliente
                                                        encontrado
                                                    </p>
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Tente pesquisar por
                                                        outro nome ou CPF.
                                                    </p>
                                                    {filtros.busca && (
                                                        <button
                                                            onClick={
                                                                limparBusca
                                                            }
                                                            className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            Limpar pesquisa
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <footer className="flex flex-col justify-between gap-4 border-t border-slate-100 bg-white px-5 py-5 sm:flex-row sm:items-center sm:px-7">
                                <p className="text-sm text-slate-500">
                                    Mostrando{" "}
                                    <span className="font-semibold text-slate-800">
                                        {clientes.from ?? 0}–{clientes.to ?? 0}
                                    </span>{" "}
                                    de{" "}
                                    <span className="font-semibold text-slate-800">
                                        {clientes.total}
                                    </span>{" "}
                                    clientes
                                </p>

                                <nav
                                    aria-label="Paginação dos clientes"
                                    className="flex items-center gap-1.5"
                                >
                                    <button
                                        type="button"
                                        disabled={!linkAnterior?.url}
                                        onClick={() => {
                                            if (linkAnterior?.url) {
                                                router.visit(linkAnterior.url, {
                                                    preserveScroll: true,
                                                });
                                            }
                                        }}
                                        aria-label="Página anterior"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    {linksPaginas.map((link, index) => (
                                        <button
                                            key={`${link.label}-${index}`}
                                            type="button"
                                            disabled={!link.url || link.active}
                                            aria-current={
                                                link.active ? "page" : undefined
                                            }
                                            onClick={() => {
                                                if (link.url) {
                                                    router.visit(link.url, {
                                                        preserveScroll: true,
                                                    });
                                                }
                                            }}
                                            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition disabled:cursor-default ${
                                                link.active
                                                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                                                    : "border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                                            }`}
                                        >
                                            {link.label}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        disabled={!linkProximo?.url}
                                        onClick={() => {
                                            if (linkProximo?.url) {
                                                router.visit(linkProximo.url, {
                                                    preserveScroll: true,
                                                });
                                            }
                                        }}
                                        aria-label="Próxima página"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </nav>
                            </footer>
                        </section>

                        <p className="mt-6 text-center text-xs text-slate-400">
                            Atlas · Painel de gestão de clientes
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
