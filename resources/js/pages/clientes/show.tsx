import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Pencil,
    UserRound,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Hash,
} from "lucide-react";

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

export default function Show({ cliente }: Props) {
    const iniciais = cliente.nome
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join("")
        .toUpperCase();

    return (
        <>
            <Head title={`Cliente: ${cliente.nome}`} />

            <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
                <div className="mx-auto max-w-5xl">
                    <Link
                        href="/clientes"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
                    >
                        <ArrowLeft size={18} />
                        Voltar para clientes
                    </Link>

                    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <p className="mb-2 text-sm font-medium text-indigo-600">
                                Gestão de clientes
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Detalhes do cliente
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Visualize as informações cadastradas.
                            </p>
                        </div>

                        <Link
                            href={`/clientes/${cliente.id}/edit`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                        >
                            <Pencil size={17} />
                            Editar cliente
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white p-6 sm:p-8">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white shadow-sm">
                                    {iniciais || <UserRound size={28} />}
                                </div>

                                <div className="min-w-0">
                                    <h2 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
                                        {cliente.nome}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Código do cliente: #{cliente.id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Informações cadastradas
                            </h3>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <UserRound size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">
                                            Nome completo
                                        </p>
                                        <p className="mt-1 break-words font-medium text-slate-900">
                                            {cliente.nome}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <CreditCard size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">
                                            CPF
                                        </p>
                                        <p className="mt-1 font-medium text-slate-900">
                                            {formatarCpf(cliente.cpf)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Mail size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">
                                            E-mail
                                        </p>
                                        <p className="mt-1 break-all font-medium text-slate-900">
                                            {cliente.email || "Não informado"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Phone size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">
                                            Telefone
                                        </p>
                                        <p className="mt-1 font-medium text-slate-900">
                                            {cliente.telefone || "Não informado"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:col-span-2">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <MapPin size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">
                                            Endereço
                                        </p>
                                        <p className="mt-1 break-words font-medium text-slate-900">
                                            {cliente.endereco || "Não informado"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:col-span-2">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                        <Hash size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">
                                            Identificador interno
                                        </p>
                                        <p className="mt-1 font-medium text-slate-900">
                                            {cliente.id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                            <Link
                                href="/clientes"
                                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Voltar
                            </Link>

                            <Link
                                href={`/clientes/${cliente.id}/edit`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >
                                <Pencil size={16} />
                                Editar cadastro
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}