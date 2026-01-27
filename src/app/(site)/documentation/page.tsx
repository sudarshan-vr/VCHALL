import { Documentation } from "@/app/components/documentation/Documentation";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Documentation | Vijayalakshmi Convention Hall",
};

export default function Page() {
    return (
        <>
        <Documentation/>
        </>
    );
};
