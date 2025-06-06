"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
    const router = useRouter();
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") router.replace("/dashboard/admin");
        else router.replace("/dashboard/estudante");
    }, []);
    return null;
}
