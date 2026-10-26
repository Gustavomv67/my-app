import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Save,
    UserRound,
    Mail,
    Phone,
    MapPin,
    CreditCard,
} from "lucide-react";
import type { FormEvent } from "react";

interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    email: string | null;
    telefone: string | null;
    endereco: string | null;
}

interface Props {
    cliente: Cliente;
}

interface FormularioCliente {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

function formatarCpf(cpf: string): string {
    const numeros = cpf.replace(/\D/g, "");

    if (numeros.length !== 11) {
        return cpf;
    }

    return numeros.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4",
    );
}

export default function Edit({ cliente }: Props) {
    const { data, setData, put, processing, errors } =
        useForm<FormularioCliente>({
            nome: cliente.nome ?? "",
            email: cliente.email ?? "",
            telefone: cliente.telefone ?? "",
            endereco: cliente.endereco ?? "",
        });

    function salvar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        put(`/clientes/${cliente.id}`, {
            preserveScroll: true,
        });
    }

    const classesInput =
        "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

    const classesLabel =
        "block text-sm font-semibold text-slate-700";

    return (
        <>
            <Head title={`Editar: ${cliente.nome}`} />

            <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
                <div className="mx-auto max-w-5xl">
                    <Link
                        href={`/clientes/${cliente.id}`}
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
                    >
                        <ArrowLeft size={18} />
                        Voltar para o cliente
                    </Link>

                    <div className="mb-8">
                        <p className="mb-2 text-sm font-medium text-indigo-600">
                            Gestão de clientes
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Editar cliente
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Atualize os dados cadastrais e salve as alterações.
                        </p>
                    </div>

                    <form onSubmit={salvar}>
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white p-6 sm:p-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                                        <UserRound size={26} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">
                                            Dados cadastrais
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Cliente #{cliente.id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 p-6 sm:p-8">
                                <div>
                                    <label
                                        htmlFor="nome"
                                        className={classesLabel}
                                    >
                                        Nome completo
                                    </label>

                                    <div className="relative">
                                        <UserRound
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="nome"
                                            name="nome"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            maxLength={255}
                                            value={data.nome}
                                            onChange={(event) =>
                                                setData("nome", event.target.value)
                                            }
                                            className={`${classesInput} pl-11`}
                                            placeholder="Digite o nome completo"
                                        />
                                    </div>

                                    {errors.nome && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.nome}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="cpf"
                                        className={classesLabel}
                                    >
                                        CPF
                                    </label>

                                    <div className="relative">
                                        <CreditCard
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="cpf"
                                            type="text"
                                            value={formatarCpf(cliente.cpf)}
                                            readOnly
                                            className={`${classesInput} cursor-not-allowed bg-slate-100 pl-11 text-slate-500`}
                                        />
                                    </div>

                                    <p className="mt-2 text-xs text-slate-500">
                                        O CPF não pode ser alterado nesta tela.
                                    </p>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className={classesLabel}
                                    >
                                        E-mail
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            maxLength={255}
                                            value={data.email}
                                            onChange={(event) =>
                                                setData("email", event.target.value)
                                            }
                                            className={`${classesInput} pl-11`}
                                            placeholder="cliente@exemplo.com"
                                        />
                                    </div>

                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="telefone"
                                        className={classesLabel}
                                    >
                                        Telefone
                                    </label>

                                    <div className="relative">
                                        <Phone
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="telefone"
                                            name="telefone"
                                            type="tel"
                                            autoComplete="tel"
                                            maxLength={20}
                                            value={data.telefone}
                                            onChange={(event) =>
                                                setData("telefone", event.target.value)
                                            }
                                            className={`${classesInput} pl-11`}
                                            placeholder="(31) 99999-9999"
                                        />
                                    </div>

                                    {errors.telefone && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.telefone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="endereco"
                                        className={classesLabel}
                                    >
                                        Endereço
                                    </label>

                                    <div className="relative">
                                        <MapPin
                                            size={18}
                                            className="absolute left-4 top-4 text-slate-400"
                                        />

                                        <textarea
                                            id="endereco"
                                            name="endereco"
                                            rows={3}
                                            maxLength={255}
                                            value={data.endereco}
                                            onChange={(event) =>
                                                setData("endereco", event.target.value)
                                            }
                                            className={`${classesInput} resize-y pl-11`}
                                            placeholder="Rua, número, bairro, cidade..."
                                        />
                                    </div>

                                    {errors.endereco && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.endereco}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                                <Link
                                    href={`/clientes/${cliente.id}`}
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                >
                                    Cancelar
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={17} />
                                    {processing ? "Salvando..." : "Salvar alterações"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}