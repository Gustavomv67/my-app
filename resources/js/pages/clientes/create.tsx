
import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import { IMaskInput } from "react-imask";
import {
    ArrowLeft,
    Database,
    Save,
    UserRound,
    UsersRound,
} from "lucide-react";

interface ClienteForm {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: string;
}

export default function Create() {
    const { data, setData, post, processing, errors } =
        useForm<ClienteForm>({
            nome: "",
            cpf: "",
            email: "",
            telefone: "",
            endereco: "",
        });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post("/clientes");
    }

    const inputClass =
        "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50";

    return (
        <>
            <Head title="Cadastrar cliente" />

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

                    <nav className="space-y-1 px-4 pt-8">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                            <UserRound size={19} />
                            Visão geral
                        </Link>

                        <Link
                            href="/clientes"
                            className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700"
                        >
                            <UsersRound size={19} />
                            Clientes
                        </Link>
                    </nav>

                    <div className="mt-auto p-5">
                        <p className="border-t border-slate-100 pt-5 text-xs text-slate-400">
                            Atlas · Gestão de clientes
                        </p>
                    </div>
                </aside>

                <main className="min-w-0 lg:pl-64">
                    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8 lg:px-10">
                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Atlas / Clientes / Cadastro
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-700">
                                Área administrativa
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                            <UserRound size={19} />
                        </div>
                    </header>

                    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
                        <Link
                            href="/clientes"
                            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                        >
                            <ArrowLeft size={17} />
                            Voltar para clientes
                        </Link>

                        <div className="mb-8">
                            <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-600 uppercase">
                                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                                Gestão de dados
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Novo cliente
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                                Preencha os dados abaixo para cadastrar um
                                cliente na sua base.
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                                    <h2 className="font-bold text-slate-900">
                                        Dados do cliente
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Campos marcados com * são obrigatórios.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 px-6 py-7 sm:grid-cols-2 sm:px-8">
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="nome"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Nome completo *
                                        </label>
                                        <input
                                            id="nome"
                                            name="nome"
                                            autoComplete="name"
                                            value={data.nome}
                                            onChange={(event) =>
                                                setData("nome", event.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="Digite o nome completo"
                                            maxLength={255}
                                            required
                                        />
                                        {errors.nome && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.nome}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="cpf"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            CPF *
                                        </label>
                                        <IMaskInput
                                            id="cpf"
                                            name="cpf"
                                            mask="000.000.000-00"
                                            inputMode="numeric"
                                            autoComplete="off"
                                            value={data.cpf}
                                            onChange={(event) =>
                                                setData("cpf", event.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="000.000.000-00"
                                            maxLength={14}
                                            required
                                        />
                                        {errors.cpf && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.cpf}
                                            </p>
                                        )}
                                        <p className="mt-2 text-xs text-slate-400">
                                            O CPF não poderá ser alterado depois.
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            E-mail *
                                        </label>
                                        <IMaskInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            mask="email"
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(event) =>
                                                setData("email", event.target.value)
                                            }
                                            className={inputClass}
                                            placeholder="cliente@exemplo.com"
                                            maxLength={255}
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="telefone"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Telefone
                                        </label>
                                        <input
                                            id="telefone"
                                            name="telefone"
                                            type="tel"
                                            autoComplete="tel"
                                            value={data.telefone}
                                            onChange={(event) =>
                                                setData(
                                                    "telefone",
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="(31) 99999-9999"
                                            maxLength={20}
                                        />
                                        {errors.telefone && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.telefone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="endereco"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Endereço
                                        </label>
                                        <input
                                            id="endereco"
                                            name="endereco"
                                            autoComplete="street-address"
                                            value={data.endereco}
                                            onChange={(event) =>
                                                setData(
                                                    "endereco",
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Rua, número, bairro..."
                                            maxLength={255}
                                        />
                                        {errors.endereco && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.endereco}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                                    <Link
                                        href="/clientes"
                                        className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                    >
                                        Cancelar
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Save size={17} />
                                        {processing
                                            ? "Salvando..."
                                            : "Salvar cliente"}
                                    </button>
                                </div>
                            </section>
                        </form>

                        <p className="mt-6 text-center text-xs text-slate-400">
                            Atlas · Painel de gestão de clientes
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
