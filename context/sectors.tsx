"use client";

import React, {createContext, useEffect, useState} from "react";
import {Sector} from "@prisma/client";
import {toast} from "@/hooks/use-toast";

type Props = {
    children: React.ReactNode;
}

type ContextType = {
    sectors: Sector[];
    sectorsBusy: boolean;
    getSectors: () => Promise<Sector[]>;
    addSector: (sector: Sector) => Promise<void>;
    updateSector: (sector: Sector) => Promise<void>;
}

const initialContext: ContextType = {
    sectors: [],
    sectorsBusy: true,
    getSectors: () => Promise.resolve([]),
    addSector: () => Promise.resolve(),
    updateSector: () => Promise.resolve(),
}

const SectorContext = createContext(initialContext)

function SectorProvider({children}: Props) {

    const [sectors, setSectors] = useState<Sector[]>(initialContext.sectors)
    const [sectorsBusy, setSectorsBusy] = useState(initialContext.sectorsBusy)

    useEffect(() => {
        getSectors()
            .then(sectors => setSectors(sectors))
            .catch(err => {
                console.error(err);
                toast({
                    title: "An Error Occurred",
                    description: "Could not fetch sectors.",
                    variant: "destructive"
                });
                setSectors([])
            })
    }, []);

    const getSectors = async () => {
        setSectorsBusy(true)
        return await fetch("/api/sectors", {cache: "no-store"})
            .then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(data => data)
            .finally(() => setSectorsBusy(false))
    }

    const addSector = async (sector: Sector) => {
        setSectorsBusy(true)
        await fetch("/api/sectors", {
                method: "POST",
                body: JSON.stringify(sector),
            })
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(data => data)
            .finally(() => setSectorsBusy(false))
    }

    const updateSector = async (sector: Sector) => {
        setSectorsBusy(true)
        await fetch("/api/sectors", {
            method: "PUT",
            body: JSON.stringify(sector),
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(data => data)
            .finally(() => setSectorsBusy(false))
    }

    return (
        <SectorContext.Provider value={{
            sectors: sectors,
            sectorsBusy: sectorsBusy,
            getSectors: getSectors,
            addSector: addSector,
            updateSector: updateSector,
        }}>
            {children}
        </SectorContext.Provider>
    )

}

export {SectorProvider, SectorContext}